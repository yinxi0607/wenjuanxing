
import Component from "./Component.tsx";
import {QuestionRadioDefaultProps} from "./interface.ts";
import PropComponent from "./PropComponent.tsx";
import StatComponent from "./StatComponent.tsx";

export * from './interface.ts'
export default {
    title: "单选框",
    type: "questionRadio",
    Component,
    PropComponent,
    defaultProps: QuestionRadioDefaultProps,
    StatComponent
}