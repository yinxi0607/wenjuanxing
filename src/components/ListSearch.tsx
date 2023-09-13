import {ChangeEvent, FC, useEffect, useState} from 'react';
import {Input} from "antd";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {LIST_SEARCH_PARAM_KEY} from "../constant";

const {Search} = Input
const ListSearch: FC = () => {
    const nav = useNavigate()
    const {pathname} = useLocation()
    const [val, setValue] = useState('')
    const[searchParams] = useSearchParams()
    useEffect(() => {
        const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY)  || ''
        setValue(newVal)
    },[searchParams])
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }

    function handleSearch(value: string) {
        console.log(value)
        nav({
            pathname: pathname,
            search: `${LIST_SEARCH_PARAM_KEY}=${value}`
        })
    }

    return (
        <Search
            placeholder="请输入关键字"
            onSearch={handleSearch}
            style={{width: '300px'}}
            size="large"
            onChange={handleChange}
            allowClear={true}/>
    );
};

export default ListSearch;