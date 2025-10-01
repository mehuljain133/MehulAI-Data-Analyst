interface HighlightTextProps {
    text: string;
  }
  
  const HighlightText: React.FC<HighlightTextProps> = ({ text }) => {
    // Regular expression to match text between double asterisks
    const parts = text.split(/(\*\*.*?\*\*)/g);
  
    return (
      <span>
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            // Remove the asterisks and highlight the text
            const highlightedText = part.slice(2, -2);
            return (
              <span key={index} className="font-bold text-blue-600">
                {highlightedText}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  };
  
  export default HighlightText;