import {useParams} from "react-router-dom";
import {useRequest} from "ahooks";
import {getQuestionService} from "../services/question.ts";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {resetComponents} from "../store/componentsReducer";

function useLoadQuestionData() {
    const {id = ''} = useParams()
    const dispatch = useDispatch()
    //ajax 加载
    const {data, loading, error, run} = useRequest(async (id: string) => {
        if (!id) throw new Error('没有问卷 ID')
        const data = await getQuestionService(id)
        return data
    }, {
        manual: true
    })

    // 根据获取的data设置redux store
    useEffect(() => {
        if (!data) return
        const {title = '', componentList = []} = data
        console.log(title)
        dispatch(resetComponents({componentList,selectedId:''}))
    }, [data])

    // 判断id变化，执行ajax加载问卷数据
    useEffect(() => {
        run(id)
    }, [id])
    return {loading,error}
}

export default useLoadQuestionData