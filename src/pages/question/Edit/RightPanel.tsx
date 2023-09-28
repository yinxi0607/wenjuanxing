import {FC, useEffect, useState} from 'react';
import {FileTextOutlined, SettingOutlined} from "@ant-design/icons";
import {Tabs} from "antd";
import ComponentProps from "./ComponentProps.tsx";
import PageSetting from "./PageSetting.tsx";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo.ts";

enum TAB_KEYS {
    PROP_KEY= 'prop',
    SETTING_KEY= 'setting'
}

const RightPanel: FC = () => {
    const [activeKey,setActiveKey] = useState(TAB_KEYS.PROP_KEY)
    const {selectedId} =useGetComponentInfo()
    useEffect(() => {
        if(selectedId) setActiveKey(TAB_KEYS.PROP_KEY)
        else setActiveKey(TAB_KEYS.SETTING_KEY)
    }, [selectedId]);
    const tabsItems = [
        {
            key:TAB_KEYS.PROP_KEY,
            label: (
                <span>
                    <FileTextOutlined/>
                    属性
                </span>
            ),
            children:<ComponentProps/>
        },
        {
            key:TAB_KEYS.SETTING_KEY,
            label: (
                <span>
                    <SettingOutlined/>
                    页面设置
                </span>
            ),
            children:<PageSetting/>
        }
    ]
    return (
        <Tabs activeKey={activeKey} items={tabsItems}>

        </Tabs>
    );
};

export default RightPanel;