import React, {useEffect, useState} from 'react';
import {Dropdown, Space, Button, Avatar} from 'antd';
import styles from './index.module.scss';
import {UserOutlined, DownOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

const userItems = [
    { label: '退出登录', key: 'exit' },
];


const AvatarComp = () => {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    const init = () => {
        const curUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUserInfo({...userInfo, ...curUserInfo});
    };

    const itemClick = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        navigate('/');
    }

    useEffect(() => {
        init();
    }, []);
    return (
        <div className={styles['avatar-box']}>
            <Avatar src={userInfo.avatar} shape="square" icon={<UserOutlined />} />
            <Dropdown
                menu={{
                    items: userItems,
                    onClick: itemClick
                }}
                trigger="click"
            >
                <Button className={styles['m-btn']} type="text">
                    <Space className={styles['m-btn-text']}>
                        {userInfo['nickName']}
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </div>
    )
}

export default AvatarComp;