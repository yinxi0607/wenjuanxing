import {FC, useEffect, useState} from 'react';
import {Typography} from "antd"
import {useRequest} from "ahooks";
import {getComponentStatService} from "../../../services/stat.ts";
import {useParams} from "react-router-dom";
import {getComponentConfByType} from "../../../components/QuestionComponents";

const {Title} = Typography

type PropsType = {
    selectedComponentId: string
    selectedComponentType: string
}
const ChartStat: FC<PropsType> = (props: PropsType) => {
    const { id} = useParams()
    const {selectedComponentId, selectedComponentType} = props
    const [stat,setStat] = useState([])
    const {run} = useRequest(async (questionId, componentId) => await getComponentStatService(questionId, componentId),
        {
            manual: true,
            onSuccess(res){
                setStat(res.stat)
            }
        })
    useEffect(() => {
        if (selectedComponentId !== null) run(id, selectedComponentId)
    }, [id,selectedComponentId]);
    function getChartElem(){
        if(!selectedComponentId) return <div>未选中组件</div>
        const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
        if (StatComponent==null) return <div>该组件没有统计数据</div>
        return <StatComponent stat={stat}/>
    }
    return (
        <div>
            <Title level={3}>图标统计</Title>
            <div>{getChartElem()}</div>
        </div>
    );
};

export default ChartStat;