"use client"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react";
import { useState } from "react"

const page = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const onSubmit = async () => {
        const result = await signIn("credentials",{
            email: email,
            password: password,
            redirect: true,
            callbackUrl: "/client/dashboard"
        })
    }
  return (
    <div className="grid gap-2 p-5 justify-center">
        <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <Input placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        <button className="bg-purple-600 p-2 rounded-lg" onClick={onSubmit}>Login</button>
    </div>
  )
}

export default page;