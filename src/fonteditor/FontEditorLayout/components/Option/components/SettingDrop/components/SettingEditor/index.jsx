import React, {useRef, useState} from 'react';
import {Button, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Select} from "antd";
import styles from "../../../ImportDrop/components/ImportPic/index.module.scss";
import {validate} from "@/utils";
import ColorPicker from "@/components/CommandMenu/components/ColorPicker";
import {useProgramStore} from "../../../../../../../store/programStore";
import {useGlyphListStore} from "../../../../../../../store/glyphListStore";

const SettingEditor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef(null);
  const {program} = useProgramStore();
  const {setGlyphList} = useGlyphListStore();

  const initVal = program.setting.get('editor');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formRef.current) return;
    try {
      const res = await validate(formRef.current);
      program.setting.set('editor', res, true);
      setGlyphList([...program.ttfManager.getGlyf()]);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const setDefault = () => {
    const setting = program.setting.getDefault('editor');
    formRef.current.setFieldsValue(setting);
  }

  return (
    <>
      <div onClick={openModal} className={styles['container']}>
        编辑器设置
      </div>
      <Modal
        title="编辑器设置"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确定"
        width={650}
        destroyOnClose
      >
        <Form
          ref={r => formRef.current = r}
          initialValues={initVal}
        >
          <Row gutter={10}>
            <Col span={8}>
              <Form.Item
                valuePropName="color"
                label="字体列表颜色"
                name={"viewer.color".split('.')}
                rules={[
                  {
                    required: true,
                    message: '请输入字体列表颜色',
                  },
                ]}
              >
                <ColorPicker />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                label="字体列表大小"
                name={"viewer.shapeSize".split('.')}
                rules={[
                  {
                    required: true,
                    message: '请输入字体列表大小',
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      value: 'xlarge',
                      label: '特大',
                    },
                    {
                      value: 'large',
                      label: '大',
                    },
                    {
                      value: 'normal',
                      label: '中',
                    },
                    {
                      value: 'small',
                      label: '小',
                    },
                  ]}
                  style={{width: '100%'}}
                  placeholder="请输入字体列表大小"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                valuePropName="checked"
                label="吸附到网格线"
                name={"editor.sorption.enableGrid".split('.')}
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                valuePropName="checked"
                label="吸附到轮廓"
                name={"editor.sorption.enableShape".split('.')}
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                valuePropName="checked"
                label="显示网格线"
                name={"editor.axis.showGrid".split('.')}
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="填充轮廓"
                valuePropName="checked"
                name={"editor.fontLayer.fill".split('.')}
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="轮廓颜色"
                valuePropName="color"
                name={"editor.fontLayer.strokeColor".split('.')}
                rules={[
                  {
                    required: true,
                    message: '请选择轮廓颜色',
                  },
                ]}
              >
                <ColorPicker />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                valuePropName="color"
                label="轮廓填充颜色"
                name={"editor.fontLayer.fillColor".split('.')}
                rules={[
                  {
                    required: true,
                    message: '请选择轮廓填充颜色',
                  },
                ]}
              >
                <ColorPicker />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                valuePropName="color"
                label="网格线颜色"
                name={"editor.axis.gapColor".split('.')}
                rules={[
                  {
                    required: true,
                    message: '请选择网格线颜色',
                  },
                ]}
              >
                <ColorPicker />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                valuePropName="color"
                label="度量线颜色"
                name={"editor.axis.metricsColor".split('.')}
                rules={[
                  {
                    required: true,
                    message: '请选择度量线颜色',
                  },
                ]}
              >
                <ColorPicker />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="网格线间距"
                name={"editor.axis.graduation.gap".split('.')}
                rules={[
                  {
                    required: true,
                    message: '请输入网格线间距',
                  },
                ]}
              >
                <InputNumber style={{width: '100%'}} placeholder="请输入网格线间距"/>
              </Form.Item>
            </Col>
            <Col style={{textAlain: "center"}} span={8}>
              <Button onClick={setDefault} type="link">重置为默认设置</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default SettingEditor;