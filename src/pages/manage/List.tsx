import {FC, useState} from 'react';
import styles from './common.module.scss'
import QuestionCard from "../../components/QuestionCard.tsx";
import {useTitle} from "ahooks";
import {Typography} from "antd";
// import {useSearchParams} from "react-router-dom";
const { Title} = Typography
const rawQuestionList = [
    {_id: 'q1', title: '问卷1', isPublished: true, isStar: false, answerCount: 5, createdAt: '9月12日 13:26'},
    {_id: 'q2', title: '问卷2', isPublished: false, isStar: true, answerCount: 2, createdAt: '9月11日 12:26'},
    {_id: 'q3', title: '问卷3', isPublished: false, isStar: false, answerCount: 0, createdAt: '9月18日 11:26'},
    {_id: 'q4', title: '问卷4', isPublished: true, isStar: true, answerCount: 1, createdAt: '9月15日 19:26'}
]

const List: FC = () => {
    // const [searchParams] = useSearchParams()
    useTitle("尹曦问卷 - 我的问卷")
    const [questionList, setQuestionList] = useState(rawQuestionList)

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>我的问卷</Title>
                </div>
                <div className={styles.right}>(搜索)</div>
            </div>
            <div className={styles.content}>
                {questionList.map(q=> {
                    const { _id } = q
                    return (
                        <QuestionCard key={_id} {...q}/>
                    )
                })}
            </div>
            <div className={styles.footer}>
                LoadMore 上划加载更多
            </div>
        </>
    );
};

export default List;