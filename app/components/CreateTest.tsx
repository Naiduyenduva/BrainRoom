"use client"
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast"


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

    return <div>
        <h1>Adding Test</h1>
        <input placeholder="catogery" className="p-1 rounded-xl" onChange={(e)=> {setcategory(e.target.value)}} />
        <input placeholder="difficulty" className="p-1 rounded-xl" onChange={(e)=> {setDifficulty(e.target.value)}} />
        <input placeholder="title" className="p-1 rounded-xl" onChange={(e)=> {setTitle(e.target.value)}} />
        <input placeholder="description" className="p-1 rounded-xl" onChange={(e)=> {setDescription(e.target.value)}} />
        <button className="bg-blue-700 p-2 rounded-xl text-white" onClick={handleSubmit}>CreateTest</button>
    </div>
}

export default CreateTest;