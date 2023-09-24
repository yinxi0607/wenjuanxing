import {FC} from 'react';
import {AppstoreOutlined, BarsOutlined} from "@ant-design/icons";
import {Tabs} from "antd";
import ComponentLibs from "./ComponentLibs.tsx";

const LeftPanel: FC = () => {
    const tabsItems = [
        {
            key:'componentLibs',
            label: (
                <span>
                    <AppstoreOutlined/>
                    组件库
                </span>
            ),
            children: <ComponentLibs/>
        },
        {
            key: 'layers',
            label: (
                <span>
                    <BarsOutlined/>
                    图层
                </span>
            ),
            children: <div>图层</div>
        }
    ]
    return <Tabs defaultActiveKey="componentLibs" items={tabsItems}/>
};

export default LeftPanel;