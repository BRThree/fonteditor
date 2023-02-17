import React from 'react';
import routes from '../routers';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import styles from './index.module.scss';

import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

const headerMenus = [];

const router = createHashRouter(routes);

function FontEditorLayout() {
  return (
    <Layout className={styles['layout']}>
      <Header>
        <Menu theme="dark" mode="horizontal" items={headerMenus} />
      </Header>
      <Content className={styles['content']}>
        <RouterProvider router={router} />
      </Content>
      <Footer className={styles['footer']}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default FontEditorLayout;
