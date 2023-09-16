import {useSearchParams} from "react-router-dom";
import {LIST_SEARCH_PARAM_KEY} from "../constant";
import {useRequest} from "ahooks";
import {getQuestionListService} from "../services/question.ts";

type OptionType= {
    isStar: boolean
    isDeleted: boolean
}

function useLoadQueestionListData(opt: Partial<OptionType>={}){
    const {isStar,isDeleted} = opt
    const [searchParams] = useSearchParams()
    const {data,loading,error} = useRequest(async () => {
        const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) ||""

        const data = await getQuestionListService({keyword,isStar,isDeleted})
        return data
    },{
        refreshDeps:[searchParams]
    })
    return {data,loading,error}
}

export default useLoadQueestionListData