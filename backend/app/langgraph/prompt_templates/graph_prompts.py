from typing import Dict
from langchain_core.prompts import ChatPromptTemplate

graph_prompt_templates: Dict[str, Dict[str, str]] = {
    "bar": {
        "system": '''You are a data visualization expert. Given a question and some data, provide a concise and relevant structure for a bar chart.''',
        "human": '''Question: {question}
        Data: {data}

        Provide a bar chart structure in the following format:
        {{
        labels: string[],
        values: {{ data: number[], label: string }}[]
        }}
        Ensure the structure is relevant to the question and data provided, dont return any additional string, return only the data in json formate'''
    },
    "horizontal_bar": {
        "system": '''You are a data visualization expert. Given a question and some data, provide a concise and relevant structure for a horizontal bar chart.''',
        "human": '''Question: {question}
        Data: {data}

        Provide a horizontal bar chart structure in the following format:
        {{
        labels: string[],
        values: {{ data: number[], label: string }}[]
        }}
        Ensure the structure is relevant to the question and data provided, dont return any additional string, return only the data in json format'''
    },
    "line": {
        "system": '''You are a data visualization expert. Given a question and some data, provide a concise and relevant structure for a line graph.''',
        "human": '''Question: {question}
        Data: {data}

        Provide a line graph structure in the following format:
        {{
        xValues: number[] | string[],
        yValues: {{ data: number[], label: string }}[]
        }}
        Ensure the structure is relevant to the question and data provided, dont return any additional string, return only the data in json format'''
    },
    "pie": {
        "system": '''You are a data visualization expert. Given a question and some data, provide a concise and relevant structure for a pie chart.''',
        "human": '''Question: {question}
        Data: {data}

        Provide a pie chart structure in the following format:
        [
        {{ label: string, value: number }}
        ]
        Ensure the structure is relevant to the question and data provided, dont return any additional string, return only the data in json format'''
    },
    "scatter": {
        "system": '''You are a data visualization expert. Given a question and some data, provide a concise and relevant structure for a scatter plot.''',
        "human": '''Question: {question}
        Data: {data}

        Provide a scatter plot structure in the following format:
        {{
        series: {{
            data: {{ x: number, y: number, id: number }}[],
            label: string
        }}[]
        }}
        Ensure the structure is relevant to the question and data provided, dont return any additional string, return only the data in json format'''
    }
}


def get_prompt(graph_type: str) -> Dict[str, str]:
    if graph_type not in graph_prompt_templates:
        raise ValueError(f"Unknown graph type: {graph_type}")

    template = graph_prompt_templates[graph_type]
    return ChatPromptTemplate.from_messages([
        ("system", template["system"]),
        ("human", template["human"]),
    ])
