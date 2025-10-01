import React, { useState, useEffect } from 'react';

const CursorSVG = () => (
  <svg
    viewBox="8 4 8 16"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block w-[1ch] mb-1 animate-[flicker_0.5s_infinite]"
  >
    <rect x="10" y="6" width="4" height="12" fill="currentColor" />
  </svg>
);

interface ChatTypingProps {
  content: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

const ChatTyping: React.FC<ChatTypingProps> = ({
  content,
  speed = 30,
  className = '',
  onComplete
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setIsTyping(true);
    setDisplayText('');
    
    let index = 0;
    
    const intervalId = setInterval(() => {
      if (index <= content.length) {
        setDisplayText(content.slice(0, index));
        index++;
      } else {
        clearInterval(intervalId);
        setIsTyping(false);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [content, speed, onComplete]);

  return (
    <div className={`${className}`}>
      <span>{displayText}</span>
      {isTyping && <CursorSVG />}
    </div>
  );
};

export default ChatTyping