import {ComponentPropsType} from "../../components/QuestionComponents";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getNextSelectedId} from "./utils.ts";


export type ComponentInfoType = {
    fe_id: string
    type: string
    title: string
    isHidden?: boolean
    isLocked?: boolean
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
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        // 重置所有组件
        resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
            console.log('state', state)
            return action.payload
        },
        // 修改selectedId
        changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
            return {
                ...state,
                selectedId: action.payload
            }
        },
        addComponents: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
            const newComponent = action.payload
            const {selectedId, componentList} = state
            const index = componentList.findIndex(c => c.fe_id == selectedId)
            if (index < 0) {
                return {
                    ...state,
                    componentList: [...componentList, newComponent]
                }
            } else {
                const newArray = [...componentList]; // 创建一个新的数组副本
                newArray.splice(index + 1, 0, newComponent);
                return {
                    ...state,
                    componentList: newArray
                }
            }

        },
        changeComponentProps: (state: ComponentsStateType, action: PayloadAction<{ fe_id: string, props: ComponentPropsType }>) => {
            const {fe_id, props} = action.payload
            const {componentList} = state
            const index = componentList.findIndex(c => c.fe_id == fe_id)
            if (index < 0) {
                return state
            } else {
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
        },
        removeSelectedComponent: (state: ComponentsStateType) => {
            const {selectedId: removeId, componentList = []} = state
            // 重新计算selectedId
            const newSelectedId = getNextSelectedId(removeId,componentList)
            const index = componentList.findIndex(c => c.fe_id === removeId)
            console.log("selectedId:%s,index:%s", newSelectedId,index)
            if (index >= 0) {
                const newArray = [...componentList]; // 创建一个新的数组副本
                newArray.splice(index, 1);
                return {
                    ...state,
                    componentList: newArray,
                    selectedId: newSelectedId
                }
            }else{
                return state
            }
        },
        changeComponentHidden: (state:ComponentsStateType,action:PayloadAction<{fe_id: string,isHidden: boolean}>)=>{
            const {componentList} = state
            const {fe_id,isHidden} = action.payload
            const index = componentList.findIndex(c=>c.fe_id===fe_id)
            if (index>=0){
                let newSelectedId = ""
                if (isHidden){
                    newSelectedId = getNextSelectedId(fe_id,componentList)
                }else{
                    newSelectedId = fe_id
                }


                const newArray = [...componentList]; // 创建一个新的数组副本
                newArray[index] = {
                    ...newArray[index],
                    isHidden:isHidden
                }
                return {
                    ...state,
                    componentList: newArray,
                    selectedId:newSelectedId
                }
            }
        },
        toggleComponentLocked: (state: ComponentsStateType,action:PayloadAction<{fe_id:string}>)=>{
            const {fe_id} = action.payload
            const {componentList} = state
            const index = componentList.findIndex(c=>c.fe_id===fe_id)
            if (index>=0){

                const newArray = [...componentList]; // 创建一个新的数组副本
                newArray[index] = {
                    ...newArray[index],
                    isLocked:!newArray[index].isLocked
                }
                return {
                    ...state,
                    componentList: newArray
                }
            }
        }
    }
})

export const {resetComponents, changeSelectedId, addComponents, changeComponentProps,removeSelectedComponent,changeComponentHidden,toggleComponentLocked} = componentsSlice.actions

export default componentsSlice.reducer