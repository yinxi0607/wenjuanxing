import {FC} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {LOGIN_PATHNAME} from "../router";
import {useRequest} from "ahooks";
import {getUserInfoService} from "../services/user.ts";
import {UserOutlined} from "@ant-design/icons";
import {Button, message} from "antd";
import {removeToken} from "../utils/user-token.ts";

const UserInfo: FC = () => {
    const nav = useNavigate()
    const {data} = useRequest(getUserInfoService)
    console.log("userinfo data",data)
    const {username,nickname} = data || {}
    function logout(){
        removeToken()// 清楚token的存储
        message.success("退出成功")
        nav(LOGIN_PATHNAME)
    }
    const UserInfo = (
        <>
            <span style={{color:'#e8e8e8'}}>
                <UserOutlined/>
                {nickname || username}
            </span>
            <Button type="link" onClick={logout}>退出</Button>
        </>
    )
    const Login= (
        <Link to={LOGIN_PATHNAME}>登录</Link>
    )
    return (
        <>
            {username?UserInfo:Login}
        </>
    );
};

export default UserInfo;