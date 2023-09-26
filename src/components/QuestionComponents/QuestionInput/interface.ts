export type QuestionInputPropsType = {
    title?: string
    placeholder?: string

    onChange?: (props:QuestionInputPropsType) => void
}

export const QuestionInputDefaultProps: QuestionInputPropsType = {
    title: '输入标题',
    placeholder: '请输入。。。'
}