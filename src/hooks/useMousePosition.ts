import { useLayoutEffect, useState } from 'react';

//This is the method I use for detecting actual  mouse position
// @note https://codesandbox.io/s/recharts-custom-tooltip-iz33j?file=/src/useMousePosition.jsx:0-515
export default function useMousePosition() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  useLayoutEffect(() => {
    function updatePosition(e: any) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    document.addEventListener('mousemove', updatePosition);
    return () => document.removeEventListener('mousemove', updatePosition);
  }, []);

  return position;
}
