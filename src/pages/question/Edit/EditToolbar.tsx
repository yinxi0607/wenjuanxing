import {FC} from 'react';
import {Button, Space, Tooltip} from "antd";
import {
    BlockOutlined,
    CopyOutlined,
    DeleteOutlined, DownOutlined,
    EyeInvisibleOutlined,
    LockOutlined, RedoOutlined, UndoOutlined,
    UpOutlined
} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {
    changeComponentHidden,
    copySelectedComponent, moveComponent, pasteComponent,
    removeSelectedComponent,
    toggleComponentLocked
} from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo.ts";
import { ActionCreators as UndoActionCreators } from 'redux-undo';

const EditToolbar: FC = () => {
    const dispatch = useDispatch()
    const {selectedId,componentList, selectedComponent, copiedComponent} = useGetComponentInfo()
    const {isLocked} = selectedComponent || {}
    const length = componentList.length
    const selectedIndex = componentList.findIndex(c=> c.fe_id===selectedId)
    const isFirst = selectedIndex<=0
    const isLast = selectedIndex+1 >=length
    function handleDelete() {
        dispatch(removeSelectedComponent())
    }

    function handleHidden() {
        dispatch(changeComponentHidden({fe_id: selectedId, isHidden: true}))
    }

    function handleLock() {
        dispatch(toggleComponentLocked({fe_id: selectedId}))
    }

    function handleCopy() {
        dispatch(copySelectedComponent())
    }

    function handlePaste() {
        dispatch(pasteComponent())
    }

    function handleMoveUp(){
        if(isFirst) return
        dispatch(moveComponent({oldIndex:selectedIndex,newIndex:selectedIndex-1}))
    }

    function handleMoveDown(){
        if(isLast) return
        dispatch(moveComponent({oldIndex:selectedIndex,newIndex:selectedIndex+1}))
    }

    function handleUndo(){
        dispatch(UndoActionCreators.undo())
    }

    function handleRedo(){
        dispatch(UndoActionCreators.redo())
    }

    return (
        <Space>
            <Tooltip title="删除">
                <Button shape="circle" icon={<DeleteOutlined/>} onClick={handleDelete}></Button>
            </Tooltip>
            <Tooltip title="隐藏">
                <Button shape="circle" icon={<EyeInvisibleOutlined/>} onClick={handleHidden}></Button>
            </Tooltip>
            <Tooltip title="锁定">
                <Button shape="circle" icon={<LockOutlined/>} onClick={handleLock}
                        type={isLocked ? "primary" : "default"}></Button>
            </Tooltip>
            <Tooltip title="复制">
                <Button shape="circle" icon={<CopyOutlined/>} onClick={handleCopy}></Button>
            </Tooltip>
            <Tooltip title="粘贴">
                <Button shape="circle" icon={<BlockOutlined/>} onClick={handlePaste}
                        disabled={copiedComponent == null}></Button>
            </Tooltip>
            <Tooltip title="上移">
                <Button shape="circle" icon={<UpOutlined/>} onClick={handleMoveUp} disabled={isFirst}
                ></Button>
            </Tooltip>
            <Tooltip title="下移">
                <Button shape="circle" icon={<DownOutlined/>} onClick={handleMoveDown} disabled={isLast}
                        ></Button>
            </Tooltip>
            <Tooltip title="撤销">
                <Button shape="circle" icon={<UndoOutlined/>} onClick={handleUndo} disabled={isFirst}
                ></Button>
            </Tooltip>
            <Tooltip title="重做">
                <Button shape="circle" icon={<RedoOutlined/>} onClick={handleRedo} disabled={isFirst}
                ></Button>
            </Tooltip>
        </Space>
    );
};

export default EditToolbar;