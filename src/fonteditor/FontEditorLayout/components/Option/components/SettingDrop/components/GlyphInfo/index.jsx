import React, {useRef, useState} from 'react';
import {DatePicker, Form, Input, InputNumber, Modal} from "antd";
import styles from "../../../ImportDrop/components/ImportPic/index.module.scss";
import {validate} from '@/utils';
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {useProgramStore} from "@/store/programStore";
import {useGlyphListStore} from "@/store/glyphListStore";

const layout = {
    labelCol: {span: 6},
};

const GlyphInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = useRef(null);
    const {program} = useProgramStore();
    const {setGlyphList} = useGlyphListStore();

    const ttf = program.ttfManager.get();
    let initVal = {
        ...ttf['head'],
        ...ttf['name'],
        created: dayjs(ttf['head'].created),
        modified: dayjs(ttf['head'].modified)
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!formRef.current) return;
        try {
            const res = await validate(formRef.current);
            res.created = res.created.unix();
            res.modified = res.modified.unix();
            program.ttfManager.setInfo(res);
            setGlyphList([...program.ttfManager.getGlyf()]);
            setIsModalOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div onClick={openModal} className={styles['container']}>
                字体信息
            </div>
            <Modal
                title="字体信息"
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={handleCancel}
                cancelText="取消"
                okText="确定"
                width={650}
                destroyOnClose
            >
                <Form
                    {...layout}
                    ref={formRef}
                    onFinish={handleSubmit}
                    autoComplete="off"
                    initialValues={initVal}
                >
                    <Form.Item
                        label="字体家族"
                        name="fontFamily"
                        rules={[
                            {
                                required: true,
                                message: '请输入字体家族',
                            },
                        ]}
                    >
                        <Input placeholder="请输入字体家族"/>
                    </Form.Item>
                    <Form.Item
                        label="子字体家族"
                        name="fontSubFamily"
                        rules={[
                            {
                                required: true,
                                message: '请输入子字体家族',
                            },
                        ]}
                    >
                        <Input placeholder="请输入子字体家族"/>
                    </Form.Item>
                    <Form.Item
                        label="完整字体名字"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: '请输入完整字体名字',
                            },
                        ]}
                    >
                        <Input placeholder="请输入完整字体名字"/>
                    </Form.Item>
                    <Form.Item
                        label="唯一字体识别名"
                        name="uniqueSubFamily"
                        rules={[
                            {
                                required: true,
                                message: '请输入唯一字体识别名',
                            },
                        ]}
                    >
                        <Input placeholder="请输入唯一字体识别名"/>
                    </Form.Item>
                    <Form.Item
                        label="版本"
                        name="version"
                        rules={[
                            {
                                required: true,
                                message: '请输入版本',
                            },
                        ]}
                    >
                        <Input placeholder="请输入版本"/>
                    </Form.Item>
                    <Form.Item
                        label="PostScript名称"
                        name="postScriptName"
                        rules={[
                            {
                                required: true,
                                message: '请输入PostScript名称',
                            },
                        ]}
                    >
                        <Input placeholder="请输入PostScript名称"/>
                    </Form.Item>
                    <Form.Item
                        label="em框大小"
                        name="unitsPerEm"
                        rules={[
                            {
                                required: true,
                                message: '请输入em框大小',
                            },
                        ]}
                    >
                        <InputNumber style={{width: 300}} placeholder="请输入em框大小"/>
                    </Form.Item>
                    <Form.Item
                        label="最小可读尺寸"
                        name="lowestRecPPEM"
                        rules={[
                            {
                                required: true,
                                message: '请输入最小可读尺寸',
                            },
                        ]}
                    >
                        <InputNumber style={{width: 300}} placeholder="请输入最小可读尺寸"/>
                    </Form.Item>
                    <Form.Item
                        label="创建日期"
                        name="created"
                        rules={[
                            {
                                required: true,
                                message: '请输入创建日期',
                            },
                        ]}
                    >
                        <DatePicker
                            locale={locale}
                            showTime
                            format="YYYY/MM/DD HH:mm:ss"
                            placeholder="请输入创建日期"
                        />
                    </Form.Item>
                    <Form.Item
                        label="更新日期"
                        name="modified"
                        rules={[
                            {
                                required: true,
                                message: '请输入更新日期',
                            },
                        ]}
                    >
                        <DatePicker
                            locale={locale}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请输入更新日期"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default GlyphInfo;