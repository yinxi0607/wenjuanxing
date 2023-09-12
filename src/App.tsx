import List from "./pages/List.tsx";

function App() {

    return (
        <>
            <h1 style={{background:'yellow'}}>问卷星FE</h1>
            <List/>
        </>

    )
}

export default App


// src/components 目录 -- 组件
// src/pages 目录 -- 页面(React 组件)
// 业务-页面（跳转，切换，大面积的），组件（零件）
// src/utils 目录 -- 工具函数