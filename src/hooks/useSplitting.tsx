import React, { useState, useEffect } from 'react';

const useSplitting = (getComponent: () => Promise<{ default: any }>) => {
  const [Component, setComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    getComponent().then(({ default: Splitted }) => {
      setComponent(Splitted);
    });
  }, []);

  return Component || null;
};

export default useSplitting;
