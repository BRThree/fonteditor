import React from 'react';
import { Dropdown, Space, Button } from 'antd';
import { DownOutlined, DownloadOutlined } from '@ant-design/icons';
import ImportDrop from './components/ImportDrop';
import ToolDrop from "./components/ToolDrop";
import SettingDrop from "./components/SettingDrop";
import styles from './index.module.scss';
import PreviewDrop from "./components/PreviewIDrop";
import exporter from "../../../widget/exporter";
import {useProgramStore} from "../../../store/programStore";

function Option() {
  const {program} = useProgramStore();
  const exportFile = (type) => {
    if (program.ttfManager.get()) {
      exporter.export(program.ttfManager.get(), {
        type: type,
        error(ev) {
          program.fire('font-error', ev);
        }
      }, program);
    }
  }

  return (
    <div className={styles['opt-container']}>
      <div className={styles['opt-group']}>
        <ImportDrop />
        <ToolDrop />
        <SettingDrop />
      </div>
      <div className={styles['opt-group']}>
        <Button onClick={() => exportFile('ttf')} className={styles['s-btn']} size="small" type="primary" ghost>
          <Space className={styles['s-btn-text']}>
            TTF
            <DownloadOutlined />
          </Space>
        </Button>
        <Button onClick={() => exportFile('woff')} className={styles['s-btn']} size="small" type="primary" ghost>
          <Space className={styles['s-btn-text']}>
            WOFF
            <DownloadOutlined />
          </Space>
        </Button>
        <Button onClick={() => exportFile('woff2')} className={styles['s-btn']} size="small" type="primary" ghost>
          <Space className={styles['s-btn-text']}>
            WOFF2
            <DownloadOutlined />
          </Space>
        </Button>
        <Button onClick={() => exportFile('zip')} className={styles['s-btn']} size="small" type="primary" ghost>
          <Space className={styles['s-btn-text']}>
            ZIP
            <DownloadOutlined />
          </Space>
        </Button>
      </div>
      <div className={`${styles['opt-group']} ${styles['opt-group-last']}`}>
        <PreviewDrop />
      </div>
    </div>
  );
}

export default Option;
