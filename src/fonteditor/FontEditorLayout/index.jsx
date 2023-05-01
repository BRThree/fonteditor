import React from 'react';
import {Outlet} from 'react-router-dom';
import styles from './index.module.scss';
import Logo from './components/Logo';
import Option from './components/Option';
import {Layout} from 'antd';
import AvatarComp from "./components/AvatarComp";

const {Header, Content, Footer} = Layout;

function FontEditorLayout() {
    return (
        <Layout className={styles['layout']}>
            <Header className={styles['header']}>
                <Logo/>
                <Option/>
                <AvatarComp/>
            </Header>
            <Content className={styles['content']}>
                <Outlet/>
            </Content>
            <Footer className={styles['footer']}>
                FontEditor ©2023 Created by BRThree
            </Footer>
        </Layout>
    );
}

export default FontEditorLayout;
