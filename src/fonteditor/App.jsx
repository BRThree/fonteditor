import React from 'react';
import FontEditorLayout from '@/FontEditorLayout';
import { ProgramStoreProvider } from '@/store/programStore';
import { TtfStoreProvider } from '@/store/ttfStore';

const App = () => {
  return (
    <TtfStoreProvider>
      <ProgramStoreProvider>
        <FontEditorLayout />
      </ProgramStoreProvider>
    </TtfStoreProvider>
  );
};

export default App;
