import QuestionInputConf,{QuestionInputPropsType} from "./QuestionInput";
import QuestionTitleConf,{QuestionTitlePropsType} from "./QuestionTitle";
import {FC} from "react";

export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 组件的配置
export type ComponentConfType = {
    title: string
    type: string,
    Component: FC<ComponentPropsType>
    PropComponent: FC<ComponentPropsType>
    defaultProps: ComponentPropsType
}

// 全部的组件配置列表
const componentConfList:ComponentConfType[] = [QuestionInputConf,QuestionTitleConf]

export const componentConfGroup = [
    {
        groupId: 'textGroup',
        groupName: '文本显示',
        components: [QuestionTitleConf]
    },
    {
        groupId: 'inputGroup',
        groupName: '用户输入',
        components: [QuestionInputConf]
    }
]

export function getComponentConfByType(type:string) {
    return componentConfList.find(item => item.type === type)
}
