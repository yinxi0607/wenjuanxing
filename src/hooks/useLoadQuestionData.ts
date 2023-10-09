import {useParams} from "react-router-dom";
import {useRequest} from "ahooks";
import {getQuestionService} from "../services/question.ts";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {resetComponents} from "../store/componentsReducer";
import {resetPageInfo} from "../store/pageInfoReducer.ts";

function useLoadQuestionData() {
    const {id = ''} = useParams()
    const dispatch = useDispatch()
    //ajax 加载
    const {data, loading, error, run} = useRequest(async (id: string) => {
        if (!id) throw new Error('没有问卷 ID')
        return await getQuestionService(id)
    }, {
        manual: true
    })

    // 根据获取的data设置redux store
    useEffect(() => {
        if (!data) return
        const {title = '', desc='',js='',css='',isPublished=false, componentList = []} = data
        //获取默认的selectedId
        let selectedId = ''
        if(componentList.length>0){
            selectedId = componentList[0].fe_id//默认选择第一个组件
        }
        dispatch(resetComponents({componentList,selectedId:selectedId,copiedComponent:null}))
        dispatch(resetPageInfo({title,desc,js,css,isPublished}))
    }, [data])

    // 判断id变化，执行ajax加载问卷数据
    useEffect(() => {
        run(id)
    }, [id])
    return {loading,error}
}

export default useLoadQuestionData