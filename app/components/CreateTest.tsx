"use client"
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"

 const CreateTest = () => {
    const {toast} = useToast();
    const [ category, setcategory ] = useState("");
    const [ difficulty, setDifficulty ] = useState("");
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");

    const handleSubmit = async () => {
       const response = await axios.post("http://localhost:3000/api/admin/createtest",{
        category,
        difficulty,
        title,
        description
       })
       toast({
        title: "test created successfully"
       })
       console.log(response.data)
    }

    return <div className="grid justify-center items-center">
        <h1 className="text-center font-bold mt-10 text-2xl">Adding Test</h1>
        <div className="grid gap-2 w-96 mb-4 mt-4">
            <Input placeholder="catogery" className="p-1 rounded-lg" onChange={(e)=>{setcategory(e.target.value)}} />
            <Input placeholder="difficulty" className="p-1 rounded-lg" onChange={(e)=>{setDifficulty(e.target.value)}} />
            <Input placeholder="title" className="p-1 rounded-lg" onChange={(e)=>{setTitle(e.target.value)}} />
            <Input placeholder="description" className="p-1 rounded-lg" onChange={(e)=>{setDescription(e.target.value)}} />
        </div>
        <button className="bg-purple-600 p-1 h-8 rounded-xl text-white" onClick={handleSubmit}>CreateTest</button>
    </div>
}

export default CreateTest;