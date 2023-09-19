import useGetUserInfo from "./useGetUserInfo.ts";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {isLogingOrRegister, isNoNeedUserInfo, LOGIN_PATHNAME, MANAGE_LIST_PATHNAME} from "../router";

function useNavPage(waitingUserData: boolean) {
    const {username} = useGetUserInfo()
    const nav = useNavigate()
    const {pathname} = useLocation()
    useEffect(() => {
        if (waitingUserData) return
        // 已经登录
        if (username) {
            if (isLogingOrRegister(pathname)) {
                nav(MANAGE_LIST_PATHNAME)
            }
            return;
        }
        // 未登录
        if (isNoNeedUserInfo(pathname)) {
            return;
        } else {
            nav(LOGIN_PATHNAME)
        }
    }, [username, pathname])
}

export default useNavPage