import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
}

export function useTypewriter({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
  loop = true,
}: UseTypewriterOptions) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (isWaiting) {
        setIsWaiting(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        // Delete characters
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => {
            if (loop) {
              return (prev + 1) % words.length;
            }
            return Math.min(prev + 1, words.length - 1);
          });
        }
      } else {
        // Type characters
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Word is complete, wait before deleting
          if (loop || currentWordIndex < words.length - 1) {
            setIsWaiting(true);
          }
        }
      }
    }, isDeleting ? deleteSpeed : isWaiting ? delayBetweenWords : typeSpeed);

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentWordIndex,
    isDeleting,
    isWaiting,
    words,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords,
    loop,
  ]);

  return {
    text: currentText,
    isComplete: !loop && currentWordIndex === words.length - 1 && currentText === words[words.length - 1],
  };
}