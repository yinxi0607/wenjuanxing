import React, {FC} from 'react';
import {Link, useNavigate} from "react-router-dom";

const Home: FC = () => {
    const nav = useNavigate()
    function clickHandler(){
        nav("/login")
    }
    return (
        <div>
            <p>Home</p>
            <div>
                <button onClick={clickHandler}>登录</button>
                <Link to="/register">注册</Link>

            </div>
        </div>
    );
};

export default Home;