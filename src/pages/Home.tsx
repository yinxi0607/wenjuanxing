import {FC, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Typography} from "antd";
import styles from './Home.module.scss'
import {MANAGE_LIST_PATHNAME} from "../router";
// import axios from "axios";
// import '../_mock/index.ts'

const {Title,Paragraph} = Typography
const Home: FC = () => {
    const nav = useNavigate()
    // function clickHandler(){
    //     nav("/login")
    // }
    //
    // useEffect(()=>{
    //     // fetch('/api/test').then(res=>res.json()).then(data=> console.log(data))
    //     // mock.js 只能劫持 XMLHttpRequest，不能劫持fetch
    //     axios.get('/api/test').then(res=> console.log(res.data))
    // },[])

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <Title>问卷调查 | 在线投票</Title>
                <Paragraph>已累计创建问卷 10 份，发布问卷 9 份， 收到答卷 2 份</Paragraph>
                <div>
                    <Button type="primary" onClick={()=> nav(MANAGE_LIST_PATHNAME)}>开始使用</Button>
                </div>
            </div>

        </div>
    );
};

export default Home;