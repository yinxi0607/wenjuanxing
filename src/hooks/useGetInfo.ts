import {useState,useEffect} from "react";

function getInfo(): Promise<string>{
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Date.now().toString())
        }, 1500)
    })
}

const useGetInfo = () => {
    const [loading,setLoading] = useState(true)
    const [info,setInfo] = useState("")
    useEffect(() => {
        getInfo().then(res => {
            setLoading(false)
            setInfo(res)
        })
    },[])
    return {loading,info}
}

export default useGetInfo