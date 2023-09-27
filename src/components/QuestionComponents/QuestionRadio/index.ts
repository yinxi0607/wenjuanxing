
import Component from "./Component.tsx";
import {QuestionRadioDefaultProps} from "./interface.ts";
import PropComponent from "./PropComponent.tsx";

export * from './interface.ts'
export default {
    title: "单选框",
    type: "questionRadio",
    Component,
    PropComponent,
    defaultProps: QuestionRadioDefaultProps
}