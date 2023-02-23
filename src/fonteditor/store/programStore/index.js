import { useState } from 'react';
import { createStore } from 'hox';
import controller from '@/controller/defaultNew';
import programInit from '@/widget/programNew';
import TTFManager from '@/widget/TTFManager';
import projectWidget from '@/widget/project';
import { useTtfStore } from '@/store/ttfStore';
import i18n from '@/i18n/i18n';

const init = () => {
  if (!programInit.ttfManager) {
    programInit.ttfManager = new TTFManager();
  }

  if (!programInit.project) {
    programInit.project = projectWidget;
  }

  programInit.data.projectId =
    window.localStorage.getItem('project-cur') || programInit.project.items()[0].id;

  controller.init(programInit);
};

init();

export const [useProgramStore, ProgramStoreProvider] = createStore(() => {
  const {setTtf} = useTtfStore();
  const [program, setProgram] = useState(programInit);

  const getProjectId = () => program.data.projectId || program.project.items[0].id;

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
      setTtf(program.ttfManager.get());
      return imported;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    program,
    setProjectId,
    getProjectId,
    openProject,
  };
});