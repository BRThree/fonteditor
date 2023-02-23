import { useState } from 'react';
import { createStore } from 'hox';

export const [useTtfStore, TtfStoreProvider] = createStore(() => {
  const [ttf, setTtf] = useState(null);

  return {
    ttf,
    setTtf,
  };
});