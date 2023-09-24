import {FC} from 'react';
import {FileTextOutlined, SettingOutlined} from "@ant-design/icons";
import {Tabs} from "antd";
import ComponentProps from "./ComponentProps.tsx";

const RightPanel: FC = () => {
    const tabsItems = [
        {
            key:'prop',
            label: (
                <span>
                    <FileTextOutlined/>
                    属性
                </span>
            ),
            children:<ComponentProps/>
        },
        {
            key:'setting',
            label: (
                <span>
                    <SettingOutlined/>
                    页面设置
                </span>
            ),
            children:<div>页面设置</div>
        }
    ]
    return (
        <Tabs defaultActiveKey="prop" items={tabsItems}>

        </Tabs>
    );
};

export default RightPanel;