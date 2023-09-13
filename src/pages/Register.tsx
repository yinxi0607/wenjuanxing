import {FC} from 'react';
import {Button, Form, Input, Space, Typography} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import styles from './Register.module.scss'
import {Link} from "react-router-dom";
import {LOGIN_PATHNAME} from "../router";

const {Title} = Typography

const Register: FC = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    }
    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}>
                        <UserAddOutlined/>
                    </Title>
                    <Title level={2}>注册新用户</Title>
                </Space>
            </div>
            <div>
                <Form
                    labelCol={{span: 8}} wrapperCol={{span: 16}}
                    onFinish={onFinish}
                >
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
                    <Form.Item
                        label="确认密码"
                        name="confirm"
                        dependencies={['password']} // 依赖password字段,password变化，会重新触发validator
                        rules={[
                            {required:true,message:'请输入密码'},
                            ({ getFieldValue }) => ({
                            validator(_, value){
                                if (!value || getFieldValue('password') === value){
                                    return Promise.resolve()
                                }
                                return Promise.reject(new Error('两次密码不一致'))
                            },
                        }),
                    ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item label="昵称" name="nickname">
                        <Input/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                            <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
                        </Space>
                    </Form.Item>

                </Form>
            </div>

        </div>
    );
};

export default Register;