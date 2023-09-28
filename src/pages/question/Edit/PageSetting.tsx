import {FC, useEffect} from 'react';
import useGetPageInfo from "../../../hooks/useGetPageInfo.ts";
import {Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {resetPageInfo} from "../../../store/pageInfoReducer.ts";
const {TextArea} = Input
const PageSetting: FC = () => {
    const pageInfo = useGetPageInfo()
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    useEffect(() => {
        form.setFieldsValue(pageInfo)
    }, [pageInfo]);
    function handleValuesChange(){
        dispatch(resetPageInfo(form.getFieldsValue()))
    }
    return (
        <Form
            layout="vertical"
            form={form}
            initialValues={pageInfo}
            onValuesChange={handleValuesChange}
        >
            <Form.Item label="问卷标题" name="title" rules={[{required: true,message:"标题不得为空。。。"}]}>
                <Input placeholder="请输入标题"/>
            </Form.Item>
            <Form.Item label="问卷描述" name="desc">
                <TextArea placeholder="问卷描述"/>
            </Form.Item>
            <Form.Item label="样式代码" name="css">
                <TextArea placeholder="请输入CSS样式代码"/>
            </Form.Item>
            <Form.Item label="脚本代码" name="js">
                <TextArea placeholder="请输入JS脚本代码"/>
            </Form.Item>
        </Form>
    );
};

export default PageSetting;