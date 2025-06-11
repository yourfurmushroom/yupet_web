'use client'
import React, { useEffect, useState } from "react";
import NavBar from "@/Componant/NavBar";
import { setLazyProp } from "next/dist/server/api-utils";
import { PetData, UserAccountAction, UserLoginConfig, UserRegeisterConfig, UserStatus } from "@/Componant/Interface";
import Button from "@/Componant/Button";
import LoginArea, { RegisterArea } from "@/Componant/InputArea";
import MainArea from "@/app/MainArea";
import ContactUs from "./ContactUs";
import Services from "./Services";
import { LoginStatus } from "@/Componant/Interface";
import Dashboard from "./Dashboard";
import Footer from "@/Componant/Footer";
import Cookies from 'js-cookie';
import { sha256 } from '../Componant/Utilities'



export default function Yupet({ token }: { token?: string }) {

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setConnectStatus] = useState(false)
  const [isUserLogin, setUserLogin] = useState<boolean>(false);
  const [showLogin, setLogin] = useState<boolean>(false)
  const [showRegister, setRegister] = useState<boolean>(false)
  const [checkWeb, setWeb] = useState<string>("Main")
  const [userName, setUserName] = useState("")
  const [showAddPet, setShowAddPet] = useState<boolean>(false)
  const [petQuantity,setPetQuantity]=useState<number>(0)
  const [petList,setPetList]=useState<string[]>([])
  const [analysisList,setAnalysisList]=useState<string[]>([])

  const petData:PetData={
    petQuantity:petQuantity,
    petList:petList,
    analysisList:analysisList,
    setPetQuantity:setPetQuantity,
    setPetList:setPetList,
    setAnalysisList:setAnalysisList,
  }


  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        setUserLogin(true)
        setUserName(parsedToken.userName)
        sendMessage('login', {
          userName: parsedToken.userName,
          userPassword: sha256(parsedToken.userPassword),
        });
      } catch (e) {
        console.error('Invalid token JSON:', e);
      }
    }
  }, [ws]);

  const logoutHandle = () => {
    setUserLogin(false)
    Cookies.remove('token', { path: '/' });
  }

  useEffect(() => {
    // 建立 WebSocket 連線
    const socket = new WebSocket("ws://192.168.50.98:8888");

    socket.onopen = () => {
      console.log("WebSocket connected");
      setWs(socket);
      setConnectStatus(true)
    };

    socket.onmessage = (event) => {
      try {
        var data = JSON.parse(event.data)
        HandleMessage(data)

      } catch (error) {
        console.log("Error parsing WebSocket message:", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setWs(null);
      setConnectStatus(false)
      //todo：navbar顯示斷開連線
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectStatus(false)
    };

    return () => {
      socket.close();
    };
  }, []);

  const setShowWeb = (args: string) => {
    setWeb(args)
  }

  function HandleMessage(data: any) {
    console.log(data)
    switch (data['responseType']) {
      case "login":
        {
          if (data['status']) {
            console.log(data['analysisList'])
            setRegister(false)
            setLogin(false)
            setWeb("Main")
            setUserName(data['name'])
            setUserLogin(true)
            setPetQuantity(Number(data['quantity']))
            setPetList(data["petList"])
          }
          else {
            alert(data["message"])
          }
          break
        }

      case "register":
        {
          setRegister(false)
          setLogin(false)
          setWeb("Main")
          setUserName("")
          setUserLogin(false)
          alert(data["message"])

          break
        }

      case "addpet":
        {
          alert(data["message"])
          setShowAddPet(false)
          break
        }
      case "checkpetquantity":
        {
          setPetQuantity(Number(data['quantity']))
          setPetList(data["petList"])
          setAnalysisList(JSON.parse(data["analysisList"]))
          console.log(JSON.parse(data["analysisList"]))
          break
        }
      
      default:
        {

        }
    }

  }

  function renderContent() {

    const loginStatus: LoginStatus = {
      isUserLogin: isUserLogin,
      setUserLogin: setUserLogin,
      setLogin: setLogin,
      setRegister: setRegister,
      setShowWeb: setShowWeb,
      userName: userName
    }

    switch (checkWeb) {
      case 'Main':
        return <MainArea {...loginStatus} />;
      case 'AboutMe':
        window.location.href = "https://www.yutechealth.com/";
        return null
      case 'Services':
        return <Services {...loginStatus}></Services>
      case 'ContectUs':
        return <ContactUs sendMessage={(flag: string, args: any) => sendMessage(flag, args)}></ContactUs>
      case 'Dashboard':
        return <Dashboard {...loginStatus} petData={petData} showAddPet={showAddPet} setShowAddPet={setShowAddPet} sendMessage={(flag: string, args: any) => sendMessage(flag, args)}></Dashboard>
      default:
        return <div>Please select a page</div>;
    }
  }
  const sendMessage = async (flag: string, args: any) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const payload = { action: flag, ...args };
      ws.send(JSON.stringify(payload));
      console.log(payload)
    } else {
      console.error("WebSocket 尚未連線");
    }
  };

  return (

    <div className="bg-gray-200">
      {(showLogin || showRegister) && <UserAccountInteract sendMessage={(flag, args) => sendMessage(flag, args)} setLogin={setLogin} setRegister={setRegister} isLogin={showLogin} isRegister={showRegister} />}
      {(showLogin || showRegister) && <div className="fixed inset-0 bg-gray-300 bg-opacity-20 z-20"></div>}
      <NavBar sendMessage={(flag, args) => sendMessage(flag, args)} setLogin={setLogin} setRegister={setRegister} setShowWeb={(e: string) => setShowWeb(e)} isUserLogin={isUserLogin} logoutHandle={() => logoutHandle()}></NavBar>
      {
        renderContent()
      }
      <Footer></Footer>
    </div>
  );
}



function UserAccountInteract({ sendMessage, setLogin, setRegister, isLogin, isRegister }: UserAccountAction & UserStatus) {
  return (
    <div className="absolute top-1/2 left-1/2 w-[45%] h-10/12 bg-white z-50 transform -translate-x-1/2 -translate-y-1/2 rounded-4xl shadow-2xs">
      {isLogin && <LoginField sendMessage={(flag, args) => sendMessage(flag, args)} setLogin={setLogin} setRegister={setRegister}></LoginField>}
      {isRegister && <RegisterField sendMessage={(flag, args) => sendMessage(flag, args)} setLogin={setLogin} setRegister={setRegister}></RegisterField>}
    </div>
  )
}

function LoginField({ sendMessage, setLogin, setRegister }: UserAccountAction) {

  const [userName, setUserName] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userRemember, setUserRemember] = useState<boolean>(false)

  useEffect(() => {
    console.log("trigger user remember")
  }, [userRemember])

  const loginConfig: UserLoginConfig & UserAccountAction = {
    sendMessage: sendMessage,
    userName: userName,
    userPassword: userPassword,
    userRemember: userRemember,
    setUserName: setUserName,
    setUserPassword: setUserPassword,
    setUserRemember: setUserRemember,
    setLogin: setLogin,
    setRegister: setRegister
  }

  useEffect(() => {
    if (userRemember) {
      Cookies.set('token', JSON.stringify({ userName, userPassword }), {
        expires: 7, // 7天過期
        path: '/',   // 設定路徑為根目錄
        secure: process.env.NODE_ENV === 'production', // 只在生產環境中使用 secure cookie
        sameSite: 'Strict', // 防止 CSRF 攻擊
      });
    }
    else {
      Cookies.remove('token', { path: '/' });
    }
  }
    , [userRemember])


  return (
    <div>
      <div className="flex justify-end m-5">
        <Button disabled={false} type="action" name="x" actionFunction={setLogin} className=" absolute font-bold text-3xl" />
      </div>
      <div className="w-[100%]">
        <LoginArea {...loginConfig}></LoginArea>
      </div>
    </div>
  )
}

function RegisterField({ sendMessage, setLogin, setRegister }: UserAccountAction) {

  const [userName, setUserName] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userEmail, setEmail] = useState("")
  const [userCheckPassword, setUserCheckPassword] = useState("")
  const [petName, setPetName] = useState("")
  const [petType, setPetType] = useState("")
  const [userComfirm, setUserComfirm] = useState<boolean>(false)

  useEffect(() => {
    console.log("trigger user remember")
  }, [userComfirm])

  const registerConfig: UserRegeisterConfig & UserAccountAction = {
    sendMessage: sendMessage,
    userName: userName,
    userPassword: userPassword,
    userComfirm: userComfirm,
    userCheckPassword: userCheckPassword,
    userEmail: userEmail,
    petName: petName,
    setPetName: setPetName,
    petType: petType,
    setPetType: setPetType,
    setEmail: setEmail,
    setUserCheckPassword: setUserCheckPassword,
    setUserName: setUserName,
    setUserPassword: setUserPassword,
    setUserComfirm: setUserComfirm,
    setLogin: setLogin,
    setRegister: setRegister,
  }

  return (
    <div>
      <div className="flex justify-end m-5">
        <Button disabled={false} type="action" name="x" actionFunction={setRegister} className=" absolute font-bold text-3xl" />
      </div>
      <div className="w-[100%]">
        <RegisterArea {...registerConfig}></RegisterArea>
      </div>
    </div>
  )
}