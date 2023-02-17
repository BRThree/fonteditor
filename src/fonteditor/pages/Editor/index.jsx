import React, { useEffect, useRef, useState } from 'react';
import editorCommandMenuConfig from '@/menu/editor';
import Toolbar from '@/widget/Toolbar';
import GLYFEditor from '@/widget/GLYFEditor';
import SplitPane, { Pane } from 'react-split-pane';
import styles from './index.module.scss';
import GlyphList from '@/components/GlyphList';

function Editor() {
  const [editorController, setEditorController] = useState(null);
  const [isResizing, setIsResizing] = useState(false);

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
    </div>
  );
}

export default Editor;
