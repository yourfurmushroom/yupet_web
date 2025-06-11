'use client'
import Image from "next/image";
import Button from "./Button"
import React, { useEffect, useState } from "react";
import { UserAccountAction } from "./Interface";



export default function NavBar({setLogin,setRegister,setShowWeb,isUserLogin,logoutHandle}:UserAccountAction&{setShowWeb:any,isUserLogin:boolean,logoutHandle:any})
{

    return(
        <nav className=" h-16 bg-white shadow">
            <div className="w-[85%] flex justify-between items-center mx-auto">
                <div className="inline-block my-auto">
                    <img className="relative inline-block w-14 h-14 rounded-full border-blue-500 border-2" src="/YuDisplay.png" alt="" />
                    <h1 className=" inline-block font-bold text-blue-500 text-4xl">Yupet</h1>
                </div>
                <div className="inline-block">
                    <Button disabled={false} name="Home" actionFunction={()=>setShowWeb("Main")} type="hyperLink" className=" m-2 text-blue-500 font-bold group relative inline-block rounded-2xl h-12 w-20 hover:text-orange-400 bg-white transition-all duration-300 ease-in-out"></Button>
                    <Button disabled={false} name="About Us" actionFunction={()=>setShowWeb("AboutMe")} type="hyperLink" className="m-2 text-blue-500 font-bold group relative inline-block rounded-2xl h-12 w-20 hover:text-orange-400 bg-white transition-all duration-300 ease-in-out"></Button>
                    <Button disabled={false} name="Services" actionFunction={()=>setShowWeb("Services")} type="hyperLink" className="m-2 text-blue-500 font-bold group relative inline-block rounded-2xl h-12 w-20 hover:text-orange-400 bg-white transition-all duration-300 ease-in-out"></Button>
                    <Button disabled={false} name="ContactUs" actionFunction={()=>setShowWeb("ContectUs")} type="hyperLink" className="m-2 text-blue-500 font-bold group relative inline-block rounded-2xl h-12 w-20 hover:text-orange-400 bg-white transition-all duration-300 ease-in-out"></Button>
                    {isUserLogin&&<Button disabled={false} name="Dashboard" actionFunction={()=>setShowWeb("Dashboard")} type="action" className="m-2 border-2 bg-blue-500 text-white font-bold group relative inline-block rounded-2xl h-12 w-20 hover:bg-blue-600 hover:scale-110"></Button>}
                    {isUserLogin&&<Button disabled={false} name="Logout" actionFunction={()=>logoutHandle()} type="action" className="m-2 border-2 bg-blue-500 text-white font-bold group relative inline-block rounded-2xl h-12 w-20 hover:bg-blue-600 hover:scale-110"></Button>}
                    {!isUserLogin&&<Button disabled={false} name="Login" actionFunction={setLogin} type="action" className="m-2 border-2 bg-blue-500 text-white font-bold group relative inline-block rounded-2xl h-12 w-20 hover:bg-blue-600 hover:scale-110"></Button>}
                    {!isUserLogin&&<Button disabled={false} name="Register" actionFunction={setRegister} type="action" className="m-2 border-2 bg-blue-500 text-white font-bold group relative inline-block rounded-2xl h-12 w-20 hover:bg-blue-600 hover:scale-110"></Button>}

                </div>
            </div>
        </nav>
    )
}

