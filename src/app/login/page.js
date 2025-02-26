"use client"

import React, { useState } from "react";
import FormLogin from "../../components/auth/FormLogin";

export default function Auth({userLogin}) {
    const [isLogin, setIsLogin]=useState(true);
    const [logged, setLogged ]= useState(false)

    const handleIsLogin=()=>{
        setIsLogin(!isLogin);
    }

    const handleErrorLogin =()=>{
        setLogged(!logged)
        setTimeout(()=>{
            setLogged(false)
        },5000)
    }

    return (
        <div className="flex flex-wrap min-h-screen w-full content-center justify-center py-10 bg-gray-300">
            <div className="w-2/4 h-5/6 flex justify-center border-2 rounded-md  md:shadow-2xl md:shadow-stone-500 bg-gray-200">
                <FormLogin handleIsLogin={handleIsLogin} userLogin={userLogin} handleErrorLogin={handleErrorLogin}/>
            </div>
        </div>
    )
}