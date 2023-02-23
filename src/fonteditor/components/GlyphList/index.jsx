import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useProgramStore } from '@/store/programStore';
import Glyph from '@/components/Glyph';
import CommandMenu from '@/components/CommandMenu';
import { Col, Row } from 'antd';
import actions from '@/controller/actionsNew';
import { useTtfStore } from '@/store/ttfStore';
import { useNavigate } from 'react-router-dom';

function GlyphList() {
  const { program, getProjectId } = useProgramStore();
  const { ttf } = useTtfStore();
  const navigate = useNavigate();

  const [glyphList, setGlyphList] = useState([]);

  useEffect(() => {
    ttf && setGlyphList([...program.ttfManager.getGlyf()]);
  }, [ttf]);

  const renderGlyphList = () => {
    if (!ttf) return;
    const unitsPerEm = ttf.head.unitsPerEm;
    const descent = ttf.hhea.descent;
    const translateY = unitsPerEm + descent;

    return glyphList.map((item, index) => {
      return (
        <Col key={`${getProjectId()}-${index}`} span={2}>
          <Glyph
            index={index}
            onEdit={handleEdit}
            onDelete={handleDelete}
            unitsPerEm={unitsPerEm}
            translateY={translateY}
            glyph={item}
            ttf={ttf}
          />
        </Col>
      );
    });
  };

  const handleEdit = (index) => {
    navigate('/editor');
  };

  const handleDelete = (index) => {
    program.ttfManager.removeGlyf([index]);
    setGlyphList([...program.ttfManager.getGlyf()]);
  };

  const handlePlus = () => {
    actions['add-new'](program);
    setGlyphList([...program.ttfManager.getGlyf()]);
  };

  const handleSave = (evt) => {
    if (evt.key === 's' && (evt.ctrlKey || evt.metaKey)) {
      debugger;
      evt.preventDefault();
      actions['save'](program);
    }
  };

  return (
    <div tabIndex={-1} onKeyDown={handleSave} className={styles['glyph-list']}>
      <CommandMenu />
      <Row gutter={[8, 8]}>
        {renderGlyphList()}
        <Col span={2}>
          <Glyph onPlus={handlePlus} type="empty" />
        </Col>
      </Row>
    </div>
  );
}

export default GlyphList;
