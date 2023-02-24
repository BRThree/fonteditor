import { useState } from 'react';
import { createGlobalStore  } from 'hox';


export const [useProjectStore, getProjectStore] = createGlobalStore(() => {
  const [project, setProject] = useState(null);

  return {
    project,
  };
});