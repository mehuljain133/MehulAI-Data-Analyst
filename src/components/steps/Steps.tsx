import { FiCommand } from 'react-icons/fi';
import { ProcessingMessage } from '../../interfaces/chatInterface';
import RelevantTables from './RelevantTables';
import SQLCode from './SqlQuery';
import ChatTyping from '../ChatTyping';



type StepsProps = {
  processingMessages: ProcessingMessage[];
  isProcessing: boolean;
};

const Steps: React.FC<StepsProps> = ({ processingMessages, isProcessing }) => {
  console.log(processingMessages);

  return (
    <div className="w-1/2 bg-yellow-gray-50 rounded-r-[20px] border-l border-l-blue-gray-100 p-6 flex flex-col items-start justify-start ">
      {
        processingMessages?.map((message, index) => {
          if(message?.query_result) return 
          if(message?.formatted_data_for_visualization) return 
          if(message?.answer) return 

          return (
            <div
              key={index}
              className="flex items-center p-6 w-full bg-white rounded-[18px] border border-yellow-gray-100 my-2"
            >
              {
                message?.parsed_question ?
                 <RelevantTables parsed_question={message?.parsed_question}/>
                :
                (!('sql_valid' in message) && ("sql_query" in message))?
                <div>
                  <p className='text-gray-700'>SQL Query generated 🎉</p>
                </div>
                :
                (('sql_valid' in message) && ("sql_query" in message))?
                <div>
                  <ChatTyping content={message.sql_query?"SQL Query validated ✅":"SQL Query validation failed ❌. Valid SQL query generated"}/>
                  <SQLCode sqlCode={message?.sql_query}/>
                </div>
                :
                message?.recommended_visualization ?
                <div className='text-gray-700'>
                  <p> Recommended visualization : <strong className='text-blue-600 font-bold uppercase'>{message?.recommended_visualization}</strong></p>
                  <ChatTyping content={message?.reason || ""}/>
                </div>
                :message?.error &&
                <div>
                  <p className='text-red-700'>{message?.error}</p>
                  <p className='text-gray-700'>{message?.original}</p>
                </div>
                
              }
            </div>
          );
        })
              //   <div className="flex items-center p-6 w-full bg-white rounded-[18px] border border-yellow-gray-100">
              //   <FiCommand className="w-5 h-5 text-gray-400 animate-spin mr-3" />
              //   <span className="text-gray-600">Processing...</span>
              // </div>
      }
      {isProcessing && (
        <div className="flex items-center p-6 w-full bg-white rounded-[18px] border border-yellow-gray-100">
          <FiCommand className="w-5 h-5 text-gray-400 animate-spin mr-3" />
          <span className="text-gray-600">Processing...</span>
        </div>
      )}
    </div>
  );
};

export default Steps;
