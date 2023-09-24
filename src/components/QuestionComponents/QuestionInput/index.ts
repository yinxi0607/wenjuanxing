import QuestionInput from "./Component.tsx";
import {QuestionInputDefaultProps} from "./interface.ts";
import PropComponent from "./PropComponent.tsx";

export * from './interface.ts'

export default {
    title: '输入框',
    type: 'questionInput',
    Component: QuestionInput,
    PropComponent: PropComponent,//修改属性
    defaultProps: QuestionInputDefaultProps
}