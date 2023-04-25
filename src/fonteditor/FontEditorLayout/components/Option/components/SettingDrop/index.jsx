import React from 'react';
import styles from '../../index.module.scss';
import {Dropdown, Space, Button} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import GlyphInfo from "./components/GlyphInfo";
import SetMetrics from "./components/SetMetrics";
import SettingEditor from "./components/SettingEditor";
import ImpAndExp from "./components/ImpAndExp";

const settingItems = [
    {label: <GlyphInfo />, key: 'setting-name'},
    {label: <SetMetrics />, key: 'setting-metrics'},
    {label: <SettingEditor />, key: 'setting-editor'},
    {label: <ImpAndExp />, key: 'setting-import-and-export'},
];

function SettingDrop() {
    return (
        <Dropdown
            menu={{
                items: settingItems,
            }}
            trigger="click"
        >
            <Button className={styles['m-btn']} type="text">
                <Space className={styles['m-btn-text']}>
                    设置
                    <DownOutlined/>
                </Space>
            </Button>
        </Dropdown>
    );
}

export default SettingDrop;
