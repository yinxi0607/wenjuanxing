import {FC} from 'react';
import {componentConfGroup, ComponentConfType} from "../../../components/QuestionComponents";
import {Typography} from "antd";
import styles from "./ComponentLibs.module.scss"
import {useDispatch} from "react-redux";
import {addComponents} from "../../../store/componentsReducer";
import {nanoid} from "@reduxjs/toolkit";

const {Title} = Typography

function genComponent(c:ComponentConfType){
    const {title,type,Component,defaultProps} = c
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(addComponents({
            fe_id: nanoid(),
            title,
            type,
            props:defaultProps
        }))
    }
    return <div key={type} className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
            <Component/>
        </div>
    </div>
}
const ComponentLibs: FC = () => {
    return (
        <>
            {
                componentConfGroup.map((group,index)=>{
                    const {groupName,groupId,components} = group
                    return <div key={groupId}>
                        <Title level={3} style={{fontSize:'16px',marginTop: index>0?'20px':'0px'}}>{groupName}</Title>
                        <div>
                            {components.map((c)=>{
                                return genComponent(c)
                            })}
                        </div>
                    </div>
                })
            }
        </>
    );
};

export default ComponentLibs;