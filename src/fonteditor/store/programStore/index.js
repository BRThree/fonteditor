import { useState } from 'react';
import { createGlobalStore } from 'hox';
import { useTtfStore } from '../ttfStore';
import { useGlyphListStore, getGlyphListStore } from '../glyphListStore';
import controller from '@/controller/defaultNew';
import programInit from '@/widget/programNew';
import TTFManager from '@/widget/TTFManager';
import projectWidget from '@/widget/project';
import previewerWidget from '@/widget/previewer';
import loaderWidget from '@/widget/loader';
import exporterWidget from '@/widget/exporter';
import i18n from '@/i18n/i18n';
import actions from '@/controller/actionsNew';

const init = () => {
  if (!programInit.ttfManager) {
    programInit.ttfManager = new TTFManager();
  }

  if (!programInit.project) {
    programInit.project = projectWidget;
  }

  programInit.data.projectId =
    window.localStorage.getItem('project-cur') || programInit.project.items()[0].id;

  programInit.previewer = previewerWidget;

  // 导入导出器
  programInit.loader = loaderWidget;
  programInit.exporter = exporterWidget;

  controller.init(programInit);
  programInit.init();
};

init();

export const [useProgramStore, getProgramStore] = createGlobalStore(() => {
  const { setTtf } = useTtfStore();
  const { setGlyphList } = useGlyphListStore();
  const [program, setProgram] = useState(programInit);

  const getProjectId = () => {
    return program.data.projectId || program.project.items()[0].id;
  };

  const setProjectId = (projectId) => {
    setProgram({
      ...program,
      data: {
        ...program.data,
        projectId
      }
    });
  };

  const openProject = async (projectId) => {
    try {
      const imported = await program.project.get(projectId);
      if (imported) {
        if (
          program.ttfManager.isChanged() &&
          !window.confirm(i18n.lang.msg_confirm_save_proj)
        ) {
          return;
        }
        program.ttfManager.set(imported);
        window.localStorage.setItem('project-cur', projectId);
      }
      setTtf({ ...program.ttfManager.get() });
      return imported;
    } catch (err) {
      console.log(err);
    }
  };

  const saveProgram = async () => {
    actions.save(program);
    setGlyphList([...program.ttfManager.getGlyf()]);
  };

  const bindProgramEvent = (editor) => {
    // 保存正在编辑的glyf
    const saveEditingGlyf = function (editingIndex) {
      if (!editor) {
        return;
      };
      const glyph = editor.getFont();
      // 如果是正在编辑的
      if (editingIndex !== -1) {

        program.ttfManager.replaceGlyf(glyph, editingIndex);
      }
      // 否则新建font
      else {
        program.ttfManager.insertGlyf(glyph);
      }

      editor.setChanged(false);
    };

    const save = function (e) {
      debugger;
      if (!program.ttfManager.get()) return;
      const { editingIndex } = getGlyphListStore();
      saveEditingGlyf(editingIndex);
      saveProgram();
    };

    const paste = function (e) {
      if (!editor) {
        return;
      };
      let clip = clipboard.get('glyf');
      if (clip && clip.glyf.length) {
        if (!editor.isEditing()) {
          // 触发粘贴
          // program.viewer.fire('paste');
        }
        else {
          editor.execCommand('addcontours', clip.glyf[0].contours, {
            selected: true
          });
        }
      }
    };

    const func = function (e) {
      // F3, F4
      if (e.keyCode === 114 || e.keyCode === 115) {
        let ttf = program.ttfManager.get();
        if (ttf) {
          program.previewer.load(ttf, e.keyCode === 114 ? 'ttf' : 'woff');
        }
      }
    };

    const fontErr = function (e) {
      notifyError(e);
    };

    program
      .on('save', save)
      .on('paste', paste)
      .on('function', func)
      .on('font-error', fontErr);

    return { save, paste, func, fontErr };
  };

  const cleanProgramEvent = (cleanList) => {
    for (const key in cleanList) {
      program.un(key, cleanList[key]);
    }
  };

  return {
    program,
    setProjectId,
    getProjectId,
    openProject,
    bindProgramEvent,
    saveProgram,
    cleanProgramEvent,
  };
});