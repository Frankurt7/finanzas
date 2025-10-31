import React from 'react';
import './AnimateCharacters.css';

interface AnimateCharactersProps {
  text: string;
  stagger?: number; // delay between characters in seconds
}

export const AnimateCharacters: React.FC<AnimateCharactersProps> = ({ text, stagger = 0.03 }) => {
  return (
    <>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="animated-char"
          style={{ animationDelay: `${index * stagger}s` }}
        >
          {char}
        </span>
      ))}
    </>
  );
};
