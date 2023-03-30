import React, { useRef } from 'react';
import styles from './index.module.scss';
import { useProgramStore } from '@/store/programStore';
import { useTtfStore } from '@/store/ttfStore';
import { useGlyphListStore } from '@/store/glyphListStore';

function ImportFiles() {
  const filePicker = useRef(null);

  const { program } = useProgramStore();
  const { setTtf } = useTtfStore();
  const { setGlyphList } = useGlyphListStore();

  const loadFiles = (files) => {
    let file = files[0];
    if (program.loader.supportImport(file.name)) {
      if (program.ttfManager.get()) {
        // 校验同一种字体文件 过滤不同的字体文件
        let ext = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase();
        let reg = new RegExp('.' + ext + '$', 'i');
        files = Array.prototype.slice.call(files).filter(function (f) {
          return reg.test(f.name);
        });

        files.forEach(function (f) {
          program.loader.load(f, {
            type: ext,
            success(imported) {
              if (imported.glyf.length) {
                program.ttfManager.merge(imported, {
                  scale: true,
                  adjustGlyf: imported.from === 'svg',
                });
                setTtf({ ...program.ttfManager.get() });
                setGlyphList([...program.ttfManager.getGlyf()]);
              }
            },
          });
        });
      }
    }
  };

  const fileChange = (evt) => {
    loadFiles(evt.target.files);
  };

  const openFilePicker = () => {
    filePicker.current.click();
  };

  return (
    <div onClick={openFilePicker} className={styles['container']}>
      导入文件
      <input
        onChange={fileChange}
        ref={filePicker}
        className={styles['file-picker']}
        type="file"
        multiple
      />
    </div>
  );
}

export default ImportFiles;
