import { useState, useEffect } from 'react';

export const useTypewriter = (text: string, speed: number = 50, enabled: boolean = true) => {
  const [displayText, setDisplayText] = useState(enabled ? '' : text);

  useEffect(() => {
    if (!enabled) {
      setDisplayText(text);
      return;
    }

    if (!text) {
        setDisplayText('');
        return;
    };

    let i = 0;
    setDisplayText('');
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [text, speed, enabled]);

  if (!enabled) {
    return text;
  }

  return displayText;
};
