"use client"
import axios from "axios"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CircleCheck } from "lucide-react"

  function SignUp () {
    const {toast} = useToast();
    const [username, setUsername] = useState("");
    const [password, setPaassword] = useState("");
    const [email, setEmail] = useState("");
    const [success,setSuccess] = useState(false);
    const router = useRouter();

    async function handleSubmit () {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup",{
                username,
                email,
                password
            }) 
            toast({
                action: <CircleCheck />,
                title: "Signed up successfully",
                className: "text-green-500"
              })
            setSuccess(true)
            router.push("/api/auth/signin");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            { success}
            <div className="grid p-2 gap-2 text-black justify-center text-white pt-40">
                <h1 className="text-center text-2xl text-hite">Signup</h1>
                <Input placeholder="username" className="w-96" onChange={(e)=> {setUsername(e.target.value)}} />
                <Input placeholder="email" onChange={(e)=> {setEmail(e.target.value)}} />
                <Input placeholder="password" onChange={(e)=> {setPaassword(e.target.value)}} />
                <Button className="bg-purple-600 p-2 rounded-lg" onClick={handleSubmit}>Signin</Button>
            </div>
        
        </div>
    )
}
export default SignUp;