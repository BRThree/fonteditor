import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import styles from './index.module.scss';

function ColorPicker({ color, onChange }) {
  const [visible, setVisible] = useState(false);

  // 处理点击任意外部区域关闭颜色选择器
  useEffect(() => {
    document.addEventListener('click', hidePicker);
    return () => {
      document.removeEventListener('click', hidePicker);
    };
  }, []);

  // 隐藏颜色选择器
  const hidePicker = (e) => {
    setVisible(false);
  };

  // 点击色块
  const onClickBlock = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    setVisible(true);
  };

  return (
    <div className={styles.container}>
      <span
        onClick={onClickBlock}
        style={{
          background: color,
        }}
        className={styles.emitter}
      >
        {color}
      </span>
      {visible && (
        <ChromePicker
          onChange={(color) => onChange(color.hex)}
          color={color}
          className={styles['color-picker']}
        />
      )}
    </div>
  );
}

export default ColorPicker;
