import React, {useState} from 'react';
import styles from './index.module.scss'
import LoginBox from "./components/LoginBox";
import RegisterBox from "./components/RegisterBox";

const Login = () => {
    const [isRightActive, setIsRightActive] = useState(false)
    const switchBox = () => {
        setIsRightActive(!isRightActive)
    };
    return (
        <div className={styles['login']}>
            <div
                className={
                    `${styles['container']} ${isRightActive ? styles['right-panel-active'] : ''}`
                }
            >
                <div className={`${styles['form-container']} ${styles['sign-up-container']}`}>
                    <LoginBox />
                </div>
                <div className={`${styles['form-container']} ${styles['sign-in-container']}`}>
                    <RegisterBox />
                </div>
                <div className={styles['overlay-container']}>
                    <div className={styles['overlay']}>
                        <div className={`${styles['overlay-panel']} ${styles['overlay-left']}`}>
                            <h1>已有账号？</h1>
                            <p>请使用您的账号进行登录</p>
                            <button onClick={switchBox} className={styles['ghost']}>登录</button>
                        </div>
                        <div className={`${styles['overlay-panel']} ${styles['overlay-right']}`}>
                            <h1>没有账号?</h1>
                            <p>立即注册加入我们，和我们一起开始旅程吧</p>
                            <button onClick={switchBox} className={styles['ghost']}>注册</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
