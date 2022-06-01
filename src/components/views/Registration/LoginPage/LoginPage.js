import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function LoginPage(props) {
    
    //const dispatch = useDispatch();

    //dispatch(loginUser(b))

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    //const onEmailHandler = (event) => { 
    //    setEmail(event.currentTarget.value) 
    //}
    //const onPasswordHandler = (event) => { 
    //    setPassword(event.currentTarget.value) 
    //}
    const onSubmitHandler = (event) => {


        console.log('Received values of form: ', event);

        let body = {
            email: event.username,
            password: event.password
        }

        axios
            .post('/api/users/login', body)
            .then((Response)=>{
                console.log(Response["data"]);
                props.history.push('/')
            })
            .catch();

    }

    const onFinish = (values) => { console.log('Received values of form: ', values); };

    return (

        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true, }}
            onFinish={onSubmitHandler}
        >
            <Form.Item name="username"
                rules={[{
                    required: true,
                    message: 'Please input your Username!',
                },]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{
                    required: true,
                    message: 'Please input your Password!',
                },]}
            >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
            />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="">Forgot password</a>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">로그인</Button>
                Or <a href="http://192.168.1.106:3000/register">register now!</a>
            </Form.Item>
        </Form>
    )
}

export default withRouter(LoginPage)
