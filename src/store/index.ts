import {configureStore} from "@reduxjs/toolkit";
import userReducer, {UserStateType} from "./userReducer.ts";
import componentsReducer, {ComponentsStateType} from "./componentsReducer";
import pageInfoReducer, {PageInfoType} from "./pageInfoReducer.ts"

export type StateType = {
    user: UserStateType
    components: ComponentsStateType
    pageInfo: PageInfoType
}

export default configureStore({
    reducer: {
        user: userReducer,
        components: componentsReducer,
        // 分模块
        pageInfo: pageInfoReducer
    }
})