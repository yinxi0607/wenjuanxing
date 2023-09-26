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
        addComponents:(state:ComponentsStateType,action:PayloadAction<ComponentInfoType>) => {
            const newComponent = action.payload
            const {selectedId,componentList} = state
            const index = componentList.findIndex(c=>c.fe_id==selectedId)
            if (index<0){
                return {
                    ...state,
                    componentList: [...componentList, newComponent]
                }
            }else{
                const newArray = [...componentList]; // 创建一个新的数组副本
                newArray.splice(index+1, 0, newComponent);
                return {
                    ...state,
                    componentList: newArray
                }
            }

        },
        changeComponentProps: (state: ComponentsStateType, action: PayloadAction<{fe_id:string,props:ComponentPropsType}>) => {
            const {fe_id,props} = action.payload
            const {componentList} = state
            const index = componentList.findIndex(c=>c.fe_id==fe_id)
            if (index<0){
                return state
            }else{
                const newArray = [...componentList]; // 创建一个新的数组副本
                newArray[index] = {
                    ...newArray[index],
                    props: props
                }
                return {
                    ...state,
                    componentList: newArray
                }
            }
        }

    }
})

export const {resetComponents,changeSelectedId,addComponents,changeComponentProps} = componentsSlice.actions

export default componentsSlice.reducer