import React from 'react';
import { Layout } from 'antd';
import ScrollBar from 'react-custom-scrollbars';
import styles from './index.module.scss';
import GlyphList from '@/components/GlyphList';
import ProjectViewer from '@/components/ProjectViewer';

const { Content, Sider } = Layout;

const Home = () => {
  return (
    <Layout className={styles['main-layout']}>
      <Sider className={styles['sider']} width={200}>
        <ProjectViewer/>
      </Sider>
      <Content className={styles['main']}>
        <ScrollBar autoHide className={styles['scroll-bar']}>
          <GlyphList />
        </ScrollBar>
      </Content>
    </Layout>
  );
};

export default Home;
