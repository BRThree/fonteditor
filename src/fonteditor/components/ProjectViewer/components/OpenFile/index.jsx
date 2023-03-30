import { Button } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import styles from './index.module.scss';
import { useProgramStore } from '@/store/programStore';
import { useTtfStore } from '@/store/ttfStore';
import { useGlyphListStore } from '@/store/glyphListStore';

function OpenFile({ children }) {
  const filePicker = useRef(null);

  const { program, setProjectId } = useProgramStore();
  const { setTtf } = useTtfStore();
  const { setGlyphList, cleanSelected } = useGlyphListStore();

  const loadFiles = (files) => {
    let file = files[0];
    if (program.loader.supportLoad(file.name)) {
      program.loader.load(file, {
        type: file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase(),
        success(imported) {
          // 清除选中项
          cleanSelected();
          // 设置新的ttf
          program.ttfManager.set(imported);
          setTtf({ ...program.ttfManager.get() });
          setGlyphList([...program.ttfManager.getGlyf()]);
          // 清除projectId
          program.data.projectId = null;
          setProjectId(null);
        },
      });
    }
  };

  const fileChange = (evt) => {
    loadFiles(evt.target.files);
  };

  const openFilePicker = () => {
    filePicker.current.click();
  };

  return (
    <div className={styles['container']}>
      <Button
        onClick={openFilePicker}
        className={styles['file-btn']}
        icon={<FolderOpenOutlined />}
      >
        {children}
      </Button>
      <input
        onChange={fileChange}
        ref={filePicker}
        className={styles['file-picker']}
        type="file"
      />
    </div>
  );
}

export default OpenFile;
