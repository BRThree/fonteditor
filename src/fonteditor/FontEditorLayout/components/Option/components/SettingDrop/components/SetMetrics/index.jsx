import React, {useRef, useState} from 'react';
import {Form, Modal, Col, Row, InputNumber, Button, Select} from "antd";
import styles from "../../../ImportDrop/components/ImportPic/index.module.scss";
import {useProgramStore} from "@/store/programStore";
import {validate} from "@/utils";
import ScrollBar from "react-custom-scrollbars";
import panose from 'fonteditor-core/ttf/enum/panose';
import {useGlyphListStore} from "@/store/glyphListStore";
import program from "../../../../../../../widget/program";

const SetMetrics = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef(null);
  const {program} = useProgramStore();
  const {setGlyphList} = useGlyphListStore();

  const ttf = program.ttfManager.get();
  const initVal = {
    ...ttf['OS/2'], ...ttf['hhea'], ...ttf['post']
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formRef.current) return;
    try {
      const res = await validate(formRef.current);
      program.ttfManager.setMetrics(res);
      setGlyphList([...program.ttfManager.getGlyf()]);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComputed = () => {
    let metrics = program.ttfManager.calcMetrics();
    formRef.current.setFieldsValue({
      ...initVal,
      ...metrics
    });
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={openModal} className={styles['container']}>
        字体度量
      </div>
      <Modal
        title="字体度量"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确定"
        width={850}
        destroyOnClose
      >
        <ScrollBar style={{height: '65vh'}} autoHide>
          <Form
            ref={r => formRef.current = r}
            initialValues={initVal}
          >
            <Row gutter={10}>
              <Col span={8}>
                <Form.Item
                  label="上升"
                  name="ascent"
                  rules={[
                    {
                      required: true,
                      message: '请输入上升',
                    },
                  ]}
                >
                  <InputNumber style={{ width: '100%' }} placeholder="请输入上升"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="下降"
                  name="descent"
                  rules={[
                    {
                      required: true,
                      message: '请输入下降',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入下降"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="行间距"
                  name="lineGap"
                  rules={[
                    {
                      required: true,
                      message: '请输入行间距',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入行间距"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="win上升"
                  name="usWinAscent"
                  rules={[
                    {
                      required: true,
                      message: '请输入win上升',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入win上升"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="win下降"
                  name="usWinDescent"
                  rules={[
                    {
                      required: true,
                      message: '请输入win下降',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入win下降"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Button onClick={handleComputed}  type="link">计算</Button>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="typo上升"
                  name="sTypoAscender"
                  rules={[
                    {
                      required: true,
                      message: '请输入typo上升',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入typo上升"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="typo下降"
                  name="sTypoDescender"
                  rules={[
                    {
                      required: true,
                      message: '请输入typo下降',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入typo下降"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="typo间距"
                  name="sTypoLineGap"
                  rules={[
                    {
                      required: true,
                      message: '请输入typo间距',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入typo间距"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="x高度"
                  name="sxHeight"
                  rules={[
                    {
                      required: true,
                      message: '请输入x高度',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入x高度"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="大写H高度"
                  name="sCapHeight"
                  rules={[
                    {
                      required: true,
                      message: '请输入大写H高度',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入大写H高度"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="删除线位置"
                  name="yStrikeoutPosition"
                  rules={[
                    {
                      required: true,
                      message: '请输入删除线位置',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入删除线位置"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="删除线厚度"
                  name="yStrikeoutSize"
                  rules={[
                    {
                      required: true,
                      message: '请输入删除线厚度',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入删除线厚度"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="下划线位置"
                  name="underlinePosition"
                  rules={[
                    {
                      required: true,
                      message: '请输入下划线位置',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入下划线位置"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="下划线厚度"
                  name="underlineThickness"
                  rules={[
                    {
                      required: true,
                      message: '请输入下划线厚度',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入下划线厚度"/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="下标水平"
                  name="ySubscriptXSize"
                  rules={[
                    {
                      required: true,
                      message: '请输入下标水平',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入下标水平"/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="下标垂直"
                  name="ySubscriptYSize"
                  rules={[
                    {
                      required: true,
                      message: '请输入下标垂直',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入下标垂直"/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="下标x偏移"
                  name="ySubscriptXOffset"
                  rules={[
                    {
                      required: true,
                      message: '请输入下标x偏移',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入下标x偏移"/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="下标Y偏移"
                  name="ySubscriptYOffset"
                  rules={[
                    {
                      required: true,
                      message: '请输入下标Y偏移',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入下标Y偏移"/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="上标水平"
                  name="ySuperscriptXSize"
                  rules={[
                    {
                      required: true,
                      message: '请输入上标水平',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入上标水平"/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="上标垂直"
                  name="ySuperscriptYSize"
                  rules={[
                    {
                      required: true,
                      message: '请输入上标垂直',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入上标垂直"/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="上标X偏移"
                  name="ySuperscriptXOffset"
                  rules={[
                    {
                      required: true,
                      message: '请输入上标X偏移',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入上标X偏移"/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="上标Y偏移"
                  name="ySuperscriptYOffset"
                  rules={[
                    {
                      required: true,
                      message: '请输入上标Y偏移',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入上标Y偏移"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="供应商ID"
                  name="achVendID"
                  rules={[
                    {
                      required: true,
                      message: '请输入供应商ID',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入供应商ID"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="粗细"
                  name="usWeightClass"
                  rules={[
                    {
                      required: true,
                      message: '请输入粗细',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入粗细"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="宽度"
                  name="usWidthClass"
                  rules={[
                    {
                      required: true,
                      message: '请输入宽度',
                    },
                  ]}
                >
                  <InputNumber  style={{ width: '100%' }} placeholder="请输入宽度"/>
                </Form.Item>
              </Col>
              <Col span={24} style={{fontWeight: "bolder", marginBottom: "20px"}}>panose</Col>
              {
                Object.keys(panose).map((key) => (
                  <Col span={8} key={key}>
                    <Form.Item
                      label={key}
                      name={key}
                      rules={[
                        {
                          required: true,
                          message: '请选择' + key,
                        },
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        options={panose[key].map((val, idx) => (
                          {
                            value: idx,
                            label: val,
                          }
                        ))}
                        placeholder={`请选择${key}`}
                      />
                    </Form.Item>
                  </Col>
                ))
              }
            </Row>
          </Form>
        </ScrollBar>
      </Modal>
    </>
  )
}

export default SetMetrics;