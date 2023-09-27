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
    if (activeElement===document.body) return true
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