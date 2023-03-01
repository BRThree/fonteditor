import { Form, InputNumber } from 'antd';
import React from 'react';
import { useGlyphListStore } from '@/store/glyphListStore';

const defaultVal = {
  leftSideBearing: 0,
  rightSideBearing: 0,
  verticalAlign: 0,
};

function AdjustPos({ bindRef = (r) => {} }) {
  const { selGlyphs } = useGlyphListStore();

  // 检查是否选择了一个字体
  const initVal =
    selGlyphs.length === 1
      ? {
          unicode: selGlyphs[0].unicode,
          leftSideBearing: selGlyphs[0].leftSideBearing,
          rightSideBearing: selGlyphs[0].advanceWidth - selGlyphs[0].xMax,
        }
      : defaultVal;

  return (
    <Form ref={bindRef} initialValues={initVal} autoComplete="off">
      <Form.Item label="左边距" name="leftSideBearing">
        <InputNumber />
      </Form.Item>
      <Form.Item label="右边距" name="rightSideBearing">
        <InputNumber />
      </Form.Item>
      <Form.Item label="基线偏移" name="verticalAlign">
        <InputNumber />
      </Form.Item>
    </Form>
  );
}

export default AdjustPos;
