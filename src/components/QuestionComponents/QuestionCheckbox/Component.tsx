import {FC} from 'react';
import {QuestionCheckboxDefaultProps, QuestionCheckboxPropsType} from "./interface.ts";
import {Checkbox, Space, Typography} from "antd";
const {Paragraph} = Typography
const Component: FC<QuestionCheckboxPropsType> = (props:QuestionCheckboxPropsType) => {
    const {title,isVertical,list=[]} = {...QuestionCheckboxDefaultProps,...props}
    return (
        <div>
            <Paragraph strong>{title}</Paragraph>
            <Space direction={isVertical?"vertical":"horizontal"}>
                {list.map(({text,value,checked})=>{
                    return <Checkbox key={value} value={value} checked={checked}>{text}</Checkbox>
                })}
            </Space>
        </div>
    );
};

export default Component;