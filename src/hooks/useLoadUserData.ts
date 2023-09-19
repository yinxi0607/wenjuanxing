import {useEffect, useState} from "react";
import useGetUserInfo from "./useGetUserInfo.ts";
import {useRequest} from "ahooks";
import {getUserInfoService} from "../services/user.ts";
import {useDispatch} from "react-redux";
import {loginReducer} from "../store/userReducer.ts";

function useLoadUserData(){
    const [waitingUserData,setWaitUserData] = useState(true)
    const dispatch = useDispatch()
    const {run} = useRequest(getUserInfoService,{
        manual: true,
        onSuccess(result){
            const {username,nickname} = result
            dispatch(loginReducer({username,nickname}))
        },
        onFinally(){
            setWaitUserData(false)
        }
    })

    const {username} = useGetUserInfo()
    useEffect(()=>{
        if(username){
            setWaitUserData(false)
            return
        }
        run()
    },[username])
    return {waitingUserData}
}

export default useLoadUserData