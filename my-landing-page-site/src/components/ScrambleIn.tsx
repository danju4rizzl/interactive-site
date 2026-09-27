import React, { useEffect, useState, useRef } from 'react';
import { SCRAMBLE_CHARSET } from '../constants/videos';
import type { ScrambleInProps } from '../types';

/**
 * ScrambleIn: Entrance reveal animation revealing text left-to-right with random characters
 */
export const ScrambleIn: React.FC<ScrambleInProps> = ({
  text,
  delay,
  triggered,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const frameRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getRandomChar = (): string => {
    const randomIndex = Math.floor(Math.random() * SCRAMBLE_CHARSET.length);
    return SCRAMBLE_CHARSET[randomIndex];
  };

  useEffect(() => {
    if (!triggered) {
      setHasStarted(false);
      setDisplayText('');
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setHasStarted(true);
      frameRef.current = 0;

      intervalRef.current = setInterval(() => {
        frameRef.current += 1;
        const revealCursor = Math.floor(frameRef.current * 0.5);

        if (revealCursor >= text.length) {
          setDisplayText(text);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return;
        }

        let result = '';
        for (let i = 0; i < text.length; i++) {
          if (i < revealCursor) {
            result += text[i];
          } else if (text[i] === ' ') {
            result += ' ';
          } else if (i < revealCursor + 3) {
            result += getRandomChar();
          } else {
            // Characters beyond revealCursor + 3 are empty
            break;
          }
        }
        setDisplayText(result);
      }, 25);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggered, text, delay]);

  if (!triggered || !hasStarted || !displayText) {
    return <span className={className} aria-hidden="true">&nbsp;</span>;
  }

  return <span className={className}>{displayText}</span>;
};
