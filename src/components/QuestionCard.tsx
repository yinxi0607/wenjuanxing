import {FC, useState} from 'react';
import styles from './QuestionCard.module.scss'
import {Button, Divider, Popconfirm, Space, Tag, Modal, message} from "antd";
import {
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    LineChartOutlined,
    StarOutlined
} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {useRequest} from "ahooks";
import {duplicateQuestionService, updateQuestionService} from "../services/question.ts";

type PropsType = {
    _id: string
    title: string
    isStar: boolean
    isPublished: boolean
    answerCount: number
    createdAt: string
}
const {confirm} = Modal
const QuestionCard: FC<PropsType> = (props: PropsType) => {
    const nav = useNavigate()

    const {_id, title, createdAt, answerCount, isPublished, isStar} = props
    // 修改标星
    const [isStarState, setIsStarState] = useState(isStar)
    const {loading: changeStarLoading, run: changeStar} = useRequest(async () => {
        await updateQuestionService(_id, {isStar: !isStarState})
    }, {
        manual: true,
        onSuccess() {
            setIsStarState(!isStarState)
            message.success("已更新")
        }
    })

    // function duplicate() {
    //     message.success('复制成功')
    // }

    const {loading: duplicateLoading, run: duplicate} = useRequest(
        async () => {
            const data = await duplicateQuestionService(_id)
            return data
        }, {
            manual: true,
            onSuccess(res) {
                message.success('复制成功')
                nav(`/question/edit/${res.id}`) // 跳转到编辑页面
            }
        })

    const [isDeletedState,setIsDeletedState] = useState(false)
    const {loading: deleteLoading, run: deleteQuestion} = useRequest(
        async () => await updateQuestionService(_id, {isDeleted: true}), {
            manual: true,
            onSuccess(){
                setIsDeletedState(true)
                message.success('删除成功')
            }
        })

    function del() {
        confirm({
            title: '确定删除该问卷吗？',
            icon: <ExclamationCircleOutlined/>,
            onOk: deleteQuestion,
        })
    }
    // 已经删除的问卷，不要再渲染卡片了
    if (isDeletedState) return null

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.left}>
                    <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
                        <Space>
                            {isStarState ? <StarOutlined style={{color: 'orange'}}/> : null}
                            {title}
                        </Space>

                    </Link>
                </div>
                <div className={styles.right}>
                    <Space>
                        {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
                        <span>答卷：{answerCount}</span>
                        <span>{createdAt}</span>
                    </Space>

                </div>
            </div>
            <Divider style={{margin: '12px 0'}}/>
            <div className={styles['button-container']}>
                <div className={styles.left}>
                    <Space>
                        <Button type="text" size="small" icon={<EditOutlined/>} onClick={() => {
                            nav(`/question/edit/${_id}`)
                        }}>编辑问卷</Button>
                        <Button type="text" size="small" icon={<LineChartOutlined/>} onClick={() => {
                            nav(`/question/stat/${_id}`)
                        }} disabled={!isPublished}>数据统计</Button>
                    </Space>

                </div>
                <div className={styles.right}>
                    <Space>
                        <Button type="text" size="small" icon={<StarOutlined/>} onClick={changeStar}
                                disabled={changeStarLoading}>
                            {isStarState ? '取消星标' : '标星'}
                        </Button>
                        <Popconfirm title={"确定复制该问卷"} okText="确定" cancelText="取消" onConfirm={duplicate}>
                            <Button type="text" size="small" icon={<CopyOutlined/>}
                                    disabled={duplicateLoading}>复制</Button>
                        </Popconfirm>

                        <Button type="text" size="small" icon={<DeleteOutlined/>} onClick={del}
                                disabled={deleteLoading}>删除</Button>
                    </Space>

                </div>
            </div>
        </div>
    );
};

export default QuestionCard;