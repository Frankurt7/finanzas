import { useState, useEffect, useRef } from "react";

// Función de easing para una animación más suave
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export const useCountUp = (end: number, duration: number = 800) => {
  const [count, setCount] = useState(0);
  const animationFrameId = useRef<number>(0);
  const prevEndRef = useRef(0);

  useEffect(() => {
    const startValue = prevEndRef.current;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setCount(easedProgress * (end - startValue) + startValue);

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(step);
      } else {
        prevEndRef.current = end;
      }
    };

    animationFrameId.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId.current as number);
  }, [end, duration]);

  return count;
};
