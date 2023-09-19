import QuestionInput from "./Component.tsx";
import {QuestionInputDefaultProps} from "./interface.ts";

export * from './interface.ts'

export default {
    title: '输入框',
    type: 'questionInput',
    Component: QuestionInput,
    defaultProps: QuestionInputDefaultProps
}