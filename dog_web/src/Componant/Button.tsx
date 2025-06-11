import { ReactCompilerOptions } from "next/dist/server/config-shared"
import React from "react"
import { ButtonConfig } from "./Interface"


export default function Button({type,name,actionFunction,className,disabled}:ButtonConfig)
{
    if(type ==="hyperLink")
    {
        return(
            <>
            <button disabled={disabled} className={className} onClick={(e)=>actionFunction(e)}>{name}
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-orange-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </button>

            </>
        )
    }
    else if (type==="action")
    {
        return(
            <>
            <button disabled={disabled} className={className} onClick={()=>actionFunction((prev:any) => !prev)}>{name}
            </button>
            </>
        )
    }
}