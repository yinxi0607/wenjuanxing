import {FC} from 'react';
import {QuestionRadioPropsType,QuestionRadioDefaultProps} from "./interface.ts";
import {Radio, Space, Typography} from "antd";

const {Paragraph} = Typography
const Component: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
    const {title='',isVertical=false,options=[],value=''} = {...QuestionRadioDefaultProps, ...props}
    return (
        <div>
            <Paragraph strong >{title}</Paragraph>
            <Radio.Group value={value}>
                <Space direction={isVertical?"vertical":"horizontal"}>
                    {options.map((opt)=>{
                        const {text,value} = opt
                        return <Radio key={value} value={value}>{text}</Radio>
                    })}
                </Space>
            </Radio.Group>
        </div>
    );
};

export default Component;