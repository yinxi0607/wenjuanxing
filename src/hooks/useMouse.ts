import {useState, useEffect, useCallback} from "react";

//获取鼠标位置
function useMouse() {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const mouseMoveHandler = useCallback((event: MouseEvent) => {
        setX(event.clientX)
        setY(event.clientY)
    },[])
    useEffect(() => {
        //监听鼠标事件
        window.addEventListener("mousemove", mouseMoveHandler)
        //组件卸载时移除监听，解绑DOM事件！！！ 会出现内存泄漏问题
        return () => {
            window.removeEventListener("mousemove", mouseMoveHandler)
        }
    }, [])
    return {x, y}
}

export default useMouse