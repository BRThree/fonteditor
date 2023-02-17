import React from 'react';
import FontEditorLayout from '@/FontEditorLayout';
import controller from '@/controller/defaultNew';
import program from '@/widget/programNew';
import TTFManager from '@/widget/TTFManager';
import projectWidget from '@/widget/project';
import ProgramContext from '@/context/ProgramContext';

const init = () => {
  if (!program.ttfManager) {
    program.ttfManager = new TTFManager();
  }

  if (!program.project) {
    program.project = projectWidget;
  }

  controller.init(program);
};

init();

const App = () => {
  return (
    <ProgramContext.Provider value={{ program }}>
        <FontEditorLayout />
    </ProgramContext.Provider>
  );
};

export default App;
