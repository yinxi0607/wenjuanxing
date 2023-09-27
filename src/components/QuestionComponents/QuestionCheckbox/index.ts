import Component from "./Component.tsx";
import PropComponent from "./PropComponent.tsx";
import {QuestionCheckboxDefaultProps} from "./interface.ts";


export * from './interface.ts'

export default {
    title: '标题',
    type:'questionCheckbox',
    Component,
    PropComponent,
    defaultProps:QuestionCheckboxDefaultProps
}