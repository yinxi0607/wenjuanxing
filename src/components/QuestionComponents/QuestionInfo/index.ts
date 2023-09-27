import Component from "./Component.tsx";
import PropComponent from "./PropComponent.tsx";
import {QuestionInfoDefaultProps} from "./interface.ts";

export * from './interface.ts'

export default {
    title: '标题',
    type:'questionInfo',
    Component,
    PropComponent,
    defaultProps:QuestionInfoDefaultProps
}