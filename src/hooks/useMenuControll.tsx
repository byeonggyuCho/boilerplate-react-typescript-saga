import React, { useEffect } from 'react';

interface Props {
  closeFn: (data?: any) => void;
  data?: any;
  containerRef?: any;
}

/**
 * @description 백그라운드를 클릭하면 닫힌다.
 * @param {HTMLElement} containerRef 백그라운드의 요소를 지정한다.
 * @param {Function} closeFn 메뉴를 닫을 함수.
 */
const useMenuControll = ({ closeFn, containerRef, data }: Props) => {
  const closeFunction = (event: MouseEvent) => {
    closeFn(data);
  };

  useEffect(() => {
    const targetContainer = containerRef ? containerRef : window;

    targetContainer.addEventListener('mouseup', closeFunction);

    return () => {
      targetContainer.removeEventListener('mouseup', closeFunction);
    };
  }, []);
};

export default useMenuControll;
