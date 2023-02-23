import React, { useEffect, useMemo, useState } from 'react';
import editorCommandMenuConfig from '@/menu/editor';
import Toolbar from '@/widget/Toolbar';
import GLYFEditor from '@/widget/GLYFEditor';
import SplitPane, { Pane } from 'react-split-pane';
import styles from './index.module.scss';
import GlyphList from '@/components/GlyphList';
import { useSearchParams } from 'react-router-dom';
import { useTtfStore } from '@/store/ttfStore';
import lang from 'common/lang';
import i18n from '@/i18n/i18n';
import compound2simple from 'fonteditor-core/ttf/util/compound2simple';
import transformGlyfContours from 'fonteditor-core/ttf/util/transformGlyfContours';
import ProjectViewer from '@/components/ProjectViewer';

function Editor() {
  const [editorController, setEditorController] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  
  const [params] = useSearchParams();
  const index = useMemo(() => +Number(params.get('index')), [params]);
  const { ttf } = useTtfStore();

  // 初始化字体
  const initCurGlyph = () => {
    let font = ttf.glyf[index];
    if (font) {
        let clonedFont = lang.clone(font);
        if (clonedFont.compound) {
            if (!confirm(i18n.lang.msg_transform_compound_glyf)) {
                return;
            }
            // 转换复合字形为简单字形，原始字形不变
            clonedFont = compound2simple(clonedFont, transformGlyfContours(font, ttf));
        }
        editorController.setFont(clonedFont);
    }
  };

  const init = () => {
    const editorMenuDom = $('#editor-menu');
    const editorDom = $('#editor');

    // 字体查看器命令组
    let editorCommandMenu = new Toolbar(editorMenuDom, {
      commands: editorCommandMenuConfig,
    });

    // 字体查看器
    let editor = new GLYFEditor(editorDom, {
      commandMenu: editorCommandMenu,
    });

    editor.show();

    setEditorController(editor);

    return {
      editorMenuDom,
      editorDom,
      editor,
    };
  };

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    editorController.editor.render.resizeCapture.fire('resize');
  };

  useEffect(() => {
    let { editorMenuDom, editorDom } = init();

    return () => {
      editorMenuDom.empty();
      editorDom.empty();
    };
  }, []);

  useEffect(() => {
    ttf && editorController && initCurGlyph();
  }, [ttf, editorController, index]);

  return (
    <div className={styles['editor-container']} id="editor-container">
      <div className={styles['editor-menu']} id="editor-menu"></div>
      <div className={styles['editor-main']}>
        {/* {isResizing && <div className={styles['resize-mark']} />} */}
        <SplitPane
          onDragStarted={handleResizeStart}
          onDragFinished={handleResizeEnd}
          split="vertical"
          allowResize
          defaultSize="70%"
        >
          <Pane minSize="50%" maxSize="80%" className={styles['pane']}>
            <div
              onContextMenu={(evt) => evt.preventDefault()}
              className={
                isResizing
                  ? styles['editor'] + ' ' + styles['resizing']
                  : styles['editor']
              }
              id="editor"
            ></div>
          </Pane>
          <Pane className={styles['pane']}>
            <GlyphList />
          </Pane>
        </SplitPane>
      </div>
      <ProjectViewer hidden />
    </div>
  );
}

export default Editor;
