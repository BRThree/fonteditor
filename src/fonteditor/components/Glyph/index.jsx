import React from 'react';
import styles from './index.module.scss';
import glyf2svg from 'fonteditor-core/ttf/util/glyf2svg';
import { EditOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';

function Glyph({
  type,
  glyph,
  index,
  unitsPerEm,
  translateY,
  ttf,
  onEdit = () => {},
  onDelete = () => {},
  onPlus = () => {},
}) {
  const d = glyf2svg(glyph, ttf);
  return type === 'empty' ? (
    <div onClick={onPlus} className={styles['glyph-empty']}>
      <PlusOutlined />
    </div>
  ) : (
    <div className={styles['glyph-container']}>
      <div className={styles['opt-box']}>
        <EditOutlined
          onClick={() => onEdit(index)}
          className={styles['opt-icon']}
        />
        <CloseOutlined
          onClick={() => onDelete(index)}
          className={styles['opt-icon']}
        />
      </div>
      <div className={styles['glyph']}>
        <svg
          className={styles['glyph-svg']}
          viewBox={`0 0 ${unitsPerEm} ${unitsPerEm}`}
        >
          <g
            transform={`scale(1, -1) translate(0, -${translateY}) scale(0.9, 0.9) `}
          >
            <path className={styles['path']} d={d} />
          </g>
        </svg>
      </div>
      <div className={styles['glyph-info']}>
        <div className={styles['glyph-unicode']}>{glyph.unicode}</div>
        <div className={styles['glyph-name']}>{glyph.name}</div>
      </div>
    </div>
  );
}

export default Glyph;
