import React from 'react';
import { Input, Checkbox, Form } from 'antd';

const defaultVal = {
  unicode: '$E001',
  isGenerateName: true,
};

function SettingUnicode({ bindRef = (r) => {} }) {
  return (
    <Form ref={bindRef} initialValues={defaultVal} autoComplete="off">
      <Form.Item label="起始代码点" name="unicode">
        <Input />
      </Form.Item>
      <Form.Item
        valuePropName="checked"
        label="是否生成字形名称"
        name="isGenerateName"
      >
        <Checkbox />
      </Form.Item>
    </Form>
  );
}

export default SettingUnicode;
