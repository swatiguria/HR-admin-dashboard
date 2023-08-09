import React from "react";
import "./loginStyles.scss";
import { Link } from "react-router-dom";
import { LoginLogic } from "./loginLogic";

const Login = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        loginHandler,
        setRemember,
        btnRef
    } = LoginLogic()
    return (
        <section className="flex w-full justify-center items-center h-screen">
            {/* left */}
            <div className="ideas hidden sm:flex flex-col justify-between h-[100%]  w-2/5 p-10 ">
                <div>
                    <div className="text-3xl font-bold text-white"><span className="hrColor">hr</span>ad.</div>
                    <div className="dashboardText pt-3">HR Admin Dasboard <br /> for employees</div>
                </div>
                <div>
                    <div className="ideasText text-5xl font-bold mb-10">Ideas to <br />business.</div>
                    <hr className="w-[20%] pb-10" />
                </div>
            </div>
            {/* right */}
            <div className="loginBg p-5 h-[100%] w-full sm:w-3/5 flex flex-col justify-between">
                {/* login card */}
                <div className=" rounded-3xl w-full xl:w-[55%] sm:w-[90%] bg-white p-4 md:p-10 flex flex-col drop-shadow-lg gap-5 m-auto">
                    <div className="cardTitle text-3xl font-bold">Login</div>
                    <div className="cardText">
                        Login your account to employees dashboard
                    </div>
                    <div className="border rounded-md p-1">
                        <div className="inputLabel">Email Address</div>
                        <input type="email" className="w-full" placeholder="name@sample.com" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="border rounded-md p-1">
                        <div className="inputLabel">Password</div>
                        <div className="flex justify-between pe-3">
                            <input type="password" className="w-2/3" placeholder="**************" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <Link to="/forget-password" className="cardText forgetPass">
                                Forget Password?
                            </Link>
                        </div>
                    </div>
                    <div>
                        <input type="checkbox" className="check" id="rememberMe" defaultChecked={localStorage.getItem("rememberMe") ? true : false} onChange={(e) => { setRemember(e.target.checked) }} />
                        <label htmlFor="rememberMe" className="cardText remember ps-2">
                            Remember Me
                        </label>
                    </div>
                    <div className="flex flex-col">
                        <button className="loginBtn py-2 rounded-md" onClick={loginHandler} ref={btnRef}>Login</button>
                    </div>
                </div>
                {/* footer */}
                <div className="footer flex justify-between flex-col sm:flex-row items-center text-center">
                    <div><span className="hradText font-extrabolder">HRAD |</span>   2023  © Copyrights  All Rights Reserved</div>
                    <div className="flex gap-3">
                        <Link to="#">Policy </Link>
                        |
                        <Link to="#">T & C</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;

