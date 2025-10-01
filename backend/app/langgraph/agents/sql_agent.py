from abc import ABC, abstractmethod
from typing import List, Dict, Any, Union
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from langchain_core.language_models import BaseLLM
from app.langgraph.prompt_templates.analyst_prompts import (
    get_schema_insights_prompt,
    generate_sql_query_prompt,
    fix_sql_query_prompt,
    format_results_prompt,
    get_visualization_prompt,
    conversational_prompt
)
from app.langgraph.prompt_templates.graph_prompts import get_prompt
from app.config.logging_config import get_logger

logger = get_logger(__name__)


class SQLAgent:
    def __init__(self, llm: BaseLLM):
        self.str_parser = StrOutputParser()
        self.json_parser = JsonOutputParser()
        self.llm = llm

    def get_parse_question(self, state: Dict[str, Any]) -> Dict[str, Any]:
        logger.info("======= get_parse_question =======")
        # Check for required keys in the state
        required_keys = ["schema", "question"]
        missing_keys = [key for key in required_keys if key not in state]

        if missing_keys:
            raise ValueError(
                f"Missing required keys in state: {', '.join(missing_keys)}")

        question = state['question']
        schema = state['schema']
        # Ensure chain components are properly initialized
        if not self.llm or not self.json_parser:
            raise ValueError("LLM or JSON Parser is not initialized.")
        # Execute the chain
        chain = get_schema_insights_prompt | self.llm | self.json_parser
        response = chain.invoke({"schema": schema, "question": question})
        return {"parsed_question": response}

    def generate_sql_query(self, state: Dict[str, Any]) -> Dict[str, Any]:
        logger.info("======= generate_sql_query =======")
        # Check for required keys in the state
        required_keys = ["schema", "question", "parsed_question"]
        missing_keys = [key for key in required_keys if key not in state]

        if missing_keys:
            raise ValueError(
                f"Missing required keys in state: {', '.join(missing_keys)}")

        schema = state["schema"]
        question = state["question"]
        parsed_question = state["parsed_question"]
        # Ensure chain components are properly initialized
        if not self.llm or not self.str_parser:
            raise ValueError("LLM or String Parser is not initialized.")

        chain = generate_sql_query_prompt | self.llm | self.str_parser
        response = chain.invoke(
            {"schema": schema, "question": question, "relevant_table_column": parsed_question})
        clean_sql_query = response.strip('`').replace('sql\n', '', 1).strip()
        if response.strip() == "NOT_ENOUGH_INFO":
            return {"sql_query": "NOT_RELEVANT"}
        else:
            return {"sql_query": clean_sql_query}

    def validate_and_fix_sql(self, state: Dict[str, Any]) -> Dict[str, Any]:
        logger.info("========= validate_and_fix_sql ========")
        required_keys = ["schema", "sql_query"]
        missing_keys = [key for key in required_keys if key not in state]

        if missing_keys:
            raise ValueError(
                f"Missing required keys in state: {', '.join(missing_keys)}")

        sql_query = state['sql_query']
        schema = state['schema']

        # Ensure chain components are properly initialized
        if not self.llm or not self.json_parser:
            raise ValueError("LLM or JSON Parser is not initialized.")

        chain = fix_sql_query_prompt | self.llm | self.json_parser
        response = chain.invoke({"schema": schema, "sql_query": sql_query})

        if response["valid"] and response["issues"] is None:
            return {"sql_query": sql_query, "sql_valid": True}
        else:
            return {
                "sql_query": response["corrected_query"],
                "sql_valid": response["valid"],
                "sql_issues": response["issues"]
            }

    def format_results(self, state: Dict[str, Any]) -> Dict[str, Any]:
        logger.info("========= format_results ========")
        required_keys = ["schema", "query_result"]
        missing_keys = [key for key in required_keys if key not in state]

        if missing_keys:
            raise ValueError(
                f"Missing required keys in state: {', '.join(missing_keys)}")

        question = state['question']
        results = state['query_result']

        if results == "NOT_RELEVANT":
            return {"answer": "Sorry, I can only give answers relevant to the database."}

        if not self.llm or not self.str_parser:
            raise ValueError("LLM or String Parser is not initialized.")

        chain = format_results_prompt | self.llm | self.str_parser
        response = chain.invoke({"question": question, "results": results})
        return {"answer": response}

    def choose_visualization(self, state: Dict[str, Any]) -> Dict[str, Any]:
        logger.info("========= choose_visualization ========")
        required_keys = ["question", "query_result", "sql_query"]
        missing_keys = [key for key in required_keys if key not in state]
        if missing_keys:
            raise ValueError(
                f"Missing required keys in state: {', '.join(missing_keys)}")

        question = state['question']
        results = state['query_result']
        sql_query = state['sql_query']

        if results == "NOT_RELEVANT":
            return {"visualization": "none", "visualization_reasoning": "No visualization needed for irrelevant questions."}

        chain = get_visualization_prompt | self.llm | self.json_parser

        response = chain.invoke(
            {"question": question, "sql_query": sql_query, "results": results})

        return {
            "recommended_visualization": response["recommended_visualization"],
            "reason": response["reason"]
        }

    def format_visualization_data(self, state: Dict[str, Any]) -> Dict[str, Any]:
        logger.info("========= format_visualization_data ========")

        required_keys = ["question", "query_result",
                         "recommended_visualization"]
        missing_keys = [key for key in required_keys if key not in state]
        if missing_keys:
            raise ValueError(
                f"Missing required keys in state: {', '.join(missing_keys)}")

        question = state['question']
        results = state['query_result']
        recommended_visualization = state['recommended_visualization']

        if results == "NOT_RELEVANT":
            return {"answer": "Sorry, I can only give answers relevant to the database."}

        if recommended_visualization == "none":
            return {"formatted_data_for_visualization": None}

        prompt = get_prompt(recommended_visualization)
        chain = prompt | self.llm | self.json_parser
        response = chain.invoke({"question": question, "data": results})

        return {"formatted_data_for_visualization": response}

    def conversational_response(self, state: Dict[str, Any]) -> Dict[str, Any]:
        logger.info("========= conversational_response ========")
        question = state['question']

        chain = conversational_prompt | self.llm | self.str_parser
        response = chain.invoke({"question": question})

        return {"answer": response}
