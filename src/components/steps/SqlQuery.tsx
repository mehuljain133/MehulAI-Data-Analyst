import React,{useEffect} from "react";
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'; // Dark theme
import 'prismjs/components/prism-sql'; // SQL language support

// sql code component interface
interface SQLCodeProps {
    sqlCode: string | undefined
}

const SQLCode: React.FC<SQLCodeProps> = ({sqlCode}) => {
    useEffect(() => {
      Prism.highlightAll();
    }, []);
  
    return (
      <pre>
        <code
          className="language-sql"
          style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflow: 'visible' }}
        >
          {sqlCode}
        </code>
      </pre>
    );
  };

export default SQLCode