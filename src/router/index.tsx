import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import NotFound from "../pages/NotFound.tsx";
import ManageLayout from "../layouts/ManageLayout.tsx";
import List from "../pages/manage/List.tsx";
import Star from "../pages/manage/Star.tsx";
import Trash from "../pages/manage/Trash.tsx";
import QuestionLayout from "../layouts/QuestionLayout.tsx";
import Edit from "../pages/question/Edit";
import Stat from "../pages/question/Stat";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: 'manage',
                element: <ManageLayout/>,
                children: [
                    {
                        path: 'list',
                        element: <List/>
                    },
                    {
                        path: 'star',
                        element: <Star/>
                    },
                    {
                        path: 'trash',
                        element: <Trash/>
                    },
                ]
            },
            {
                path: '*',
                element: <NotFound/>
            }
        ]
    },
    {
        path: 'question',
        element: <QuestionLayout/>,
        children: [
            {
                path: 'edit/:id',
                element: <Edit/>
            },
            {
                path: 'stat/:id',
                element: <Stat/>
            }
        ]
    }
])

export default router;

export const LOGIN_PATHNAME = '/login'
export const HOME_PATHNAME = '/'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_LIST_PATHNAME = '/manage/list'

export function isLogingOrRegister(pathname: string) {
    return [LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname);

}

export function isNoNeedUserInfo(pathname: string){
    return [LOGIN_PATHNAME, REGISTER_PATHNAME,HOME_PATHNAME].includes(pathname);
}