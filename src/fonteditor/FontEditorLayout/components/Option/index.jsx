import React from 'react';
import { Dropdown, Space, Button } from 'antd';
import { DownOutlined, DownloadOutlined } from '@ant-design/icons';
import ImportDrop from './components/ImportDrop';
import styles from './index.module.scss';

const toolItems = [
  { label: '生成字形名称', key: 'setting-glyf-name' },
  { label: '清除字形名称', key: 'setting-glyf-clearname' },
  { label: '优化字体', key: 'setting-optimize' },
  { label: '按代码点进行排序', key: 'setting-sort' },
  { label: '复合字形转简单字形', key: 'setting-compound2simple' },
];

const settingItems = [
  { label: '字体信息', key: 'setting-name' },
  { label: '字体度量', key: 'setting-metrics' },
  { label: '编辑器设置', key: 'setting-editor' },
  { label: '导入和导出', key: 'setting-import-and-export' },
];

const previewItems = [
  { label: 'ttf字体', key: 'ttf' },
  { label: 'woff2字体', key: 'woff2' },
  { label: 'woff字体', key: 'woff' },
];

function Option() {
  return (
    <div className={styles['opt-container']}>
      <div className={styles['opt-group']}>
        <ImportDrop />
        <Dropdown
          menu={{
            items: toolItems,
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
            items: settingItems,
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
            items: previewItems,
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
