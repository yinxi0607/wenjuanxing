import {configureStore} from "@reduxjs/toolkit";
import userReducer, {UserStateType} from "./userReducer.ts";
import componentsReducer, {ComponentsStateType} from "./componentsReducer";
import undoable,{ excludeAction, StateWithHistory } from "redux-undo"
import pageInfoReducer, {PageInfoType} from "./pageInfoReducer.ts"

export type StateType = {
    user: UserStateType
    // components: ComponentsStateType
    components: StateWithHistory<ComponentsStateType>
    pageInfo: PageInfoType
}

export default configureStore({
    reducer: {
        user: userReducer,

        // 在没有添加redux-undo之前
        // components: componentsReducer,

        // 在添加redux-undo之后
        components: undoable(componentsReducer,{
            limit:20,
            filter: excludeAction([
                'components/resetComponents',
                'components/changeSelectedId',
                'components/selectPrevComponent',
                'components/selectNextComponent',
            ])
        }),
        // 分模块
        pageInfo: pageInfoReducer
    }
})