export type OptionType = {
    text: string
    value: string
    checked: boolean
}

export type QuestionCheckboxPropsType = {
    title?: string
    isVertical?: boolean
    list?: OptionType[]

    onChange?: (newProps: QuestionCheckboxPropsType) => void
    disabled?: boolean
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
    title: "多选框",
    isVertical: false,
    list: [
        {value: "item1", text: "选择框1", checked: false},
        {value: "item2", text: "选择框2", checked: false},
        {value: "item3", text: "选择框3", checked: false},
    ]
}