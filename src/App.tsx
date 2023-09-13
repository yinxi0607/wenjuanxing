import {RouterProvider} from "react-router-dom";
import router from "./router";
import 'antd/dist/reset.css'

function App() {

    return (
        <RouterProvider router={router}>

        </RouterProvider>

    )
}

export default App


// src/components 目录 -- 组件
// src/pages 目录 -- 页面(React 组件)
// 业务-页面（跳转，切换，大面积的），组件（零件）
// src/utils 目录 -- 工具函数