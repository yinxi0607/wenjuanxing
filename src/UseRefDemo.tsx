import {FC, useRef} from 'react';

const UseRefDemo: FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef("yinxi")
    function selectInput(){
        const inputElem = inputRef.current
        if (inputElem) inputElem.select()
    }
    function changeName(){
        nameRef.current = "yinxi" + Math.random().toString().slice(-3) //修改ref值，不会触发rerender（state修改后会触发）
    }
    return (
        <div>
            <input ref={inputRef} defaultValue="hello world"/>
            <button onClick={selectInput}>选中</button>
            <p>name {nameRef.current}</p>
            <button onClick={changeName}>change name</button>
        </div>
    );
};

export default UseRefDemo;