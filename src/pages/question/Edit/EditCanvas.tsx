import {FC} from 'react';
import styles from './EditCanvas.module.scss'
// import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/Component.tsx";
// import QuestionInput from "../../../components/QuestionComponents/QuestionInput/Component.tsx";
import {Spin} from "antd";
import classNames from "classnames";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo.ts";
import {changeSelectedId, ComponentInfoType} from "../../../store/componentsReducer";
import {getComponentConfByType} from "../../../components/QuestionComponents";
import {useDispatch} from "react-redux";

type PropsType = {
    loading: boolean
}
function getComponent(componentInfo: ComponentInfoType){
    const {type,props} = componentInfo
    const componentConf = getComponentConfByType(type)
    if (componentConf==null) return null
    const {Component} = componentConf
    return <Component {...props}/>
}

const EditCanvas: FC<PropsType> = ({loading}) => {
    const {componentList,selectedId} = useGetComponentInfo()
    const dispatch = useDispatch()
    function handleClick(id:string){
        dispatch(changeSelectedId(id))
    }

    if(loading){
        return <div style={{textAlign:'center',marginTop:'20px'}}>
            <Spin/>
        </div>
    }
    return (
        <div className={styles.canvas}>
            {/*<div className={styles['component-wrapper']}>*/}
            {/*    <div className={styles.component}>*/}
            {/*        <QuestionTitle/>*/}
            {/*    </div>*/}

            {/*</div>*/}
            {/*<div className={styles['component-wrapper']}>*/}
            {/*    <div className={styles.component}>*/}
            {/*        <QuestionInput/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {componentList.map(c => {
                const {fe_id} = c
                //拼接classname
                const wrapperDefaultClassName = styles['component-wrapper']
                const selectedClassName = styles.selected
                const wrapperClassName = classNames({
                    [wrapperDefaultClassName]:true,
                    [selectedClassName]:fe_id===selectedId
                })
                return <div key={fe_id} className={wrapperClassName} onClick={()=>{
                    handleClick(fe_id)
                }}>
                    <div className={styles.component}>
                        {getComponent(c)}
                    </div>
                </div>
            })}
        </div>
    );
};

export default EditCanvas;