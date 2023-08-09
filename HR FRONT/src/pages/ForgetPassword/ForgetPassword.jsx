import React from 'react'
import { Link } from 'react-router-dom'
import "../Login/loginStyles.scss"
import { ForgetPasswordLogic } from './ForgetPasswordLogic'

const ForgetPassword = () => {

    const {
        email,
        setEmail,
        sendEmailHandler,
    } = ForgetPasswordLogic()

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
                <div className="rounded-3xl w-full xl:w-[55%] sm:w-[90%] bg-white p-5 md:p-11 flex flex-col drop-shadow-lg gap-5 m-auto">
                    <div className="cardTitle text-3xl font-bold">Set Profile Password</div>
                    <div className="cardText">
                        Enter your email ID to reset password
                    </div>
                    <div className="border rounded-md p-1 md:my-7 my-5 ">
                        <div className="inputLabel">Email Address</div>
                        <input type="email" placeholder="name@sample.com" value={email} onChange={(e) => { setEmail(e.target.value) }} className='w-full' />
                    </div>
                    <div className="flex flex-col">
                        <button className="loginBtn py-2 rounded-md" onClick={sendEmailHandler}>Send Email</button>
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
    )
}

export default ForgetPassword