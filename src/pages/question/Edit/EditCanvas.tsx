import {FC} from 'react';
import styles from './EditCanvas.module.scss'
// import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/Component.tsx";
// import QuestionInput from "../../../components/QuestionComponents/QuestionInput/Component.tsx";
import {Spin} from "antd";
import classNames from "classnames";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo.ts";
import {changeSelectedId, ComponentInfoType, moveComponent} from "../../../store/componentsReducer";
import {getComponentConfByType} from "../../../components/QuestionComponents";
import {useDispatch} from "react-redux";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress.ts";
import SortableContainer from "../../../components/DragSortable/SortableContainer.tsx";
import SortableItem from "../../../components/DragSortable/SortableItem.tsx";

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
    function handleClick(event:MouseEvent,id:string){
        event.stopPropagation()//阻止冒泡
        dispatch(changeSelectedId(id))
    }

    useBindCanvasKeyPress()

    if(loading){
        return <div style={{textAlign:'center',marginTop:'20px'}}>
            <Spin/>
        </div>
    }
    const componentListWithId = componentList.map(c=>{
        return {...c,id:c.fe_id}
    })
    function handleDragEnd(oldIndex:number,newIndex:number){
        dispatch(moveComponent({oldIndex,newIndex}))
    }

    return (
        <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
            <div className={styles.canvas}>
                {componentList.filter(c=>!c.isHidden).map(c => {
                    const {fe_id,isLocked} = c
                    //拼接classname
                    const wrapperDefaultClassName = styles['component-wrapper']
                    const selectedClassName = styles.selected
                    const lockedClassName = styles.locked
                    const wrapperClassName = classNames({
                        [wrapperDefaultClassName]:true,
                        [selectedClassName]:fe_id===selectedId,
                        [lockedClassName]: isLocked
                    })
                    return <SortableItem id={fe_id}>
                        <div key={fe_id} className={wrapperClassName} onClick={(e)=>{
                            handleClick(e,fe_id)
                        }}>
                            <div className={styles.component}>
                                {getComponent(c)}
                            </div>
                        </div>
                    </SortableItem>

                })}
            </div>
        </SortableContainer>

    );
};

export default EditCanvas;