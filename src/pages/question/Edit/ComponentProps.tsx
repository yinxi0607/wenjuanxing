import {FC} from 'react';
import useGetComponentInfo from "../../../hooks/useGetComponentInfo.ts";
import {getComponentConfByType} from "../../../components/QuestionComponents";

const NoProp: FC = () => {
    return <div style={{textAlign: 'center'}}>未选中组件</div>
}
const ComponentProps: FC = () => {
    const {selectedComponent} = useGetComponentInfo()
    if (selectedComponent == null) return <NoProp/>
    const {type,props} = selectedComponent
    const componentConf = getComponentConfByType(type)
    if (componentConf==null) return <NoProp/>
    const {PropComponent} = componentConf
    return (
        <PropComponent {...props}/>
    );
};

export default ComponentProps;