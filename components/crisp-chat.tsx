"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"


export const CrispChat = () => {
    useEffect(()=>{
        Crisp.configure("e2cc13d1-1c79-4294-9765-ea55278be1a0")
    },[]);

    return null;
}