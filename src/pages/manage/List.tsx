import {FC, useEffect, useMemo, useRef, useState} from 'react';
import styles from './common.module.scss'
import QuestionCard from "../../components/QuestionCard.tsx";
import {useDebounceFn, useRequest, useTitle} from "ahooks";
import {Empty, Spin, Typography} from "antd";
import ListSearch from "../../components/ListSearch.tsx";
import {useSearchParams} from "react-router-dom";
import {getQuestionListService} from "../../services/question.ts";
import {LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY} from "../../constant";
const {Title} = Typography
// const rawQuestionList = [
//     {_id: 'q1', title: '问卷1', isPublished: true, isStar: false, answerCount: 5, createdAt: '9月12日 13:26'},
//     {_id: 'q2', title: '问卷2', isPublished: false, isStar: true, answerCount: 2, createdAt: '9月11日 12:26'},
//     {_id: 'q3', title: '问卷3', isPublished: false, isStar: false, answerCount: 0, createdAt: '9月18日 11:26'},
//     {_id: 'q4', title: '问卷4', isPublished: true, isStar: true, answerCount: 1, createdAt: '9月15日 19:26'}
// ]

const List: FC = () => {
    // const [searchParams] = useSearchParams()
    useTitle("尹曦问卷 - 我的问卷")

    const [started,setStated] = useState(false) //是否已经再试加载（防抖有延迟时间）
    const [list,setList] = useState([]) //List内部的数据，不在url参数中体现，全部的列表数据，上划加载更多，累计
    const [page,setPage] = useState(1)
    const [total,setTotal] = useState(0)
    const haveMoreData = total > list.length  // 有没有更多的，未加载完成的数据

    const [searchParams] = useSearchParams() // url参数，虽然没有page pageSize，但是有keyword
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY)||""

    useEffect(() => {
        setStated(false)
        setPage(1)
        setList([])
        setTotal(0)
    }, [keyword]);

    const containerRef = useRef<HTMLDivElement>(null)

    const {run:load,loading} = useRequest(async ()=> {
        const data = await getQuestionListService({
            page,
            pageSize: LIST_PAGE_SIZE,
            keyword,
        })
        return data
    },{
        manual: true,
        onSuccess(result){
            const {list:l=[],total:t=0} = result
            setList(list.concat(l))
            setTotal(t)
            setPage(page+1)
        }
    })

    // 触发加载 -- 防抖
    const {run: tryLoadMore} = useDebounceFn(
        ()=>{
            const elem = containerRef.current
            if (elem == null) return
            const domRect = elem.getBoundingClientRect()
            if (domRect == null) return;
            const {bottom} = domRect
            if (bottom <= document.body.clientHeight){
                console.log("执行加载")
                load()
                setStated(true)
            }
        },
        {wait:1000}
    )

    // 当页面加载，或者url参数变化时，触发加载
    useEffect(()=>{
        tryLoadMore()
    },[searchParams])

    // 当页面滚动时，要尝试触发加载
    useEffect(()=>{
        if (haveMoreData){
            window.addEventListener('scroll',tryLoadMore) // 要添加防抖
        }
        return ()=>{
            window.removeEventListener('scroll',tryLoadMore) // 解绑事件
        }
    },[searchParams,haveMoreData])

    const LoadMoreContentElem = useMemo(()=>{
        if(!started||loading) return <Spin/>
        if(!started||total ===0 )  return <Empty description="暂无数据"/>
        if(!haveMoreData) return <span>没有更多了...</span>
        return <span>开始加载下一页</span>
    },[started,loading,haveMoreData])

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>我的问卷{total}</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch/>
                </div>
            </div>
            <div className={styles.content}>
                {/*<div style={{height:'2000px'}}></div>*/}
                {list.length > 0 && list.map((q:any) => {
                    const {_id} = q
                    return (
                        <QuestionCard key={_id} {...q}/>
                    )
                })}
            </div>
            <div className={styles.footer}>
                <div ref={containerRef}>
                    {LoadMoreContentElem}
                </div>

            </div>
        </>
    );
};

export default List;