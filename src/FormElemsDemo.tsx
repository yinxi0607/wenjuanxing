import {ChangeEvent, FC, useState} from 'react';

const FormElemsDemo: FC = () => {
    const [text,setText] = useState<string>("hello")
    function handleChange(event: ChangeEvent<HTMLTextAreaElement>){
        setText(event.target.value)
    }
    function genHtml(){
        return {__html: text.replaceAll("\n","<br/>")}
    }
    return (
        <div>
            <p>Form elem demo</p>
            <textarea value={text} onChange={handleChange}></textarea>
            <p dangerouslySetInnerHTML={genHtml()}></p>
        </div>
    );
};

export default FormElemsDemo;