import {FC, useState} from 'react';
import {getQuestionStatListService} from "../../../services/stat.ts";
import {useParams} from "react-router-dom";
import {useRequest} from "ahooks";
import {Pagination, Spin, Table, Typography} from "antd"
import useGetComponentInfo from "../../../hooks/useGetComponentInfo.ts";
import {STAT_PAGE_SIZE} from "../../../constant";

const {Title} = Typography

type PropsType = {
    selectedComponentId: string
    setSelectedComponentId: (id: string) => void
    setSelectedComponentType: (type: string) => void
}
const PageStat: FC<PropsType> = (props:PropsType) => {
    const {selectedComponentId,setSelectedComponentId,setSelectedComponentType} = props
    const {id=""} = useParams()
    const [page,setPage] = useState(1)
    const [pageSize,setPageSize] = useState(STAT_PAGE_SIZE)
    const [total,setTotal] = useState(0)
    const [list,setList] = useState([])
    const {loading} = useRequest(async ()=>{
        const res = getQuestionStatListService(id,{page,pageSize})
        return res
    },{
        refreshDeps:[page,pageSize,id],
        onSuccess(res){
            const {total,list=[]} = res
            setTotal(total)
            setList(list)
        }
    })
    const {componentList} = useGetComponentInfo()
    const columns = componentList.map(c=>{
        const {fe_id,title,props={},type} = c
        const colTitle = props!.title || title
        return {
            dataIndex: fe_id,
            // title: colTitle
            title: <div
                style={{cursor:"pointer"}}
                onClick={()=>{
                    setSelectedComponentId(fe_id)
                    setSelectedComponentType(type)
                }}
            >
                <span style={{color:fe_id===selectedComponentId ? "#1890ff":"inherit"}}>{colTitle}</span>
            </div>
        }
    })
    const dataSource = list.map((i:any) =>{
        return {
            ...i,
            key: i._id
        }
    })
    const TableElem = <>
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}

        />
        <div style={{textAlign:"center", marginTop:"18px"}}>
            <Pagination
                total={total}
                pageSize={pageSize}
                current={page}
                onChange={(page)=>setPage(page)}
                onShowSizeChange={(page,pageSize)=>{
                    setPage(page)
                    setPageSize(pageSize)
                }}
            />
        </div>

    </>

    return (
        <div>
            <Title level={3}>答卷数量：{!loading && total}</Title>
            {loading && (
                <div style={{textAlign:"center"}}>
                    <Spin/>
                </div>
            )}
            {!loading && TableElem}
        </div>
    );
};

export default PageStat;