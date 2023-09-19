import {ComponentPropsType} from "../../components/QuestionComponents";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ComponentInfoType = {
    fe_id: string
    type: string
    title: string
    props: ComponentPropsType
}

export type ComponentsStateType = {
    selectedId: string
    componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
    selectedId: '',
    componentList: []

}

export const componentsSlice = createSlice({
    name:'components',
    initialState: INIT_STATE,
    reducers:{
        // 重置所有组件
        resetComponents: (state:ComponentsStateType,action:PayloadAction<ComponentsStateType>) => {
            console.log('state',state)
            return action.payload
        },
        // 修改selectedId
        changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
            return {
                ...state,
                selectedId: action.payload
            }
        },
    }
})

export const {resetComponents,changeSelectedId} = componentsSlice.actions

export default componentsSlice.reducer