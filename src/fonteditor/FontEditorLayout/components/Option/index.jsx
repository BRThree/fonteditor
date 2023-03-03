import React from 'react';
import { Dropdown, Space, Button } from 'antd';
import { DownOutlined, DownloadOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const importItems = [
  { label: '导入图片', key: 'import-pic' },
  { label: '加载线上字体', key: 'add-online' },
  { label: '从URL加载字体', key: 'add-url' },
  { label: '从同步服务器字体', key: 'sync-from-server' },
];

function Option() {
  return (
    <div className={styles['opt-container']}>
      <div className={styles['opt-group']}>
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
        <Dropdown
          menu={{
            items: importItems,
          }}
          trigger="click"
        >
          <Button className={styles['m-btn']} type="text">
            <Space className={styles['m-btn-text']}>
              工具
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Dropdown
          menu={{
            items: importItems,
          }}
          trigger="click"
        >
          <Button className={styles['m-btn']} type="text">
            <Space className={styles['m-btn-text']}>
              设置
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
      <div className={styles['opt-group']}>
        <Button className={styles['s-btn']} size="small" type="primary" ghost>
          <Space className={styles['s-btn-text']}>
            TTF
            <DownloadOutlined />
          </Space>
        </Button>
        <Button className={styles['s-btn']} size="small" type="primary" ghost>
          <Space className={styles['s-btn-text']}>
            WOFF
            <DownloadOutlined />
          </Space>
        </Button>
        <Button className={styles['s-btn']} size="small" type="primary" ghost>
          <Space className={styles['s-btn-text']}>
            WOFF2
            <DownloadOutlined />
          </Space>
        </Button>
        <Button className={styles['s-btn']} size="small" type="primary" ghost>
          <Space className={styles['s-btn-text']}>
            ZIP
            <DownloadOutlined />
          </Space>
        </Button>
      </div>
      <div className={`${styles['opt-group']} ${styles['opt-group-last']}`}>
        <Dropdown
          menu={{
            items: importItems,
          }}
          trigger="click"
        >
          <Button className={styles['m-btn']} type="text">
            <Space className={styles['m-btn-text']}>
              预览
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}

export default Option;
