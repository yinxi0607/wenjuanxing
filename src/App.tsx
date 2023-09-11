// import List2 from "./List2.tsx";
// import UseCallbackDemo from "./UseCallbackDemo.tsx";
// import useTitle from "./hooks/useTitle.ts";
// import useGetInfo from "./hooks/useGetInfo.ts";
// import useMouse from "./hooks/useMouse.ts";
// import UseRefDemo from "./UseRefDemo.tsx";
// import UseMemoDemo from "./UseMemoDemo.tsx";
// import {useTitle} from "ahooks"

import ClosureTrapDemo from "./ClosureTrapDemo.tsx";

function App() {
    // useTitle("App pag1e")
    // const {loading,info} = useGetInfo()
    // const {x,y} = useMouse()
    return (
        <>
            <p>App Page</p>
            <ClosureTrapDemo/>
            {/*<p>*/}
            {/*    {loading? "加载中。。": info}*/}
            {/*</p>*/}
            {/*<p>App page {x},{y}</p>*/}

            {/*<List2/>*/}
            {/*<UseRefDemo/>*/}
            {/*<UseMemoDemo/>*/}
            {/*<UseCallbackDemo/>*/}
        </>

    )
}

export default App
