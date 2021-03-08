import React, { cloneElement, Children } from 'react';

interface WithLoggingProps {
  log: string;
}

/**
 * @description 횡단 관심사 처리를 위한 HOC
 * @param param0
 */
const WithLogging: React.FC<WithLoggingProps> = ({ children, log }) => {
  const child = Children.only(children) as JSX.Element;

  // 주입 메서드
  const logging = (log: string) => console.log(log);

  return cloneElement(child, {
    onClick: () => {
      child.props.onClick(); // 본래 의도한 동작
      logging(log); // logging
    },
  });
};

export default WithLogging;
