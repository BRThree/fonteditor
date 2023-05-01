import React from 'react';
import styles from './index.module.scss';
import {useNavigate} from "react-router-dom";

function Logo() {
  const navigation = useNavigate();
  // 返回主页
  const handleBackHome = () => {
    navigation('/')
  };
  return <span onClick={handleBackHome} className={styles['logo']}>Font Editor</span>;
}

export default Logo;
