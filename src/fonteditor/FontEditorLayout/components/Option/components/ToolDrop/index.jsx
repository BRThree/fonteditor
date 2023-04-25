import React from 'react';
import styles from '../../index.module.scss';
import {Dropdown, Space, Button} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {useProgramStore} from "@/store/programStore";
import {useGlyphListStore} from "@/store/glyphListStore";
import i18n from "@/i18n/i18n";

function ToolDrop() {
    const {program} = useProgramStore();
    const {selected, setGlyphList} = useGlyphListStore();

    const toolItems = [
        {label: '生成字形名称', key: 'setting-glyf-name'},
        {label: '清除字形名称', key: 'setting-glyf-clearname'},
        {label: '优化字体', key: 'setting-optimize'},
        {label: '按代码点进行排序', key: 'setting-sort'},
        {label: '复合字形转简单字形', key: 'setting-compound2simple'},
    ];

    // 选项点击策略模式
    const itemActions = {
        'setting-glyf-name': () => {
            if (window.confirm(i18n.lang.msg_confirm_gen_names)) {
                program.ttfManager.genGlyfName(selected);
            }
        },
        'setting-glyf-clearname': () => {
            program.ttfManager.clearGlyfName(selected);
        },
        'setting-optimize': () => {
            let result = program.ttfManager.optimize();
            if (true !== result) {
                if (result.repeat) {
                    program.fire('font-error', {
                        number: 10200,
                        data: result.repeat
                    });
                }
                alert(result.message);
            }
        },
        'setting-sort': () => {
            let result = program.ttfManager.sortGlyf();
            if (true !== result) {
                alert(result.message);
            }
        },
        'setting-compound2simple': () => {
            program.ttfManager.compound2simple(selected);
        },
    };

    // 选项点击
    const itemClick = (item) => {
        if (!program.ttfManager.get()) return;

        itemActions[item.key]();

        setGlyphList([...program.ttfManager.getGlyf()]);
    }

    return (
        <Dropdown
            menu={{
                items: toolItems,
                onClick: itemClick
            }}
            trigger="click"
        >
            <Button className={styles['m-btn']} type="text">
                <Space className={styles['m-btn-text']}>
                    工具
                    <DownOutlined/>
                </Space>
            </Button>
        </Dropdown>
    );
}

export default ToolDrop;
