import {ChangeEvent, FC, useState} from 'react';
import styles from './Layers.module.scss'
import {useDispatch} from "react-redux";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo.ts";
import {Button, Input, message, Space} from "antd";
import {
    changeComponentHidden,
    changeComponentTitle,
    changeSelectedId, moveComponent,
    toggleComponentLocked
} from "../../../store/componentsReducer";
import classNames from "classnames";
import {EyeInvisibleOutlined, LockOutlined} from "@ant-design/icons";
import SortableContainer from "../../../components/DragSortable/SortableContainer.tsx";
import SortableItem from "../../../components/DragSortable/SortableItem.tsx";

const Layers: FC = () => {
    const dispatch = useDispatch()
    const {componentList,selectedId} = useGetComponentInfo()
    const [changingTitleId,setChangingTitleId] = useState('')
    function handleTitleClick(fe_id: string){
        const curComp = componentList.find((c)=>c.fe_id===fe_id)
        if(curComp && curComp.isHidden){
            message.info("不能选中隐藏的组件")
            return
        }
        if(fe_id!==selectedId){
            dispatch(changeSelectedId(fe_id))
            setChangingTitleId('')
            return
        }
        setChangingTitleId(fe_id)
    }

    function handleChangeTitle(event: ChangeEvent<HTMLInputElement>){
        const newTitle = event.target.value.trim()
        if(!newTitle) return
        if(!selectedId) return;
        dispatch(changeComponentTitle({fe_id:selectedId,title:newTitle}))
    }

    function handleChangeHidden(fe_id:string,isHidden:boolean){
        dispatch(changeComponentHidden({fe_id,isHidden}))
    }
    function handleChangeLocked(fe_id:string){
        dispatch(toggleComponentLocked({fe_id}))
    }
    const componentListWithId = componentList.map(c=>{
        return {...c,id:c.fe_id}
    })
    function handleDragEnd(oldIndex:number,newIndex:number){
        dispatch(moveComponent({oldIndex,newIndex}))
    }
    return (
        <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
            {componentList.map((c)=>{
                const {fe_id,isHidden,isLocked,title} = c
                // 拼接title的classname
                const titleDefaultClassName = styles.title
                const selectedClassName = styles.selected
                const titleClassName = classNames({
                    [titleDefaultClassName]:true,
                    [selectedClassName]:fe_id===selectedId
                })
                return (
                    <SortableItem key={fe_id} id={fe_id}>
                        <div className={styles.wrapper}>
                            <div className={titleClassName} onClick={()=>handleTitleClick(fe_id)}>
                                {fe_id===changingTitleId && <Input
                                    value={title}
                                    onChange={handleChangeTitle}
                                    onPressEnter={()=>setChangingTitleId(" ")} //点击回车键时，
                                    onBlur={()=>setChangingTitleId("")} // 失焦的时候
                                />}
                                {fe_id!==changingTitleId && title}
                            </div>
                            <div className={styles.handler}>
                                <Space>
                                    <Button
                                        size="small"
                                        shape="circle"
                                        className={!isHidden?styles.btn:""}
                                        icon={<EyeInvisibleOutlined/>}
                                        type={isHidden?"primary":"default"}
                                        onClick={()=>handleChangeHidden(fe_id,!isHidden)}
                                    />
                                    <Button
                                        size="small"
                                        shape="circle"
                                        className={!isLocked?styles.btn:""}
                                        icon={<LockOutlined/>}
                                        type={isLocked?"primary":"default"}
                                        onClick={()=>handleChangeLocked(fe_id)}
                                    />
                                </Space>
                            </div>

                        </div>
                    </SortableItem>

                )
            })}
            
        </SortableContainer>
    );
};

export default Layers;