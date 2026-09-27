import React, { useEffect, useState, useRef } from 'react';
import { SCRAMBLE_CHARSET } from '../constants/videos';
import type { ScrambleTextProps } from '../types';

/**
 * ScrambleText: Hover-driven scramble animation that reveals characters left-to-right
 */
export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  isHovered,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const frameRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getRandomChar = (): string => {
    const randomIndex = Math.floor(Math.random() * SCRAMBLE_CHARSET.length);
    return SCRAMBLE_CHARSET[randomIndex];
  };

  useEffect(() => {
    if (!isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayText(text);
      return;
    }

    frameRef.current = 0;

    intervalRef.current = setInterval(() => {
      frameRef.current += 1;
      const revealedCount = Math.floor(frameRef.current / 4);

      if (revealedCount >= text.length) {
        setDisplayText(text);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }

      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (i < revealedCount) {
          result += text[i];
        } else if (text[i] === ' ') {
          result += ' ';
        } else {
          result += getRandomChar();
        }
      }
      setDisplayText(result);
    }, 25);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered, text]);

  return <span className={className}>{displayText}</span>;
};
