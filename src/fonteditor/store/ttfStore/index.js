import { useState } from 'react';
import { createGlobalStore  } from 'hox';

export const [useTtfStore, getTtfStore] = createGlobalStore(() => {
  const [ttf, setTtf] = useState(null);

  return {
    ttf,
    setTtf,
  };
});