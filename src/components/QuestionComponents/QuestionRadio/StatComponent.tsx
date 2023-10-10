import {FC, useMemo} from 'react';
import {QuestionRadioStatPropsType} from "./interface.ts";
import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";
import {Tooltip} from "antd";
import {STAT_COLORS} from "../../../constant";

function formate(n: number){
    return (n * 100).toFixed(2)
}
const StatComponent: FC<QuestionRadioStatPropsType> = ({stat=[]}) => {
    const sum = useMemo(() => {
        let s = 0
        stat.forEach(i => (s += i.count))
        return s
    },[stat])
    return (
        <div style={{width:'400px',height:'300px'}}>
            <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                    <Pie
                        dataKey="count"
                        data={stat}
                        cx="50%"
                        cy="50%"
                        outerRadius={50} //饼图的直径
                        label={i=>`${i.name}: ${formate(i.count/ sum)}`}
                    >
                        {stat.map((i,index)=>{
                            return <Cell key={index} fill={STAT_COLORS[index]}/>
                        })}
                    </Pie>
                    <Tooltip/>
                </PieChart>

            </ResponsiveContainer>
        </div>
    );
};

export default StatComponent;