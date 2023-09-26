import {FC} from 'react';
import {Button, Space, Tooltip} from "antd";
import {BlockOutlined, CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {
    changeComponentHidden,
    copySelectedComponent, pasteComponent,
    removeSelectedComponent,
    toggleComponentLocked
} from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo.ts";

const EditToolbar: FC = () => {
    const dispatch = useDispatch()
    const {selectedId, selectedComponent, copiedComponent} = useGetComponentInfo()
    const {isLocked} = selectedComponent || {}

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
        </Space>
    );
};

export default EditToolbar;