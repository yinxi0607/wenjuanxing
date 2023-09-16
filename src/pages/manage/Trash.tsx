import {FC, useState} from 'react';
import {useTitle} from "ahooks";
import styles from "./common.module.scss";
import {Button, Empty,Space, Spin, Table, Tag, Typography} from "antd";
// import {ExclamationCircleOutlined} from "@ant-design/icons";
import ListSearch from "../../components/ListSearch.tsx";
import useLoadQueestionListData from "../../hooks/useLoadQuestionListData.ts";
import ListPage from "../../components/ListPage.tsx";

// const {confirm} = Modal
const {Title} = Typography

const Trash: FC = () => {
    useTitle("尹曦问卷 - 回收站")
    const {data={},loading} = useLoadQueestionListData({isDeleted: true})
    const {list={},total=0} = data
    const [selectedIds,setSelectedIds] = useState<string[]>([])
    const tableColumns = [
        {title: '标题', dataIndex: 'title', key: 'title'},
        {
            title: '是否发布', dataIndex: 'isPublished', key: 'isPublished', render: (isPublished: boolean) => {
                return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
            }
        },
        {title: '答卷', dataIndex: 'answerCount', key: 'answerCount'},
        {title: '创建时间', dataIndex: 'createdAt', key: 'createdAt'},

    ]
    // function del(){
    //     confirm({
    //         title: '确定彻底删除选中问卷吗？',
    //         icon: <ExclamationCircleOutlined/>,
    //         content: '删除以后不可恢复',
    //         onOk: () => message.success('删除成功'),
    //
    //     })
    // }
    const TableElem = (
        <>
            <div style={{marginBottom:'16px'}}>
                <Space>
                    <Button type="primary" disabled={selectedIds.length===0}>恢复</Button>
                    <Button danger={true} disabled={selectedIds.length===0}>彻底删除</Button>
                </Space>
            </div>

            <Table
                dataSource={list}
                columns={tableColumns}
                pagination={false}
                rowKey={q => q._id}
                rowSelection={
                    {
                        type: 'checkbox',
                        onChange: selectedRowKeys => {
                            // console.log(`selectedRowKeys: ${selectedRowKeys}`);
                            setSelectedIds(selectedRowKeys as string[])
                        }
                    }
                }

            />
        </>
    )
    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>回收站</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch/>
                </div>
            </div>
            <div className={styles.content}>
                {loading && <div style={{textAlign: 'center'}}><Spin/></div>}
                {!loading && list.length === 0 && <Empty description="暂无数据。。。"/>}

                {list.length > 0 && TableElem }
            </div>
            <div className={styles.footer}>
                <ListPage total={total}/>
            </div>
        </>
    );
};

export default Trash;