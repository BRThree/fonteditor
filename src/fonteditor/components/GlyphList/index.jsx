import React, { useEffect, useMemo } from 'react';
import styles from './index.module.scss';
import Glyph from '@/components/Glyph';
import CommandMenu from '@/components/CommandMenu';
import { Col, Row } from 'antd';
import actions from '@/controller/actionsNew';
import { useProgramStore } from '@/store/programStore';
import { useTtfStore } from '@/store/ttfStore';
import { useNavigate } from 'react-router-dom';
import { useGlyphListStore } from '../../store/glyphListStore';
import useNodeBoundingRect from '@/hooks/useNodeBoundingRect';

function GlyphList() {
  const { program, getProjectId } = useProgramStore();
  const { ttf } = useTtfStore();
  const { glyphList, setGlyphList, setEditingIndex } = useGlyphListStore();
  const navigate = useNavigate();
  const [rect, glyphContainer] = useNodeBoundingRect();

  const span = useMemo(
    () => (rect ? Math.round(120 / (rect.width / 24)) : 2),
    [rect]
  );

  useEffect(() => {
    ttf && setGlyphList([...program.ttfManager.getGlyf()]);

    return () => {
      // setEditingIndex(-1);
    }
  }, [ttf]);

  const renderGlyphList = () => {
    if (!ttf) return;
    const unitsPerEm = ttf.head.unitsPerEm;
    const descent = ttf.hhea.descent;
    const translateY = unitsPerEm + descent;

    return glyphList.map((item, index) => {
      return (
        <Col key={`${getProjectId()}-${index}`} span={span}>
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
    setEditingIndex(index);
    navigate(`/editor?index=${index}`);
  };

  const handleDelete = (index) => {
    program.ttfManager.removeGlyf([index]);
    setGlyphList([...program.ttfManager.getGlyf()]);
  };

  const handlePlus = () => {
    actions['add-new'](program);
    setGlyphList([...program.ttfManager.getGlyf()]);
  };

  return (
    <div ref={glyphContainer} className={styles['glyph-list']}>
      <CommandMenu />
      <Row gutter={[8, 8]}>
        {renderGlyphList()}
        <Col span={span}>
          <Glyph onPlus={handlePlus} type="empty" />
        </Col>
      </Row>
    </div>
  );
}

export default GlyphList;
