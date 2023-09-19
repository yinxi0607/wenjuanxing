import {configureStore} from "@reduxjs/toolkit";
import userReducer, {UserStateType} from "./userReducer.ts";
import componentsReducer, {ComponentsStateType} from "./componentsReducer";

export type StateType = {
    user: UserStateType
    components: ComponentsStateType
}

export default configureStore({
    reducer: {
        user: userReducer,
        components: componentsReducer,
        // 分模块
    }
})