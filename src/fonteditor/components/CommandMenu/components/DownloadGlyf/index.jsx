import React, { useRef, useState, useEffect } from 'react';
import styles from './index.module.scss';
import { useGlyphListStore } from '@/store/glyphListStore';
import { useTtfStore } from '@/store/ttfStore';
import { Button, Form, InputNumber } from 'antd';
import glyf2svgfile from '@/widget/util/glyf2svgfile';
import pixelRatio from 'common/getPixelRatio';
import ColorPicker from '../ColorPicker';
import ScrollBar from 'react-custom-scrollbars';
import svg2base64 from 'fonteditor-core/ttf/svg2base64';
import download from '@/widget/util/download';

function DownloadGlyf() {
  // 获取选中的字体
  const { selGlyphs } = useGlyphListStore();
  const [glyph] = selGlyphs;

  const { ttf } = useTtfStore();
  const preView = useRef(null);
  const [fillColor, setFillColor] = useState('#666666');
  const [size, setSize] = useState(256);

  function getSvg() {
    let opt = {
      fillColor,
      size,
      unitsPerEm: ttf.head.unitsPerEm,
    };
    return glyf2svgfile(glyph, opt);
  }

  function previewGlyf() {
    // 由于生成的svg文档带xml头部，这里简单的去掉
    let svgText = getSvg();
    let canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    canvas.className = styles['glyph'];

    let img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(svgText);
    img.width = img.height = size;
    img.onload = function (e) {
      canvas
        .getContext('2d')
        .drawImage(
          img,
          0,
          0,
          size,
          size,
          0,
          0,
          pixelRatio * size,
          pixelRatio * size
        );
    };

    while (preView.current.children.length > 0) {
      preView.current.removeChild(preView.current.children[0]);
    }
    preView.current.append(canvas);
  }

  const downloadSvg = () => {
    let svgText = getSvg();
    download((glyph.name || 'svg') + '.svg', svg2base64(svgText));
  };

  const downloadPng = () => {
    let canvas = preView.current.children[0];
    let imgData = canvas.toDataURL();
    download((glyph.name || 'png') + '.png', imgData);
  };

  useEffect(() => {
    previewGlyf();
  }, [fillColor, size]);

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <Form layout="inline">
          <Form.Item label="图标名称">{glyph.name}</Form.Item>
          <Form.Item label="颜色">
            <ColorPicker
              color={fillColor}
              onChange={(val) => setFillColor(val)}
            />
          </Form.Item>
          <Form.Item label="大小">
            <InputNumber value={size} onChange={(val) => setSize(val)} />
            {` px`}
          </Form.Item>
        </Form>
      </div>
      <ScrollBar className={styles['main']}>
        <div ref={preView}></div>
      </ScrollBar>
      <div className={styles['footer']}>
        <Button onClick={downloadSvg}>下载SVG</Button>
        <Button onClick={downloadPng}>下载PNG</Button>
      </div>
    </div>
  );
}

export default DownloadGlyf;
