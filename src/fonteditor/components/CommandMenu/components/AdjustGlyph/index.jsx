import { Form, InputNumber, Checkbox } from 'antd';
import React, { useState } from 'react';

const defaultVal = {
  reverse: false,
  mirror: false,
  scale: 0,
  ajdustToEmBox: false,
  ajdustToEmPadding: 0,
};

function AdjustGlyph({ bindRef = (r) => {} }) {
  const [isAjdustToEmBox, setIsAjdustToEmBox] = useState(false);
  return (
    <Form ref={bindRef} initialValues={defaultVal} autoComplete="off">
      <Form.Item valuePropName="checked" label="翻转" name="reverse">
        <Checkbox />
      </Form.Item>
      <Form.Item valuePropName="checked" label="镜像" name="mirror">
        <Checkbox />
      </Form.Item>
      <Form.Item label="等比例缩放" name="scale">
        <InputNumber />
      </Form.Item>
      <Form.Item
        valuePropName="checked"
        label="放大字形至上下边界"
        name="ajdustToEmBox"
      >
        <Checkbox onChange={(checked) => setIsAjdustToEmBox(checked)} />
      </Form.Item>
      {isAjdustToEmBox && (
        <Form.Item label="顶部和底部留白" name="ajdustToEmPadding">
          <InputNumber />
        </Form.Item>
      )}
    </Form>
  );
}

export default AdjustGlyph;
