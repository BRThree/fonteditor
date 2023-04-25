import React, {useRef, useState} from 'react';
import {Button, Checkbox, Col, Form, Modal, Row} from "antd";
import styles from "../../../ImportDrop/components/ImportPic/index.module.scss";
import {validate} from "@/utils";
import {useProgramStore} from "../../../../../../../store/programStore";
import {useGlyphListStore} from "../../../../../../../store/glyphListStore";
import program from "../../../../../../../widget/program";

const ImpAndExp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef(null);
  const {program} = useProgramStore();
  const {setGlyphList} = useGlyphListStore();

  const initVal = program.setting.get('ie');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formRef.current) return;
    try {
      const res = await validate(formRef.current);
      program.setting.set('ie', res, true);
      setGlyphList([...program.ttfManager.getGlyf()]);
      setIsModalOpen(false)
    } catch (err) {
      console.log(err);
    }
  };

  const setDefault = () => {
    const setting = program.setting.getDefault('ie');
    formRef.current.setFieldsValue(setting);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={openModal} className={styles['container']}>
        导入和导出
      </div>
      <Modal
        title="导入和导出"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确定"
        width={500}
        destroyOnClose
      >
        <Form
          ref={r => formRef.current = r}
          initialValues={initVal}
        >
          <Form.Item
            valuePropName="checked"
            label="导入svg文件时合并成单个字形"
            name={"import.combinePath".split(".")}
          >
            <Checkbox/>
          </Form.Item>
          <Form.Item
            valuePropName="checked"
            label="保存字体时同时保存字形命名"
            name={"export.saveWithGlyfName".split(".")}
          >
            <Checkbox/>
          </Form.Item>
          <Button onClick={setDefault} type="link">重置为默认设置</Button>
        </Form>
      </Modal>
    </>
  )
}

export default ImpAndExp;