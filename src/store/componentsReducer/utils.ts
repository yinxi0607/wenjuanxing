import {ComponentInfoType} from "./index.ts";

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