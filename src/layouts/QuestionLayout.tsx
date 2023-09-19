import React, {FC} from 'react';
import {Outlet} from "react-router-dom";
import useLoadUserData from "../hooks/useLoadUserData.ts";
import {Spin} from "antd";
import useNavPage from "../hooks/useNavPage.ts";

const QuestionLayout: FC = () => {
    const {waitingUserData} = useLoadUserData()
    useNavPage(waitingUserData)
    return (
        <>
            <p>Question Layout</p>
            <div>
                {waitingUserData ?(
                    <div style={{textAlign:'center',marginTop:'60px'}}><Spin/></div>
                ) :<Outlet/>}

            </div>
        </>
    );
};

export default QuestionLayout;