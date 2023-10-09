import {FC} from 'react';
import useLoadQuestionData from "../../../hooks/useLoadQuestionData.ts";
import {Button, Result, Spin} from "antd";
import useGetPageInfo from "../../../hooks/useGetPageInfo.ts";
import {useNavigate} from "react-router-dom";
import {useTitle} from "ahooks";
import styles from './index.module.scss'
import StatHeader from "./StatHeader.tsx";

const Stat: FC = () => {
    const nav = useNavigate()
    const {loading} = useLoadQuestionData()
    const {isPublished, title} = useGetPageInfo()
    useTitle(`问卷统计 - ${title}`)
    const LoadingElem = (
        <div style={{textAlign: 'center', marginTop: '60px'}}>
            <Spin/>
        </div>
    )
    function genContentElem(){
        if (typeof isPublished === 'boolean' && !isPublished) {
            return (
                <div style={{flex: '1'}}>
                    <Result
                        status="warning"
                        title="该页面未发布"
                        extra={<Button type="primary" onClick={() => {
                            nav(-1)
                        }}>返回</Button>}>

                    </Result>
                </div>
            )
        }
        return <>

                <div className={styles.left}>左</div>
                <div className={styles.main}>中</div>
                <div className={styles.right}>右</div>

        </>
    }



    return (
        <div className={styles.container}>
            <StatHeader/>
            <div className={styles['content-wrapper']}>
                {loading && LoadingElem}
                {!loading && <div className={styles.content}>{genContentElem()}</div>}

            </div>
        </div>
    );
}

export default Stat;