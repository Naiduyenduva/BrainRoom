"use client"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react";
import { useState } from "react"
import { Button } from "@/components/ui/button";

const Signin = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const onSubmit = async () => {
        await signIn("credentials",{
            email: email,
            password: password,
            redirect: true,
            callbackUrl: "/client/dashboard"
        })
    }

    return (
        <div className="grid gap-2 p-5 justify-center pt-40">
            <h1 className="text-center text-2xl text-hite">Login</h1>
            <Input placeholder="Email" className="w-72 sm:w-96" onChange={(e)=>setEmail(e.target.value)} />
            <Input placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <Button className="bg-purple-600 p-2 rounded-lg" onClick={onSubmit}>Login</Button>
        </div>
    )
}

export default Signin