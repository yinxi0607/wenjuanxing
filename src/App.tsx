// import List2 from "./List2.tsx";
// import StyledComponentsDemo from "./StyledComponentsDemo.tsx";
// import {ChangeEvent, useState} from "react";
// import FormElemsDemo from "./FormElemsDemo.tsx";
import FormikDemo from "./FormikDemo.tsx";
// import UseCallbackDemo from "./UseCallbackDemo.tsx";
// import useTitle from "./hooks/useTitle.ts";
// import useGetInfo from "./hooks/useGetInfo.ts";
// import useMouse from "./hooks/useMouse.ts";
// import UseRefDemo from "./UseRefDemo.tsx";
// import UseMemoDemo from "./UseMemoDemo.tsx";
// import {useTitle} from "ahooks"

// import ClosureTrapDemo from "./ClosureTrapDemo.tsx";

function App() {
    // useTitle("App pag1e")
    // const {loading,info} = useGetInfo()
    // const {x,y} = useMouse()
    // const [text,setText] = useState<string>("hello")
    // function handleChange(event: ChangeEvent<HTMLInputElement>){
    //     setText(event.target.value)
    // }
    return (
        <>
            <p>App Page</p>
            {/*<div>*/}
            {/*    <input value={text} onChange={handleChange}/>*/}
            {/*    <button onClick={()=>{console.log(text)}}>打印</button>*/}
            {/*</div>*/}
            {/*<ClosureTrapDemo/>*/}
            {/*<p>*/}
            {/*    {loading? "加载中。。": info}*/}
            {/*</p>*/}
            {/*<p>App page {x},{y}</p>*/}

            {/*<List2/>*/}
            {/*<UseRefDemo/>*/}
            {/*<UseMemoDemo/>*/}
            {/*<UseCallbackDemo/>*/}
            {/*<StyledComponentsDemo/>*/}
            {/*<FormElemsDemo/>*/}
            <FormikDemo/>
        </>

    )
}

export default App
