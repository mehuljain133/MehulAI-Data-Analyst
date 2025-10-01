import React, { useState } from 'react';
import ChatTyping from './ChatTyping';
import HighlightText from './steps/HighlightText';

interface TypewriterWithHighlightProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypewriterWithHighlight: React.FC<TypewriterWithHighlightProps> = ({
  text,
  speed = 30,
  className = ''
}) => {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <div className={className}>
      {isComplete ? (
        <HighlightText text={text} />
      ) : (
        <ChatTyping 
          content={text} 
          speed={speed} 
          onComplete={() => setIsComplete(true)} 
        />
      )}
    </div>
  );
};

export default TypewriterWithHighlight;