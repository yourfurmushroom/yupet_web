import React from "react";

export interface ButtonConfig
{
    type:string;
    name:string;
    actionFunction:any;
    className:string;
    disabled:boolean
}

export interface UserAccountAction
{
    sendMessage: (flag: string, props: any) => void 
    setLogin:React.Dispatch<React.SetStateAction<boolean>>;
    setRegister:React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserStatus
{
    isLogin:boolean;
    isRegister:boolean;
}

export interface UserLoginConfig
{
    userName:string;
    userPassword:string;
    userRemember:boolean;
    setUserName:React.Dispatch<React.SetStateAction<string>>;
    setUserPassword:React.Dispatch<React.SetStateAction<string>>;
    setUserRemember:React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserRegeisterConfig
{
    userName:string;
    userPassword:string;
    userComfirm:boolean;
    userCheckPassword:string;
    userEmail:string;
    petName:string;
    petType:string;
    setEmail:React.Dispatch<React.SetStateAction<string>>;
    setUserName:React.Dispatch<React.SetStateAction<string>>;
    setUserPassword:React.Dispatch<React.SetStateAction<string>>;
    setUserComfirm:React.Dispatch<React.SetStateAction<boolean>>;
    setUserCheckPassword:React.Dispatch<React.SetStateAction<string>>;
    setPetName:React.Dispatch<React.SetStateAction<string>>;
    setPetType:React.Dispatch<React.SetStateAction<string>>;
}

export interface wsAction
{
    sendMessage:any,
    receivedMessage:any
}

export interface LoginStatus
{
    isUserLogin?:boolean,
    setUserLogin?:React.Dispatch<React.SetStateAction<boolean>>;
    setLogin?:React.Dispatch<React.SetStateAction<boolean>>;
    setRegister?:React.Dispatch<React.SetStateAction<boolean>>;
    setShowWeb?:any;
    userName?:string;
}

export interface DashboardSelection
{
    currentSelect:string;
    setSelect:React.Dispatch<React.SetStateAction<string>>;
}

export interface RemotePetStatus
{
    showAddPet:boolean,
    setShowAddPet:React.Dispatch<React.SetStateAction<boolean>>,
    sendMessage:any,
    userName?:string
}

export interface PetData{
    

    petQuantity:Number,
    petList:string[],
    analysisList:string[],
    setPetQuantity:React.Dispatch<React.SetStateAction<number>>,
    setPetList:React.Dispatch<React.SetStateAction<string[]>>,
    setAnalysisList:React.Dispatch<React.SetStateAction<string[]>>,
}

export interface ECGInformation{
    ecgData:number[],
    setEcgData:React.Dispatch<React.SetStateAction<number[]>>
}