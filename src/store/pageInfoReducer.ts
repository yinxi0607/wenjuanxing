import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type PageInfoType = {
    title: string
    desc?: string
    css?: string
    js?: string
}

const INIT_STATE: PageInfoType = {
    title: "",
    desc: "",
    css: "",
    js: ""
}

const pageInfoSlice = createSlice({
    name: 'pageInfo',
    initialState: INIT_STATE,
    reducers: {
        resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
            return action.payload
        },
        changePageTitle:(state:PageInfoType,action:PayloadAction<string>) => {
            return {
                ...state,
                title: action.payload
            }
        }
    }
})

export const {resetPageInfo,changePageTitle} = pageInfoSlice.actions

export default pageInfoSlice.reducer
