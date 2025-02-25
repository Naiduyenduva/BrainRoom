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
        <div className="p-10 h-screen">
            <h1 className="mb-5 font-bold text-3xl">Available Tests</h1>
            <h1 className="mb-5 text-xl text-gray-400">Choose from our selection of professional exams to test and certify your skills.</h1>
            <div className="flex gap-10">

            {
                tests.map((test)=> (
                    <div className="w-60 h-fit border border-purple-700 rounded-lg p-3 pb-3 grid shadow-2xl" key={test.id}>
                        <div>
                            <h1 className="font-bold mb-3 text-purple-400 text-xl">{test.title}</h1>
                            <p className="text-gray-600 mb-2">{test.description}</p>
                            <h2 className="text-gray-400">Difficulty : {test.difficulty}</h2>
                        </div>
                        <button className="bg-purple-600 w-full rounded-lg h-8 mt-5">Start</button>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Tests
