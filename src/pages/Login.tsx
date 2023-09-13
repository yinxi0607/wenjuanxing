import {FC, useEffect} from 'react';
import {Link} from "react-router-dom";
import styles from './Login.module.scss'
import {Button, Checkbox, Form, Input, Space, Typography} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import {REGISTER_PATHNAME} from "../router";

const {Title} = Typography
const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY="PASSWORD"

function rememberUser(username:string,password:string){
    localStorage.setItem(USERNAME_KEY,username)
    localStorage.setItem(PASSWORD_KEY,password)
}

function deleteUserFromStorage(){
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFromStorage(){
    return {
        username: localStorage.getItem(USERNAME_KEY),
        password: localStorage.getItem(PASSWORD_KEY)
    }
}

const Login: FC = () => {
    // const nav = useNavigate()
    const [form] = Form.useForm()
    useEffect(()=>{
        const {username,password} = getUserInfoFromStorage()
        form.setFieldsValue({username,password})
    },[])
    const onFinish = (values: any) => {
        console.log('Success:', values);
        const {username,password,remember} = values || {}
        if (remember){
            console.log("记住")
            rememberUser(username,password)
        }else{
            console.log("忘记")
            deleteUserFromStorage()
        }
    }
    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}>
                        <UserAddOutlined/>
                    </Title>
                    <Title level={2}>用户登录</Title>
                </Space>
            </div>
            <div>
                <Form labelCol={{span: 6}} wrapperCol={{span: 16}} initialValues={{remember: true}} onFinish={onFinish} form={form}>
                    <Form.Item label="用户名" name="username" rules={[
                        {required:true,message:'请输入用户名'},
                        {type:'string',min:5,max:20,message:"用户名长度为5-20位"},
                        {pattern: /^\w+$/, message:"用户名只能包含字母、数字、下划线"}
                    ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="密码" name="password" rules={[{required:true,message:'请输入密码'}]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 6, span: 16}}>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 6, span: 16}}>
                        <Space>
                            <Button type="primary" htmlType="submit">登录</Button>
                            <Link to={REGISTER_PATHNAME}>新用户注册</Link>
                        </Space>
                    </Form.Item>

                </Form>
            </div>
        </div>
);
};

export default Login;