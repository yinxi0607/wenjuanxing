import React, {FC, useState} from 'react';
import styles from './common.module.scss'
import {Empty, Typography} from "antd";
import {useTitle} from "ahooks";
import QuestionCard from "../../components/QuestionCard.tsx";

const { Title} = Typography
const rawQuestionList = [
    {_id: 'q2', title: '问卷2', isPublished: false, isStar: true, answerCount: 2, createdAt: '9月11日 12:26'},
    {_id: 'q4', title: '问卷4', isPublished: true, isStar: true, answerCount: 1, createdAt: '9月15日 19:26'}
]
const Star: FC = () => {
    useTitle("尹曦问卷 - 星标问卷")
    const [questionList, setQuestionList] = useState(rawQuestionList)

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>星标问卷</Title>
                </div>
                <div className={styles.right}>(搜索)</div>
            </div>
            <div className={styles.content}>
                {questionList.length===0 && <Empty description="暂无数据。。。"/>}

                {questionList.length>0 && questionList.map(q=> {
                    const { _id } = q
                    return (
                        <QuestionCard key={_id} {...q}/>
                    )
                })}
            </div>
            <div className={styles.footer}>
                分页
            </div>
        </>
    );
};

export default Star;