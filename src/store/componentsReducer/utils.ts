import {ComponentInfoType, ComponentsStateType} from "./index.ts";

export function getNextSelectedId(fe_id: string,componentList: ComponentInfoType[]){
    const visibleComponentList = componentList.filter(c=> !c.isHidden)
    const index = visibleComponentList.findIndex(c => c.fe_id===fe_id)
    if (index<0) return ""
    let newSelectedId = ""
    const length = visibleComponentList.length
    if (length<=1){
        // 组件长度就一个，删除后就没有组件了
        newSelectedId = ""
    }else{
        if (index+1===length){
            // 表示删除的是最后一个
            newSelectedId = visibleComponentList[index-1].fe_id
        }else {
            newSelectedId = visibleComponentList[index+1].fe_id
        }
    }
    return newSelectedId
}


export function insertNewComponent(state: ComponentsStateType,newComponent:ComponentInfoType){
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
}