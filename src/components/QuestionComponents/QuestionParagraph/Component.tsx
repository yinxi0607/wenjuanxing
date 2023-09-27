import {FC} from 'react';
import {QuestionParagraphDefaultPropsType, QuestionParagraphPropsType} from "./interface.ts";
import {Typography} from "antd";
const {Paragraph} = Typography
const Component: FC<QuestionParagraphPropsType> = (props:QuestionParagraphPropsType) => {
    const {text= '', isCenter= false} = {...QuestionParagraphDefaultPropsType,...props}
    // 尽量不要使用dangerouslySetInnerHTML,不安全
    const textList = text.split('\n')
    return (
        <Paragraph style={{textAlign:isCenter?'center':'start',marginBottom:'0'}}>
            {textList.map((t,index)=>{
                return <span key={index}>
                    {index>0 && <br/>}
                    {t}
                </span>
            })}
        </Paragraph>
    );
};

export default Component;