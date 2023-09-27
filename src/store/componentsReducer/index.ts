import {ComponentPropsType} from "../../components/QuestionComponents";
import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {getNextSelectedId, insertNewComponent} from "./utils.ts";
import cloneDeep from "lodash.clonedeep"


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
    copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
    selectedId: '',
    componentList: [],
    copiedComponent: null

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
        // 添加组件
        addComponents: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
            const newComponent = action.payload
            return insertNewComponent(state, newComponent)

        },
        // 修改属性
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
        // 删除选中的组件
        removeSelectedComponent: (state: ComponentsStateType) => {
            const {selectedId: removeId, componentList = []} = state
            // 重新计算selectedId
            const newSelectedId = getNextSelectedId(removeId, componentList)
            const index = componentList.findIndex(c => c.fe_id === removeId)
            console.log("selectedId:%s,index:%s", newSelectedId, index)
            if (index >= 0) {
                const newArray = [...componentList]; // 创建一个新的数组副本
                newArray.splice(index, 1);
                return {
                    ...state,
                    componentList: newArray,
                    selectedId: newSelectedId
                }
            } else {
                return state
            }
        },
        // 隐藏/显示
        changeComponentHidden: (state: ComponentsStateType, action: PayloadAction<{ fe_id: string, isHidden: boolean }>) => {
            const {componentList} = state
            const {fe_id, isHidden} = action.payload
            const index = componentList.findIndex(c => c.fe_id === fe_id)
            if (index >= 0) {
                let newSelectedId = ""
                if (isHidden) {
                    newSelectedId = getNextSelectedId(fe_id, componentList)
                } else {
                    newSelectedId = fe_id
                }


                const newArray = [...componentList]; // 创建一个新的数组副本
                newArray[index] = {
                    ...newArray[index],
                    isHidden: isHidden
                }
                return {
                    ...state,
                    componentList: newArray,
                    selectedId: newSelectedId
                }
            }
        },
        //锁定/解锁组件
        toggleComponentLocked: (state: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
            const {fe_id} = action.payload
            const {componentList} = state
            const index = componentList.findIndex(c => c.fe_id === fe_id)
            if (index >= 0) {

                const newArray = [...componentList]; // 创建一个新的数组副本
                newArray[index] = {
                    ...newArray[index],
                    isLocked: !newArray[index].isLocked
                }
                return {
                    ...state,
                    componentList: newArray
                }
            }
        },
        // 拷贝组件
        copySelectedComponent: (state: ComponentsStateType) => {
            const {selectedId, componentList} = state
            const index = componentList.findIndex(c => c.fe_id === selectedId)
            if (index >= 0) {
                return {
                    ...state,
                    copiedComponent: cloneDeep(componentList[index])
                }
            } else {
                return state
            }
        },
        // 复制组件
        pasteComponent: (state: ComponentsStateType) => {
            const {copiedComponent} = state
            if (copiedComponent == null) return
            // copiedComponent.fe_id = nanoid()
            const newCopiedComponent = {
                ...copiedComponent,fe_id:nanoid()
            }
            return insertNewComponent(state, newCopiedComponent)
        },
        // 向上选择
        selectPrevComponent:(state:ComponentsStateType)=>{
            const {selectedId,componentList} = state
            const selectedIndex = componentList.findIndex(c=> c.fe_id===selectedId)
            if(selectedIndex<0) return //未选中组件
            if (selectedIndex==0) return //选中的是第一个，无法向上
            return {
                ...state,
                selectedId: componentList[selectedIndex-1].fe_id
            }
        },
        // 向下选择
        selectNextComponent:(state:ComponentsStateType) => {
            const {selectedId,componentList} = state
            const selectedIndex = componentList.findIndex(c=> c.fe_id===selectedId)
            if(selectedIndex<0) return //未选中组件
            if (selectedIndex+1===componentList.length) return //选中的是第一个，无法向上
            return {
                ...state,
                selectedId: componentList[selectedIndex+1].fe_id
            }
        }
    }
})

export const {
    resetComponents,
    changeSelectedId,
    addComponents,
    changeComponentProps,
    removeSelectedComponent,
    changeComponentHidden,
    toggleComponentLocked,
    copySelectedComponent,
    pasteComponent,
    selectPrevComponent,
    selectNextComponent
} = componentsSlice.actions

export default componentsSlice.reducer