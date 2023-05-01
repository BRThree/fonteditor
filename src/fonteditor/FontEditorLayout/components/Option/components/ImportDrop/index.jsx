import React from 'react';
import styles from '../../index.module.scss';
import { Dropdown, Space, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ImportFiles from './components/ImportFiles';
import ImportPic from './components/ImportPic';
import AddOnline from './components/AddOnline';

function ImportDrop() {
  const importItems = [
    { label: <ImportFiles />, key: 'import-files' },
    { label: <ImportPic />, key: 'import-pic' },
    // { label: <AddOnline />, key: 'add-online' },
    // { label: '从URL加载字体', key: 'add-url' },
    // { label: '从同步服务器字体', key: 'sync-from-server' },
  ];
  return (
    <Dropdown
      menu={{
        items: importItems,
      }}
      trigger="click"
    >
      <Button className={styles['m-btn']} type="text">
        <Space className={styles['m-btn-text']}>
          导入
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}

export default ImportDrop;
