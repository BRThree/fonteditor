import { useState } from 'react';
import { createGlobalStore } from 'hox';

export const [useGlyphListStore, getGlyphListStore] = createGlobalStore(() => {
  const [glyphList, setGlyphList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  return {
    glyphList,
    editingIndex,
    setGlyphList,
    setEditingIndex,
  };
});