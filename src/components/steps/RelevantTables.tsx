import React from 'react';
import { TableInfo } from '../../interfaces/chatInterface';
import ChatTyping from '../ChatTyping';

interface RelevantTablesProps {
  parsed_question?: {
    is_relevant: boolean;
    relevant_tables: TableInfo[];
  };
}
const RelevantTables: React.FC<RelevantTablesProps> = ({ parsed_question }) => {
//   const [typingCompleted, setTypingCompleted] = useState(false);

  return (
    <div>
      <span className="text-gray-600">
        {parsed_question?.is_relevant ? (
          <ChatTyping
            content="Relevant tables selected as per your question"
            // onComplete={() => setTypingCompleted(true)}
          />
        ) : (
          <ChatTyping
            content="No relevant tables found"
            // onComplete={() => setTypingCompleted(true)}
          />
        )}
      </span>
      {parsed_question?.is_relevant &&
        parsed_question?.relevant_tables.map((table, index) => (
          <div key={index} className="my-2">
            <span className="bg-green-200 text-green-950 border border-green-500 rounded-md px-2 py-1 mx-1">
              {table?.table_name}
            </span>
          </div>
        ))}
    </div>
  );
};

export default RelevantTables;
