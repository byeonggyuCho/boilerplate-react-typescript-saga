import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useUUID = () => {
  const [UUID, setUUID] = useState<string>();

  useEffect(() => {
    setUUID(uuidv4());
  }, []);

  return UUID;
};

export default useUUID;
