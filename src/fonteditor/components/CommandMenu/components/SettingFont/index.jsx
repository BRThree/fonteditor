import { Form, InputNumber, Input } from 'antd';
import React from 'react';
import { useGlyphListStore } from '@/store/glyphListStore';

const defaultVal = {
  unicode: 0,
  name: '',
  leftSideBearing: 0,
  rightSideBearing: 0,
};

function SettingFont({ bindRef = (r) => {} }) {
  const { selGlyphs } = useGlyphListStore();
  // 检查是否选择了一个字体
  const initVal =
    selGlyphs.length === 1
      ? {
          unicode: selGlyphs[0].unicode,
          name: selGlyphs[0].name,
          leftSideBearing: selGlyphs[0].leftSideBearing,
          rightSideBearing:
            selGlyphs[0].advanceWidth - (selGlyphs[0].xMax || 0),
        }
      : defaultVal;

  return (
    <Form ref={bindRef} initialValues={initVal} autoComplete="off">
      <Form.Item label="unicode" name="unicode">
        <Input />
      </Form.Item>
      <Form.Item label="命名" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="左边距" name="leftSideBearing">
        <InputNumber />
      </Form.Item>
      <Form.Item label="右边距" name="rightSideBearing">
        <InputNumber />
      </Form.Item>
    </Form>
  );
}

export default SettingFont;
