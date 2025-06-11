import { useEffect, useState } from "react";
import Button from "./Button";
import { UserAccountAction, UserLoginConfig, UserRegeisterConfig } from "./Interface";
import ShowTermDetail from "./term";
import { ShowPrivacyDetail } from "./privacy";
import {sha256} from "./Utilities"

export default function LoginArea({ ...loginConfig }: UserLoginConfig & UserAccountAction) {

    const loginArgs={
        userName:loginConfig.userName,
        userPassword:sha256(loginConfig.userPassword),
    }
    return (
        <>
        {window.scrollTo({ top: 0, behavior: 'smooth' })}
            <div className=" w-[100%] inline-block text-center ">
                <img className="relative w-20 h-20 mx-auto mt-0 pt-0 mb-5 rounded-full border-blue-500 border-2" src="/YuDisplay.png" alt="" />
                <span className=" font-extrabold text-2xl inline-block w-[100%]">Log in to your account</span>
                <span className=" text-[18px] inline-block w-[100%]">Welcome back! Please log in to your account to access all features of the Yupet platform.</span>
            </div>
            <div className="w-[100%] inline-block mx-5 mt-10">
                <div className="mb-5 ">
                    <label>
                        <span className=" text-[18px] font-bold">
                            User Name
                        </span>
                        <div className="flex items-center border rounded px-3 py-2 w-[95%] mt-3">
                            <span className="material-icons text-gray-400 mr-2 "><i className="fas fa-user" ></i></span>
                            <input
                                type="text"
                                placeholder="User Name"
                                className="outline-none w-full"
                                value={loginConfig.userName}
                                onChange={(e) => loginConfig.setUserName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                </div>
                <div className="mb-5 ">
                    <label >
                        <span className=" text-[18px] font-bold">
                            Password
                        </span>
                        <div className="flex items-center border rounded px-3 py-2 w-[95%] mt-3">
                            <span className="material-icons text-gray-400 mr-2 "><i className="fas fa-lock" ></i></span>
                            <input
                                type="password"
                                placeholder="Password"
                                className="outline-none w-full"
                                value={loginConfig.userPassword}
                                onChange={(e) => loginConfig.setUserPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                </div>
                <div className="mb-5 ">
                    <label className="inline-flex items-center text-sm text-gray-700">
                        <input type="checkbox" className="mr-2" onChange={() => loginConfig.setUserRemember(prev => !prev)} /> 記住我
                    </label>
                </div>
            </div>
            <div className="mb-30 w-[100%] flex justify-center">
                <Button disabled={false} type="action" name="Login" actionFunction={()=>loginConfig.sendMessage("login",loginArgs)} className=" rounded-3xl w-[80%] h-[50px] bg-blue-500 hover:bg-blue-300 text-white font-bold text-center text-[20px] duration-300 ease-in-out"></Button>
            </div>
            <hr className="w-[80%] h-[1px] border-gray-300 m-auto" />
            <div className="w-[100%] m-auto text-center text-[20px] mt-10 ">
                <span>
                    Don’t have an account yet?
                </span>
                <span className="text-blue-400 hover:text-blue-300 ml-[3px]" onClick={() => SwitchLoginRegister(loginConfig.setLogin, loginConfig.setRegister)}>
                    Register now
                </span>
            </div>
        </>
    )
}

export function RegisterArea({ ...registerConfig }: UserRegeisterConfig & UserAccountAction) {

    const [showTerm, setTerm] = useState<boolean>(false)
    const [showPrivacy, setPrivacy] = useState<boolean>(false)
    const [isCheck,setIsCheck]= useState<boolean>(false)

    const[isSame,setIsSame]=useState(false)

    useEffect(()=>{
        if(registerConfig.userPassword !==registerConfig.userCheckPassword)
        {
            setIsSame(false)
        }
        else{
            setIsSame(true)
        }
    },[registerConfig.userPassword,registerConfig.userCheckPassword])

    useEffect(()=>{
        if(registerConfig.userComfirm)
        {
            setIsCheck(true)
        }
        else{
            setIsCheck(false)
        }
    },[registerConfig.userComfirm])

    const registerArgs={
        userName:registerConfig.userName,
        userPassword:sha256(registerConfig.userPassword),
        userEmail:registerConfig.userEmail,
    }

    return (
        <>
        {window.scrollTo({ top: 0, behavior: 'smooth' })}
            <div className=" w-[100%] inline-block text-center ">
                <img className="relative w-20 h-20 mx-auto mt-0 pt-0 mb-5 rounded-full border-blue-500 border-2" src="/YuDisplay.png" alt="" />
                <span className=" font-extrabold text-2xl inline-block w-[100%]">Create your account</span>
                <span className=" text-[18px] inline-block w-[100%]">Join the Yupet platform and start monitoring your pet’s heart health.</span>
            </div>
            <div className="w-[100%] inline-block mx-5 mt-10 text-center">
                <div className="mb-5 w-[45%] inline-block">
                    <label>
                        <span className=" text-[18px] font-bold">
                            User Name
                        </span>
                        <div className="flex items-center border rounded px-3 py-2 w-[95%] mt-3">
                            <span className="material-icons text-gray-400 mr-2 "><i className="fas fa-user" ></i></span>
                            <input
                                type="text"
                                placeholder="User"
                                className="outline-none w-full"
                                value={registerConfig.userName}
                                onChange={(e) => registerConfig.setUserName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                </div>
                <div className="mb-5 w-[45%] inline-block">
                    <label>
                        <span className=" text-[18px] font-bold">
                            E-mail
                        </span>
                        <div className="flex items-center border rounded px-3 py-2 w-[95%] mt-3">
                            <span className="material-icons text-gray-400 mr-2 "><i className="fas fa-envelope" ></i></span>
                            <input
                                type="email"
                                placeholder="insert Email"
                                className="outline-none w-full"
                                value={registerConfig.userEmail}
                                onChange={(e) => registerConfig.setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                </div>

                <div className="mb-5 w-[45%] inline-block ">
                    <label >
                        <span className=" text-[18px] font-bold">
                            Password
                        </span>
                        <div className={`flex items-center border rounded px-3 py-2 w-[95%] mt-3 ${isSame? "":"border-2 border-red-700"}`}>
                            <span className="material-icons text-gray-400 mr-2 "><i className="fas fa-lock" ></i></span>
                            <input
                                type="password"
                                placeholder="password"
                                className="outline-none w-full"
                                value={registerConfig.userPassword}
                                onChange={(e) => registerConfig.setUserPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                </div>

                <div className="mb-5 w-[45%] inline-block">
                    <label >
                        <span className=" text-[18px] font-bold">
                            Re-enter password
                        </span>
                        <div className={`flex items-center border rounded px-3 py-2 w-[95%] mt-3 ${isSame? "":"border-2 border-red-700"}`}>
                            <span className="material-icons text-gray-400 mr-2 "><i className="fas fa-lock" ></i></span>
                            <input
                                type="password"
                                placeholder="Re-enter password"
                                className='outline-none w-full'
                                value={registerConfig.userCheckPassword}
                                onChange={(e) => registerConfig.setUserCheckPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                </div>
                

                <div className="mb-5 ">
                    <label className="inline-flex items-center text-sm text-gray-700">
                        <input type="checkbox" className="mr-2" onChange={() => registerConfig.setUserComfirm(prev => !prev)} /> I have read and agree to
                    </label>
                    <span className="text-blue-400 hover:text-blue-300 ml-[3px]" onClick={()=>setTerm(prev=>!prev)}>
                        Terms of Service
                    </span>
                    {showTerm && <ShowTermDetail setTerm={setTerm}></ShowTermDetail>}
                    and
                    <span className="text-blue-400 hover:text-blue-300 ml-[3px]" onClick={()=>setPrivacy(prev=>!prev)}>
                        Privacy Policy
                    </span>
                    {showPrivacy && <ShowPrivacyDetail setPrivacy={setPrivacy}></ShowPrivacyDetail>}
                </div>
            </div>
            <div className="mb-30 w-[100%] flex justify-center">
                <Button type="action" name="Register" actionFunction={()=>registerConfig.sendMessage("register",registerArgs) } disabled={!isCheck ||!isSame} className={`${isCheck&&isSame ? "":" disabled:opacity-50 disabled:cursor-not-allowed"} rounded-3xl w-[80%] h-[50px] bg-blue-500 hover:bg-blue-300 text-white font-bold text-center text-[20px] duration-300 ease-in-out`}></Button>
            </div>
            <hr className="w-[80%] h-[1px] border-gray-300 m-auto" />
            <div className="w-[100%] m-auto text-center text-[20px] mt-10 ">
                <span>
                    Already have an account?
                </span>
                <span className="text-blue-400 hover:text-blue-300 ml-[3px]" onClick={() => SwitchLoginRegister(registerConfig.setLogin, registerConfig.setRegister)}>
                    Log in now
                </span>
            </div>
        </>
    )
}

function SwitchLoginRegister(setLogin: React.Dispatch<React.SetStateAction<boolean>>, setRegister: React.Dispatch<React.SetStateAction<boolean>>) {
    setLogin(prev => !prev)
    setRegister(prev => !prev)
}


