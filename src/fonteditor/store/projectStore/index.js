import { useState } from 'react';
import { createStore } from 'hox';


export const [useProjectStore, ProjectStoreProvider] = createStore(() => {
  const [project, setProject] = useState(null);

  return {
    project,
  };
});