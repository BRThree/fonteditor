import React, { useEffect } from 'react';
import { Layout } from 'antd';
import ScrollBar from 'react-custom-scrollbars';
import styles from './index.module.scss';
import GlyphList from '@/components/GlyphList';
import ProjectViewer from '@/components/ProjectViewer';
import CommandMenu from '@/components/CommandMenu';
import { useProgramStore } from '@/store/programStore';
const { Content, Sider } = Layout;

const Home = () => {
  const { bindProgramEvent, cleanProgramEvent } = useProgramStore();

  useEffect(() => {
    const cleanList = bindProgramEvent();
    return () => {
      cleanProgramEvent(cleanList);
    };
  }, []);

  return (
    <Layout className={styles['main-layout']}>
      <Sider className={styles['sider']} width={200}>
        <ProjectViewer />
      </Sider>
      <Content className={styles['main']}>
        <ScrollBar autoHide className={styles['scroll-bar']}>
          <CommandMenu />
          <GlyphList />
        </ScrollBar>
      </Content>
    </Layout>
  );
};

export default Home;
