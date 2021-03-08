import { useState } from 'react';

type AnimationOption = {
  duration: number; // 에네미에션 재생 시간
};

/**
 * @description 애니메이션 재생을 컨트롤한다.
 * @param param0
 */
const useAnimation = ({ duration }: AnimationOption) => {
  // 애니메이션 실행 여부
  const [animate, setAnimate] = useState(false);

  const playAnimation = () => {
    setAnimate(true);

    setTimeout(() => setAnimate(false), duration);
  };

  return {
    animate,
    playAnimation,
  };
};

export default useAnimation;
