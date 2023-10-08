import {useKeyPress} from "ahooks";
import {useDispatch} from "react-redux";
import {
    copySelectedComponent,
    pasteComponent,
    removeSelectedComponent, selectNextComponent,
    selectPrevComponent
} from "../store/componentsReducer";

// 判断当前element是否合法
function isActiveElementVaild(){
    const activeElement = document.activeElement
    // 在没有添加dnd-kit之前
    // if (activeElement===document.body) return true

    // 在添加dnd-kit之后
    if (activeElement===document.body) return true
    if (activeElement?.matches('div[role="button"]')) return true
    return false
}

function useBindCanvasKeyPress(){
    const dispatch = useDispatch()
    useKeyPress(['backspace','delete'],()=>{
        if (!isActiveElementVaild()) return
        dispatch(removeSelectedComponent())
    })

    useKeyPress(['ctrl.c','meta.c'],()=>{
        if (!isActiveElementVaild()) return
        dispatch(copySelectedComponent())
    })
    useKeyPress(['ctrl.v','meta.v'],()=>{
        if (!isActiveElementVaild()) return
        dispatch(pasteComponent())
    })
    useKeyPress('uparrow',()=>{
        if (!isActiveElementVaild()) return
        dispatch(selectPrevComponent())
    })
    useKeyPress('downarrow',()=>{
        if (!isActiveElementVaild()) return
        dispatch(selectNextComponent())
    })
}

export default useBindCanvasKeyPress