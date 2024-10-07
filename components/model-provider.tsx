"use client";

import { useState,useEffect } from "react";
import { ProModel } from "./proModel";

export const ModelProvider = () =>{
    const [isMounted,setIsMounted] = useState(false)
    useEffect(()=>{
        setIsMounted(true)
    },[]);

    if(!isMounted){
        return null;
    }
    return(
        <>
        <ProModel/>
        </>
    )
}