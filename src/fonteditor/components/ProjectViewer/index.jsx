import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { Button, Menu, Modal, Form, Input } from 'antd';
import { useProgramStore } from '@/store/programStore';
import ProjectItems from './components/ProjectItems';
import OpenFile from './components/OpenFile';
import { FileAddOutlined } from '@ant-design/icons';
import { validate, resetForm } from '@/utils';
import actions from '@/controller/actionsNew';

function ProjectViewer({ hidden = false }) {
  const [asideMenus, setAsideMenus] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const formRef = useRef();

  const { program, setProjectId, getProjectId, openProject } =
    useProgramStore();

  const getMenuList = () =>
    program && program.project ? program.project.items() : [];

  const menuInit = (list, curKey) => {
    const menuList = list || getMenuList();

    const key = menuList.length ? menuList[0].id : '';

    setSelectedKeys([curKey || key]);

    setAsideMenus(
      menuList.map((item) => {
        return {
          key: item.id,
          label: (
            <ProjectItems
              onDeleteProjectItems={handleDeleteProject}
              item={item}
            />
          ),
        };
      })
    );
  };

  const init = async () => {
    const curProject = getProjectId();
    menuInit(undefined, curProject);
    await program.project.ready();
    openProject(curProject);
    setProjectId(curProject);
  };

  const handleSelectMenuItem = async ({ key }) => {
    const imported = await openProject(key);
    if (imported) {
      setProjectId(key);
      setSelectedKeys([key]);
    }
  };

  const handleDeleteProject = async (item) => {
    const res = await program.project.remove(item.key);
    if (item.key === getProjectId()) {
      setProjectId(null);
    }
    menuInit(res);
  };

  const handleNewProject = () => {
    setIsProjectFormOpen(true);
  };

  const handleCloseProject = () => {
    setIsProjectFormOpen(false);
    resetForm(formRef?.current);
  };

  const onOk = async () => {
    try {
      const res = await validate(formRef?.current);
      actions['new'](program, undefined, () => res.name);
      menuInit();
      handleCloseProject();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    init();
    return () => {};
  }, []);

  return !hidden ? (
    <div className={styles['project-viewer']}>
      <div className={styles['btn-box']}>
        <Button
          onClick={handleNewProject}
          type="primary"
          icon={<FileAddOutlined />}
        >
          新建
        </Button>
        <OpenFile>打开</OpenFile>
      </div>
      <Menu
        selectedKeys={selectedKeys}
        onSelect={handleSelectMenuItem}
        mode="inline"
        items={asideMenus}
        className={styles['main-menu']}
      />
      <Modal
        onOk={onOk}
        onCancel={handleCloseProject}
        title={'新建项目'}
        open={isProjectFormOpen}
        okText={'确定'}
        cancelText={'取消'}
      >
        <Form ref={formRef} initialValues={{ name: '' }} autoComplete="off">
          <Form.Item
            label="项目名称"
            name="name"
            rules={[{ required: true, message: '请输入项目名称!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  ) : (
    <></>
  );
}

export default ProjectViewer;
