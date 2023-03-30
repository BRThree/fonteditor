import React, { useRef, useEffect, useState, useMemo } from 'react';
import styles from './index.module.scss';
import { useProgramStore } from '@/store/programStore';
import { useTtfStore } from '@/store/ttfStore';
import { useGlyphListStore } from '@/store/glyphListStore';
import glyfAdjust from 'fonteditor-core/ttf/util/glyfAdjust';
import { message, Modal, Button, Form, Slider, Select, Checkbox } from 'antd';
import useDebounce from '@/hooks/useDebounce';

import pixelRatio from 'common/getPixelRatio';
import string from 'common/string';
import lang from 'common/lang';
import drawPath from 'render/util/drawPath';
import ImageProcessor from 'graphics/image/ImageProcessor';
import ContourPointsProcessor from 'graphics/image/ContourPointsProcessor';
import getHistogram from 'graphics/image/util/getHistogram';
import getThreshold from 'graphics/image/util/getThreshold';
import pathsUtil from 'graphics/pathsUtil';

import { notNul } from '@/utils/index.js';

function ImportFiles() {
  const filePicker = useRef(null);
  const origin = useRef(null);
  processImage;
  const fit = useRef(null);

  const { program } = useProgramStore();
  const { setGlyphList, selected } = useGlyphListStore();
  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [threshold, setThreshold] = useState(0);
  const [thresholdPre, setThresholdPre] = useState('ostu');
  const [reverse, setReverse] = useState(false);
  const [gaussBlur, setGaussBlur] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [smooth, setSmooth] = useState(true);

  const debSetThreshold = useDebounce((val) => {
    if (!isReady()) return;
    program.data.imageProcessor.restore();
    binarizeImage(val);
    refreshCanvasOrigin();
  }, 100);

  const isReady = () => {
    return (
      notNul(program.data.imageProcessor) &&
      notNul(program.data.pointsProcessor) &&
      notNul(program.data.imageProcessor.grayData) &&
      notNul(program.data.imageProcessor.get())
    );
  };

  // 处理图片
  function processImage() {
    let processor = program.data.imageProcessor;
    processor.set(processor.grayData.clone().get());

    if (reverse) {
      processor.reverse();
    }

    if (+gaussBlur >= 2) {
      processor.gaussBlur(+gaussBlur);
    }

    if (+contrast) {
      processor.brightness(0, +contrast);
    }

    // 保存一份处理后的
    processor.save();
  }

  // 二值化处理
  function binarizeImage(t) {
    const val = t !== undefined ? t : +threshold;
    program.data.imageProcessor.binarize(val);
  }

  // 刷新处理后的字体
  function refreshCanvasFit() {
    let result = program.data.imageProcessor.get();
    let width = result.width;
    let height = result.height;
    const ctx = fit.current.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    fit.current.width = pixelRatio * width;
    fit.current.height = pixelRatio * height;
    if (pixelRatio !== 1) {
      fit.current.style.width = width / pixelRatio + 'px';
      fit.current.style.height = height / pixelRatio + 'px';
    }

    // 绘制拟合曲线
    ctx.fillStyle = 'green';
    ctx.beginPath();
    let contours = (program.data.imageProcessor.resultContours =
      program.data.pointsProcessor.getContours());
    contours.forEach(function (contour) {
      drawPath(ctx, contour);
    });
    ctx.fill();
  }

  // 刷新原字体
  function refreshCanvasOrigin() {
    let binarizedImage = program.data.imageProcessor.get();

    origin.current.style.visibility = 'hidden';
    let width = binarizedImage.width;
    let height = binarizedImage.height;

    if (!binarizedImage.binarize) {
      binarizeImage();
      binarizedImage = program.data.imageProcessor.get();
    }

    const ctx = origin.current.getContext('2d');
    let imgData = ctx.getImageData(0, 0, width, height);
    let putData = imgData.data;
    let binarizedImageData = binarizedImage.data;

    for (let y = 0, line; y < height; y++) {
      line = width * y;
      for (let x = 0; x < width; x++) {
        let offset = line + x;
        if (binarizedImageData[offset] === 0) {
          putData[offset * 4] = 208;
          putData[offset * 4 + 1] = 247;
          putData[offset * 4 + 2] = 113;
          putData[offset * 4 + 3] = 255;
        } else {
          putData[offset * 4] = 255;
          putData[offset * 4 + 1] = 255;
          putData[offset * 4 + 2] = 255;
          putData[offset * 4 + 3] = 255;
        }
      }
    }

    program.data.pointsProcessor.import(binarizedImage);
    program.data.pointsProcessor.get().forEach(function (points) {
      points.forEach(function (p) {
        let offset = p.y * width + p.x;
        putData[offset * 4] = 255;
        putData[offset * 4 + 1] = 0;
        putData[offset * 4 + 2] = 0;
        putData[offset * 4 + 3] = 255;
      });
    });

    ctx.putImageData(imgData, 0, 0);

    origin.current.style.visibility = 'visible';
    program.loading.hide();

    setTimeout(function () {
      refreshCanvasFit();
    }, 20);
  }

  /**
   * 保存当前的灰度图像
   * @param {Object} image 图片对象
   */
  function updateImage(image) {
    origin.current.style.visibility = 'hidden';
    let width = image.width;
    let height = image.height;

    origin.current.width = width;
    origin.current.height = height;

    if (pixelRatio !== 1) {
      origin.current.style.width = width / pixelRatio + 'px';
      origin.current.style.height = height / pixelRatio + 'px';
    }

    const ctx = origin.current.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);

    // 设置&备份图片数据
    let imgData = ctx.getImageData(0, 0, width, height);
    let processor = program.data.imageProcessor;
    processor.set(imgData);
    processor.grayData = processor.clone();
    processor.resultContours = null;

    // 使用ostu来设置灰度阈值
    let histoGram = getHistogram(processor.get());
    setThreshold(getThreshold(histoGram, 'ostu'));
    setThresholdPre('ostu');

    processImage();
    binarizeImage();
    refreshCanvasOrigin();
  }

  // 图片选择
  const fileChange = (evt) => {
    let file = evt.target.files[0];
    if (!file) {
      return;
    }

    // 判断是否为可选择类型
    if (!/\.(?:jpg|gif|png|jpeg|bmp|svg)$/i.test(file.name)) {
      messageApi.open({
        type: 'error',
        content: '不支持的文件类型！',
      });
      return;
    }

    let reader = new FileReader();

    reader.onload = function (loadEvent) {
      let image = new Image();
      image.onload = function () {
        updateImage(image);
      };
      image.onerror = function () {
        program.loading.warn(i18n.lang.msg_read_pic_error, 2000);
      };
      image.src = loadEvent.target.result;
      loadEvent.target.value = '';
    };

    reader.onerror = function () {
      program.loading.warn(i18n.lang.msg_read_pic_error, 2000);
    };

    reader.readAsDataURL(file);
  };

  // 打开文件选择器
  const openFilePicker = () => {
    filePicker.current.click();
  };

  // 提交表单
  const handleSubmit = () => {
    let res = program.data.imageProcessor.resultContours;
    let contours;
    if (res) {
      if (!res || !res.length) {
        // 图片未导入或导入失败
        alert(i18n.lang.msg_no_glyph_to_import);
        setIsModalOpen(false);
        return;
      } else {
        contours = pathsUtil.flip(res);
      }
    }

    // 图片导入成功，插入字体
    program.ttfManager.insertGlyf(
      glyfAdjust(
        {
          contours,
        },
        1,
        1,
        0,
        0,
        false
      ),
      selected[0]
    );
    setGlyphList([...program.ttfManager.getGlyf()]);
    setIsModalOpen(false);
  };

  // 关闭对话框
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 打开对话框
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 预处理模块改变
  const preProcessChange = useDebounce(() => {
    if (!isReady()) return;
    processImage();
    binarizeImage();
    refreshCanvasOrigin();
  }, 100);
  useEffect(() => {
    preProcessChange();
    console.log(reverse, gaussBlur, contrast);
  }, [reverse, gaussBlur, contrast]);

  // 灰度值类型改变
  const thresholdPreChange = (val) => {
    if (!isReady()) return;
    let histoGram = getHistogram(program.data.imageProcessor.getOrigin());
    setThreshold(getThreshold(histoGram, val));
    setThresholdPre(val);
    program.data.imageProcessor.restore();
    binarizeImage();
    refreshCanvasOrigin();
  };

  // 平滑改变
  const smoothChange = (val) => {
    if (!isReady()) return;
    setSmooth(val);
    program.data.pointsProcessor.segment = smooth;
    refreshCanvasOrigin();
  };

  // 按钮方法
  const btnAction = (action) => {
    if (!isReady()) return;
    program.data.imageProcessor[action]();
    refreshCanvasOrigin();
  };

  // 重置预处理
  const restore = () => {
    if (!isReady()) return;
    setReverse(false);
    setGaussBlur(0);
    setContrast(0);
    processImage();
    binarizeImage();
    refreshCanvasOrigin();
  };

  // 重置轮廓
  const restoreBinarize = () => {
    if (!isReady()) return;
    processImage();
    binarizeImage();
    refreshCanvasOrigin();
  };

  // 初始化
  useEffect(() => {
    program.data.imageProcessor = new ImageProcessor();
    program.data.pointsProcessor = new ContourPointsProcessor();
    return () => {
      program.data.imageProcessor = null;
      program.data.pointsProcessor = null;
    };
  }, []);

  return (
    <>
      <div onClick={openModal} className={styles['container']}>
        {contextHolder}
        导入图片
        <input
          onChange={fileChange}
          ref={filePicker}
          className={styles['file-picker']}
          type="file"
        />
      </div>
      <Modal
        title="导入字形图片"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确定"
        width={960}
      >
        <div className={styles['form-container']}>
          {/* 头部 */}
          <div className={styles['form-header']}>
            <span>
              <Button type="primary" onClick={openFilePicker}>
                选择图片
              </Button>
              请选择字形图片，支持jpg、gif、png、bmp、svg。
            </span>
            <span>
              <Button type="primary">从URL导入图片</Button>
              <Button type="primary">适应窗口</Button>
              <Button type="primary">查看原图</Button>
              <Button type="primary">查看轮廓</Button>
            </span>
          </div>
          {/* 主要内容 */}
          <div className={styles['form-main']}>
            <div className={styles['origin']}>
              <canvas ref={(r) => (origin.current = r)} />
            </div>
            <div className={styles['fit']}>
              <canvas ref={(r) => (fit.current = r)} />
            </div>
          </div>
          {/* 脚部 */}
          <div className={styles['form-footer']}>
            <div className={styles['part']}>
              <span className={styles['title']}>预处理模块</span>
              <Form layout="inline">
                <Form.Item label="反转">
                  <Checkbox
                    onChange={(evt) => setReverse(evt.target.checked)}
                    checked={reverse}
                  />
                </Form.Item>
                <Form.Item label="高斯模糊">
                  <Slider
                    value={gaussBlur}
                    onChange={(val) => setGaussBlur(val)}
                    className={styles['slider']}
                    min={0}
                    max={20}
                  />
                </Form.Item>
                <Form.Item label="对比度">
                  <Slider
                    value={contrast}
                    onChange={(val) => setContrast(val)}
                    className={styles['slider']}
                    min={-50}
                    max={50}
                  />
                </Form.Item>
                <Form.Item>
                  <Button onClick={restore}>重置</Button>
                </Form.Item>
              </Form>
            </div>
            <div className={styles['part']}>
              <span className={styles['title']}>轮廓模块</span>
              <Form layout="inline">
                <Form.Item label="二值化阈值">
                  <div className={styles['inline']}>
                    <Slider
                      value={threshold}
                      onChange={(val) => {
                        setThreshold(val);
                        debSetThreshold(val);
                      }}
                      className={styles['slider']}
                      min={0}
                      max={255}
                    />
                    <Select
                      value={thresholdPre}
                      onChange={thresholdPreChange}
                      style={{ width: 120 }}
                      options={[
                        { value: 'ostu', label: '大津法' },
                        { value: 'mean', label: '均值' },
                        { value: 'minimum', label: '谷底最小值' },
                        { value: 'intermodes', label: '双峰平均' },
                        { value: 'isoData', label: 'ISODATA法' },
                      ]}
                    />
                  </div>
                </Form.Item>
                <Form.Item label="平滑">
                  <Checkbox
                    onChange={(evt) => smoothChange(evt.target.checked)}
                    checked={smooth}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={() => btnAction('open')}
                    className={styles['mr8']}
                    type="primary"
                  >
                    消除杂点
                  </Button>
                  <Button
                    onClick={() => btnAction('close')}
                    className={styles['mr8']}
                    type="primary"
                  >
                    消除孔洞
                  </Button>
                  <Button
                    onClick={() => btnAction('dilate')}
                    className={styles['mr8']}
                    type="primary"
                  >
                    膨胀
                  </Button>
                  <Button
                    onClick={() => btnAction('erode')}
                    className={styles['mr8']}
                    type="primary"
                  >
                    腐蚀
                  </Button>
                  <Button onClick={restoreBinarize}>重置</Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ImportFiles;
