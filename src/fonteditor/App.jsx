import React from 'react';
import FontEditorLayout from '@/FontEditorLayout';
import { HoxRoot } from 'hox';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <HoxRoot>
        <FontEditorLayout />
      </HoxRoot>
    </ConfigProvider>
  );
};

export default App;
