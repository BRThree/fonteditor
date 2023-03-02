import { Modal } from 'antd';
import React, { useState, useRef, useMemo } from 'react';
import items from './static';
import styles from './index.module.scss';
import { validate } from '@/utils';
import submitStrategy from './submitStrategy';
import formStrategy from './formStrategy';
import footerStrategy from './footerStrategy';
import { useProgramStore } from '@/store/programStore';
import { useGlyphListStore } from '@/store/glyphListStore';

function CommandMenu() {
  const { program } = useProgramStore();
  const { setGlyphList, selGlyphs } = useGlyphListStore();
  const [curKey, setCurKey] = useState('');
  const [curTitle, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useRef(null);

  const oneSelected = useMemo(() => selGlyphs.length === 1, [selGlyphs]);
  const hasSelected = useMemo(() => selGlyphs.length > 0, [selGlyphs]);

  const handleClick = (key, title) => {
    setCurKey(key);
    setTitle(title);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!form.current) return;
    try {
      const res = await validate(form.current);
      submitStrategy[curKey](res);
      setGlyphList([...program.ttfManager.getGlyf()]);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <ul className={styles['command-menu-container']}>
      {items.map(({ label, key, needSelOne }) => {
        return needSelOne ? (
          <li onClick={() => handleClick(key, label)} key={key}>
            {label}
            {!oneSelected && (
              <div
                onClick={(evt) => evt.stopPropagation()}
                className={styles['disabled']}
              />
            )}
          </li>
        ) : (
          <li onClick={() => handleClick(key, label)} key={key}>
            {label}
          </li>
        );
      })}

      <Modal
        title={curTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
        destroyOnClose
        footer={
          footerStrategy[curKey]
            ? footerStrategy[curKey]()
            : footerStrategy.default()
        }
      >
        {formStrategy[curKey]
          ? formStrategy[curKey](form)
          : formStrategy.default(form)}
      </Modal>
    </ul>
  );
}

export default CommandMenu;
