import {FC, useRef} from 'react';
import styles from './StatHeader.module.scss'
import {Button, Input, InputRef, message, Popover, QRCode, Space, Tooltip, Typography} from "antd";
import {CopyOutlined, LeftOutlined, QrcodeOutlined} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import useGetPageInfo from "../../../hooks/useGetPageInfo.ts";

const {Title} = Typography
const StatHeader: FC = () => {
    const nav = useNavigate()
    const {id} = useParams()
    const {title, isPublished} = useGetPageInfo()
    const urlInputRef = useRef<InputRef>(null)

    function handleCopy() {
        const elem = urlInputRef.current
        if (elem === null) return
        elem.select()
        document.execCommand("copy")
        message.success("拷贝成功")
    }

    function genLinkAndQRCode() {
        if (!isPublished) return null
        // 拼接C端url
        const url = `http://127.0.0.1:3000/question/${id}`
        const QRCodeElem = <div style={{textAlign: 'center'}}>
            <QRCode value={url} size={150}/>
        </div>
        return <Space>
            <Input value={url} style={{width: '300px'}} ref={urlInputRef}/>
            <Tooltip title="拷贝链接">
                <Button icon={<CopyOutlined/>} onClick={handleCopy}></Button>
            </Tooltip>
            <Popover content={QRCodeElem}>
                <Button icon={<QrcodeOutlined/>}></Button>
            </Popover>
         </Space>
    }

    return (
        <div className={styles['header-wrapper']}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Space>
                        <Button type="link" icon={<LeftOutlined/>} onClick={() => {
                            nav(-1)
                        }}>返回</Button>
                        <Title>{title}</Title>
                    </Space>
                </div>
                <div className={styles.main}>
                    {genLinkAndQRCode()}
                </div>
                <div className={styles.right}>
                    <Button type="primary" onClick={() => {
                        nav(`/question/edit/${id}`)
                    }}>编辑问卷</Button>
                </div>
            </div>
        </div>
    );
};

export default StatHeader;