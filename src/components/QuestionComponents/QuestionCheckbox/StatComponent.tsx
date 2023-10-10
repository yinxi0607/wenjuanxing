import {FC} from 'react';
import {QuestionCheckboxStatPropsType} from './interface.ts'
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {Tooltip} from "antd";

const StatComponent: FC<QuestionCheckboxStatPropsType> = ({stat = []}) => {
    return (
        <div style={{width:"400px", height:"300px"}}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={400}
                    height={300}
                    data={stat}
                    margin={{
                        top:5,
                        right:30,
                        left:0,
                        bottom:5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="count" fill="#8884d8"/>

                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatComponent;