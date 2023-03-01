import { useState, useMemo } from 'react';
import { createGlobalStore } from 'hox';

export const [useGlyphListStore, getGlyphListStore] = createGlobalStore(() => {
  const [glyphList, setGlyphList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [selected, setSelected] = useState([]);
  const selGlyphs = useMemo(() => selected.map(idx => glyphList[idx]), [selected, glyphList]);

  const singleSelect = (index) => {
    const hasSelected = selected.some(item => item === index);
    const newSelected = hasSelected ? [] : [index];
    setSelected(newSelected);
  };

  const cleanSelected = () => {
    setSelected([]);
  }

  return {
    selected,
    glyphList,
    editingIndex,
    selGlyphs,
    setGlyphList,
    setEditingIndex,
    singleSelect,
    cleanSelected
  };
});