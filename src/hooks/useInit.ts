import React, { useState, useEffect, useRef } from 'react';

const useInit = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  return !!init;
};

export default useInit;
