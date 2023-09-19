import QuestionTitle from "./Component.tsx";
import {QuestionTitleDefaultProps} from "./interface.ts";

export * from './interface.ts'

export default {
    title: '标题',
    type: 'questionTitle',
    Component: QuestionTitle,
    defaultProps: QuestionTitleDefaultProps
}