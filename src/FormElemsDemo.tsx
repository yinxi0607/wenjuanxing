import {ChangeEvent, FC, useState} from 'react';

const FormElemsDemo: FC = () => {
    // const [text,setText] = useState<string>("hello")
    // const [gender,setGender] = useState("male")
    // const [checked,setChecked] = useState(false)
    // function handleChangeGender(event: ChangeEvent<HTMLInputElement>){
    //     setGender(event.target.value)
    // }
    // function handleChange(event: ChangeEvent<HTMLTextAreaElement>){
    //     setText(event.target.value)
    // }
    // function genHtml(){
    //     return {__html: text.replaceAll("\n","<br/>")}
    // }
    // function toggleChecked(){
    //     setChecked(!checked)
    // }

    // const [selectedCityList, setSelectedCityList] = useState<string[]>([])
    // function handleCityChange(event: ChangeEvent<HTMLInputElement>){
    //     // const {checked,value} = event.target
    //     // if(checked){
    //     //     setSelectedCityList([...selectedCityList,value])
    //     // }else{
    //     //     setSelectedCityList(selectedCityList.filter(item => item !== value))
    //     // }
    //
    //     const city = event.target.value
    //     if (selectedCityList.includes(city)) {
    //         setSelectedCityList(selectedCityList.filter(item => item !== city))
    //     }else{
    //         setSelectedCityList([...selectedCityList,city])
    //     }
    // }

    const [lang,setLang] = useState('js')
    function handleLangChange(event: ChangeEvent<HTMLSelectElement>){
        setLang(event.target.value)
    }


    return (
        <div>
            <p>Form elem demo</p>
            {/*<textarea value={text} onChange={handleChange}></textarea>*/}
            {/*<p dangerouslySetInnerHTML={genHtml()}></p>*/}
            {/*<label htmlFor="radio1">男</label>*/}
            {/*<input type="radio" id="radio1" name="gender" value="male" onChange={handleChangeGender} checked={gender==='male'}/>*/}
            {/*<label htmlFor="radio2">女</label>*/}
            {/*<input type="radio" id="radio2" name="gender"  value="female" onChange={handleChangeGender} checked={gender==='female'}/>*/}
            {/*<button onClick={()=>console.log(gender)}>Print</button>*/}

            {/*<label htmlFor="checkbox1">选中</label>*/}
            {/*<input type="checkbox" id="checkbox1" checked={checked} onChange={toggleChecked}/>*/}
            {/*{checked && <p>选中了</p>}*/}

            {/*<label htmlFor="checkbox1">北京</label>*/}
            {/*<input type="checkbox" id="checkbox1" value="beijing" checked={selectedCityList.includes('beijing')} onChange={handleCityChange}/>*/}
            {/*<label htmlFor="checkbox2">上海</label>*/}
            {/*<input type="checkbox" id="checkbox2" value="shanghai" checked={selectedCityList.includes('shanghai')} onChange={handleCityChange}/>*/}
            {/*<label htmlFor="checkbox3">深圳</label>*/}
            {/*<input type="checkbox" id="checkbox3" value="shenzhen" checked={selectedCityList.includes('shenzhen')} onChange={handleCityChange}/>*/}
            {/*<p>选中了{JSON.stringify(selectedCityList)}</p>*/}
            {/*<input type="hidden" name="cities" value={JSON.stringify(selectedCityList)}/>*/}

            <select value={lang} onChange={handleLangChange}>
                <option value="js">JavaScript</option>
                <option value="ts">TypeScript</option>
                <option value="java">Java</option>
            </select>

        </div>
    );
};

export default FormElemsDemo;