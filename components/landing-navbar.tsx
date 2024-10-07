"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";


const font = Montserrat({
    weight:"600",
    subsets:["latin"]
});

export const LandingNavbar=()=>{
    const {isSignedIn} =useAuth();

    return(
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link href={"/"} className="flex iems-center">
                <div className="relative h-8 w-8 mr-4" >
                    <Image fill src="/logo.png"  alt="logo" />
                </div>
                <h1 className={cn("text-2xl font-bold text-white",font.className)}>
                    VAST AI
                </h1>
            </Link>
            <div className="flex-items-center gap-x-2">
                <Link href={isSignedIn?"/dashboard":"/sign-up"}>
                <Button variant={"outline"} className="rounded-full">
                    Get Started
                </Button>
                </Link>

            </div>

        </nav>
    )
}