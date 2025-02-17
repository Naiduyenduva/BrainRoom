"use client"
import axios from "axios"
import { useState } from "react"

export default function SignUp () {
    const [username, setUsername] = useState("");
    const [password, setPaassword] = useState("");
    const [email, setEmail] = useState("");


    async function handleSubmit () {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup",{
                username,
                email,
                password
            }) 
            alert("created")
            console.log(response.data,"dya")
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="grid w-28 p-10 gap-2 text-black">
            <h1 className="text-center text-2xl text-white">Signin</h1>
            <input placeholder="username" className="p-1 rounded-xl" onChange={(e)=> {setUsername(e.target.value)}} />
            <input placeholder="email" className="p-1 rounded-xl" onChange={(e)=> {setEmail(e.target.value)}} />
            <input placeholder="password" className="p-1 rounded-xl" onChange={(e)=> {setPaassword(e.target.value)}} />
            <button className="bg-blue-700 p-2 rounded-xl text-white" onClick={handleSubmit}>Signin</button>
        </div>
    )
}