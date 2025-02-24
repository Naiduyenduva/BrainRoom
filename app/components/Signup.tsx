"use client"
import axios from "axios"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"


export default function SignUp () {
    const {toast} = useToast();
    const [username, setUsername] = useState("");
    const [password, setPaassword] = useState("");
    const [email, setEmail] = useState("");
    const [success,setSuccess] = useState(false);


    async function handleSubmit () {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup",{
                username,
                email,
                password
            }) 
            toast({
                title: "Signed up successfully",
                className: "text-green-500"
              })
            setSuccess(true)
            console.log(response.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            { success}
            <div className="grid w-28 p-10 gap-2 text-black">
                <h1 className="text-center text-2xl text-white">Signin</h1>
                <input placeholder="username" className="p-1 rounded-xl" onChange={(e)=> {setUsername(e.target.value)}} />
                <input placeholder="email" className="p-1 rounded-xl" onChange={(e)=> {setEmail(e.target.value)}} />
                <input placeholder="password" className="p-1 rounded-xl" onChange={(e)=> {setPaassword(e.target.value)}} />
                <button className="bg-blue-700 p-2 rounded-xl text-white" onClick={handleSubmit}>Signin</button>
            </div>
        
        </div>
    )
}