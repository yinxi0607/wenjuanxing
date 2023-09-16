import {FC, useEffect, useState} from 'react';
import {Pagination} from "antd";
import {LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY} from "../constant";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

type PropsType = {
    total: number
}
const ListPage: FC<PropsType> = (props:PropsType) => {
    const [current,setCurren] = useState(1)
    const [pageSize,setPageSize] = useState(LIST_PAGE_SIZE)
    const {total} = props

    // 从url参数中找到page pageSize，并同步到分页中
    const [searchParams] = useSearchParams()
    useEffect(()=>{
        const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY)||'1')
        setCurren(page)
        const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)||LIST_PAGE_SIZE+"")
        setPageSize(pageSize)
    },[searchParams])

    const nav = useNavigate()
    const {pathname} = useLocation()
    function handlePageChange(page:number,pageSize:number){
        console.log(page,pageSize)
        searchParams.set(LIST_PAGE_PARAM_KEY,page.toString())
        searchParams.set(LIST_PAGE_SIZE_PARAM_KEY,pageSize.toString())
        nav({
            pathname,
            search: searchParams.toString()
        })
    }
    return <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange}/>
};

export default ListPage;