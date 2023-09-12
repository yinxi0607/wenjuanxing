import {FC} from 'react';
// import './QuestionCard.css'
import classNames from "classnames";
import styles from './QuestionCard.module.scss'

interface PropsType{
    id: string
    title: string
    isPublished: boolean
    deleteQuestion?: (id: string) => void
    publishQuestion?: (id: string) => void
}

const QuestionCard: FC<PropsType> = props => {
    const {id,title,isPublished,deleteQuestion,publishQuestion} = props
    // function edit(id: string) {
    //     console.log("edit", id)
    // }
    function del(id: string){
        deleteQuestion && deleteQuestion(id)
    }
    function publish(id: string){
        publishQuestion && publishQuestion(id)
    }

    // const itemClassName = classNames(
    //     {
    //         "list-item": true,
    //         "published-css" : isPublished
    //     }
    // )

    const listItemClass = styles['list-item']
    const publishedClass = styles.published
    const itemClassName = classNames({
        [listItemClass] : true,
        [publishedClass] : isPublished
    })

    return (
        <div key={id} className={itemClassName}>
            <strong>{title}</strong>
            &nbsp;
            {isPublished ? <span className={styles['publish-span']}>已发布</span> : <span>未发布</span>}
            &nbsp;
            <button onClick={() => {
                publish(id)
            }}>发布问卷
            </button>
            &nbsp;
            <button onClick={()=>{del(id)}}>删除问卷</button>
        </div>
    );
};

export default QuestionCard;