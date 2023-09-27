import {QuestionParagraphDefaultPropsType} from "./interface.ts";
import QuestionParagraph from "./Component.tsx";
import PropComponent from "./PropComponent.tsx";

export * from './interface.ts'

export default{
    title: '段落',
    type: 'questionParagraph',
    Component: QuestionParagraph, //画布 显示
    PropComponent: PropComponent,//修改属性
    defaultProps: QuestionParagraphDefaultPropsType
}