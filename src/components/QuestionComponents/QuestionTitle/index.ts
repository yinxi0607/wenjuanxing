import QuestionTitle from "./Component.tsx";
import {QuestionTitleDefaultProps} from "./interface.ts";
import PropComponent from "./PropComponent.tsx";

export * from './interface.ts'

export default {
    title: '标题',
    type: 'questionTitle',
    Component: QuestionTitle, //画布显示
    PropComponent: PropComponent,//修改属性
    defaultProps: QuestionTitleDefaultProps
}