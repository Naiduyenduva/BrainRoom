"use client"
import axios from "axios";
import { useEffect, useState } from "react"

interface TestProps {
    id:number,
    category: string,
    difficulty: string,
    title: string,
    description: string
}

 const Tests = () => {
    const [ tests, setTests ] = useState<TestProps[]>([]);

    
    async function handleTests () {
        try {
            const response = await axios.get("http://localhost:3000/api/exams");
            const Testdata = await response.data;
            console.log(Testdata)
            setTests(Testdata.tests)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        handleTests();
    },[])
    return (
        <div className="p-10 bg-black h-screen text-white">
            <h1 className="text-center mb-5 font-bold text-3xl">All Tests</h1>
            <div className="flex gap-10">

            {
                tests.map((test)=> (
                    <div className="w-60 h-72 border border-white rounded-lg p-3 pb-0 grid gap-20 shadow-xl" key={test.id}>
                        <div>
                            <h1 className="font-bold mb-3 text-purple-400 text-xl">{test.title}</h1>
                            <p className="text-gray-600 mb-2">{test.description}</p>
                            <h2 className="text-gray-400">Difficulty : {test.difficulty}</h2>
                        </div>
                        <button className="bg-purple-600 w-full rounded-lg h-10 text-white">Start</button>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Tests
