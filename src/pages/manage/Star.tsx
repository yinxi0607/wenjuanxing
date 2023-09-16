import {FC} from 'react';
import styles from './common.module.scss'
import {Empty, Spin, Typography} from "antd";
import {useTitle} from "ahooks";
import QuestionCard from "../../components/QuestionCard.tsx";
import ListSearch from "../../components/ListSearch.tsx";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData.ts";

const { Title} = Typography
const Star: FC = () => {
    useTitle("尹曦问卷 - 星标问卷")
    // const [questionList, setQuestionList] = useState(rawQuestionList)
    const {data={},loading} = useLoadQuestionListData({isStar: true})
    const {list=[],total=0} = data

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>星标问卷{total}</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch/>
                </div>
            </div>
            <div className={styles.content}>
                {loading && <div style={{textAlign: 'center'}}><Spin/></div>}
                {!loading && list.length===0 && <Empty description="暂无数据。。。"/>}

                {list.length>0 && list.map((q:any) => {
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