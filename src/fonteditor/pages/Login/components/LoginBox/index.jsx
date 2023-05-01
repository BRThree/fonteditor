import React, {useRef} from 'react';
import styles from './index.module.scss'
import {Checkbox, Form, Input} from "antd";
import {validate} from "../../../../utils";
import {login} from "@/request/LoginService";
import {useNavigate} from "react-router-dom";

const LoginBox = () => {
    const navigate = useNavigate();
    const formRef = useRef(null);

    const handleSubmit = async () => {
        const val = await validate(formRef.current);
        const res = await login(val);
        if(res) {
            const {token, userInfo} = res.data;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            localStorage.setItem('token', token);
            navigate('/');
        }
    }

    return (
        <div className={styles['login']}>
            <h1 className={styles['title']}>登录</h1>
            <Form
                ref={r => formRef.current = r}
                labelCol={{span: 4}}
                initialValues={{remember: true}}
                autoComplete="off"
            >
                <Form.Item
                    label="账号"
                    name="userName"
                    rules={[{required: true, message: '请输入账号!'}]}
                >
                    <Input placeholder="账号"/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{required: true, message: '请输入密码!'}]}
                >
                    <Input.Password placeholder="密码"/>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 4, span: 20}}>
                    <Checkbox>记住我</Checkbox>
                </Form.Item>
            </Form>
            <button onClick={handleSubmit}>登录</button>
        </div>
    );
}

export default LoginBox;
