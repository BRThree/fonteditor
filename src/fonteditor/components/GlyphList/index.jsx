import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import Glyph from '@/components/Glyph';
import { Col, Row, Pagination } from 'antd';
import actions from '@/controller/actionsNew';
import { useProgramStore } from '@/store/programStore';
import { useTtfStore } from '@/store/ttfStore';
import { useNavigate } from 'react-router-dom';
import { useGlyphListStore } from '../../store/glyphListStore';
import useNodeBoundingRect from '@/hooks/useNodeBoundingRect';
import ScrollBar from 'react-custom-scrollbars';

function GlyphList({ style = {} }) {
  const { program, getProjectId } = useProgramStore();
  const { ttf } = useTtfStore();
  const {
    selected,
    glyphList,
    setGlyphList,
    setEditingIndex,
    singleSelect,
    cleanSelected,
  } = useGlyphListStore();
  const navigate = useNavigate();
  const [rect, glyphContainer] = useNodeBoundingRect();
  const [curPage, setCurPage] = useState(1);
  const [pageSize, setPageSize] = useState(60);

  const span = useMemo(
    () => (rect ? Math.round(120 / (rect.width / 24)) : 2),
    [rect]
  );
  const startIndex = useMemo(
    () => (curPage - 1) * pageSize,
    [curPage, pageSize]
  );
  const endIndex = useMemo(() => startIndex + pageSize, [startIndex, pageSize]);
  const curList = useMemo(
    () => glyphList.slice(startIndex, endIndex),
    [startIndex, endIndex, glyphList]
  );

  useEffect(() => {
    ttf && setGlyphList([...program.ttfManager.getGlyf()]);
    cleanSelected();
  }, [ttf]);

  const renderGlyphList = () => {
    if (!ttf) return;
    const unitsPerEm = ttf.head.unitsPerEm;
    const descent = ttf.hhea.descent;
    const translateY = unitsPerEm + descent;

    return curList.map((item, i) => {
      const index = startIndex + i;
      return (
        <Col key={`${getProjectId()}-${index}`} span={span}>
          <Glyph
            isSelected={selected.some((item) => item === index)}
            index={index}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onClick={() => singleSelect(index)}
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
    <ScrollBar style={style}>
      <div className={styles['glyph-list']} ref={glyphContainer}>
        <Row gutter={[8, 8]}>
          {renderGlyphList()}
          {curList.length + (curPage - 1) * pageSize === glyphList.length && (
            <Col span={span}>
              <Glyph onPlus={handlePlus} type="empty" />
            </Col>
          )}
        </Row>
        <Pagination
          total={glyphList.length}
          pageSize={pageSize}
          current={curPage}
          onChange={(newPage, newPageSize) => {
            setCurPage(newPage);
            setPageSize(newPageSize);
          }}
          showSizeChanger={false}
          showQuickJumper
          showTotal={(total) => `共 ${total} 个字形`}
        />
      </div>
    </ScrollBar>
  );
}

export default GlyphList;
