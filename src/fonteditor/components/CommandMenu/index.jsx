import { Modal } from 'antd';
import React, { useState, useRef } from 'react';
import styles from './index.module.scss';
import { validate, resetForm } from '@/utils';
import submitStrategy from './submitStrategy';
import formStrategy from './formStrategy';
import { useProgramStore } from '@/store/programStore';
import { useGlyphListStore } from '../../store/glyphListStore';

const items = [
  {
    label: '调整位置',
    key: 'adjust-pos',
  },
  {
    label: '调整字形',
    key: 'adjust-glyph',
  },
  {
    label: '字形信息',
    key: 'setting-font',
  },
  {
    label: '导出字形',
    key: 'export',
  },
  {
    label: '设置代码点',
    key: 'set',
  },
];

function CommandMenu() {
  const [curKey, setCurKey] = useState('');
  const [curTitle, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useRef(null);

  const { program } = useProgramStore();
  const { setGlyphList } = useGlyphListStore();

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
      {items.map(({ label, key }) => (
        <li onClick={() => handleClick(key, label)} key={key}>
          {label}
        </li>
      ))}

      <Modal
        title={curTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
        destroyOnClose
      >
        {formStrategy[curKey]
          ? formStrategy[curKey](form)
          : formStrategy.default(form)}
      </Modal>
    </ul>
  );
}

export default CommandMenu;
