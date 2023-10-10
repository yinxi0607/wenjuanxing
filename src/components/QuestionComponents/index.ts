import QuestionInputConf,{QuestionInputPropsType} from "./QuestionInput";
import QuestionTitleConf,{QuestionTitlePropsType} from "./QuestionTitle";
import QuestionParagraphConf,{QuestionParagraphPropsType} from "./QuestionParagraph";
import QuestionInfoConf,{QuestionInfoPropsType} from "./QuestionInfo"
import QuestionTextareaConf,{QuestionTextareaPropsType} from "./QuestionTextarea"
import QuestionRadioConf,{QuestionRadioPropsType,QuestionRadioStatPropsType} from "./QuestionRadio"
import QuestionCheckboxConf,{QuestionCheckboxPropsType,QuestionCheckboxStatPropsType} from './QuestionCheckbox'
import {FC} from "react";


export type ComponentPropsType = QuestionCheckboxPropsType & QuestionRadioPropsType & QuestionTextareaPropsType & QuestionInputPropsType & QuestionTitlePropsType & QuestionParagraphPropsType & QuestionInfoPropsType
type StatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType
// 组件的配置
export type ComponentConfType = {
    title: string
    type: string,
    Component: FC<ComponentPropsType>
    PropComponent: FC<ComponentPropsType>
    defaultProps: ComponentPropsType
    StatComponent?: FC<StatPropsType>
}

// 全部的组件配置列表
const componentConfList:ComponentConfType[] = [QuestionCheckboxConf,QuestionRadioConf,QuestionInputConf,QuestionTitleConf,QuestionParagraphConf,QuestionInfoConf,QuestionTextareaConf]

export const componentConfGroup = [
    {
        groupId: 'textGroup',
        groupName: '文本显示',
        components: [QuestionTitleConf,QuestionParagraphConf,QuestionInfoConf,QuestionTextareaConf]
    },
    {
        groupId: 'inputGroup',
        groupName: '用户输入',
        components: [QuestionInputConf]
    },
    {
        groupId: 'chooseGroup',
        groupName: '用户选择',
        components: [QuestionRadioConf,QuestionCheckboxConf]
    }
]

export function getComponentConfByType(type:string) {
    return componentConfList.find(item => item.type === type)
}
