import React from 'react';
import styles from '../../index.module.scss';
import {Dropdown, Space, Button} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {useProgramStore} from "@/store/programStore";
import {useGlyphListStore} from "@/store/glyphListStore";
import resolvettf from "../../../../../widget/util/resolvettf";
import core from 'fonteditor-core/main';
import previewRender from "../../../../../template/preview-render";

const font = core.Font;
const ttf2icon = core.ttf2icon;

function PreviewDrop() {
  const {program} = useProgramStore();
  const {selected, setGlyphList} = useGlyphListStore();

  const previewItems = [
    { label: 'ttf字体', key: 'ttf' },
    { label: 'woff2字体', key: 'woff2' },
    { label: 'woff字体', key: 'woff' },
  ];

  const generatePreviewHTML = (ttf, fontFormat) => {
    let options = {
      type: fontFormat || 'ttf'
    };

    ttf = resolvettf(ttf, {}, program);
    let fontData = null;
    try {
      fontData = font.create(ttf).toBase64(options);
    }
    catch (e) {
      program.fire('font-error', e);
      throw e;
    }

    let data = Object.assign(
      {
        fontData: fontData,
        fontFormat: options.type
      },
      ttf2icon(ttf)
    );

    return previewRender.renderPreview(data);
  }

  // 选项点击策略模式
  const itemActions = (key) => {
    const ttf = program.ttfManager.get()
    try {
      let html = generatePreviewHTML(ttf, key);
      let win = window.open('./empty.html');
      win.onload = function () {
        win.document.body.innerHTML = html;
        win.focus();
        win = null;
        html = null;
      };
    }
    catch (exp) {
      alert(exp.message);
      throw exp;
    }
  };

  // 选项点击
  const itemClick = (item) => {
    if (!program.ttfManager.get()) return;

    itemActions(item.key);

    setGlyphList([...program.ttfManager.getGlyf()]);
  }

  return (
    <Dropdown
      menu={{
        items: previewItems,
        onClick: itemClick
      }}
      trigger="click"
    >
      <Button className={styles['m-btn']} type="text">
        <Space className={styles['m-btn-text']}>
          预览
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}

export default PreviewDrop;
