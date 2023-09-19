import {FC, useEffect, useState} from 'react';
import {Space, Typography} from "antd";
import {FormOutlined} from "@ant-design/icons";

import styles from './Logo.module.scss'
import {Link} from "react-router-dom";
import useGetUserInfo from "../hooks/useGetUserInfo.ts";
import {HOME_PATHNAME, MANAGE_LIST_PATHNAME} from "../router";

const { Title } = Typography
const Logo: FC = () => {

    const {username} = useGetUserInfo()
    const [pathname,setPathname] = useState(HOME_PATHNAME)
    console.log("username:%s, pathname:%s",username,pathname)
    useEffect(() => {
        console.log("logo",username)
        if(username){
            setPathname(MANAGE_LIST_PATHNAME)
        }
    }, [username]);

    return (
        <div className={styles.container}>
            <Link to={pathname}>
                <Space>
                    <Title>
                        <FormOutlined/>
                    </Title>
                    <Title>尹曦问卷</Title>
                </Space>
            </Link>

        </div>
    );
};

export default Logo;