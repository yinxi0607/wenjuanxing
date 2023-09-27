import {FC, useEffect} from 'react';
import {QuestionTitlePropsType} from "./interface.ts";
import {Checkbox, Form, Input, Select} from "antd";

const PropComponent: FC<QuestionTitlePropsType> = (props:QuestionTitlePropsType) => {
    const {text,level,isCenter,onChange,disabled} = props
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({text,level,isCenter})
    }, [text,level,isCenter]);
    function handleValuesChange(){
        if(onChange){
            onChange(form.getFieldsValue())
        }
    }
    return (
        <Form
            layout="vertical"
            initialValues={{text,level,isCenter}}
            form={form}
            onValuesChange={handleValuesChange}
            disabled={disabled}
        >
            <Form.Item label="标题内容" name="text" rules={[{required:true,message:"请输入标题"}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="层级" name="level">
                <Select options={[
                    {value:1,text:1},
                    {value:2,text:2},
                    {value:3,text:3}
                ]}></Select>
            </Form.Item>
            <Form.Item name="isCenter" valuePropName="checked">
                <Checkbox>居中显示</Checkbox>
            </Form.Item>
        </Form>
    );
};

export default PropComponent;