"use client"
import axios from "axios";
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDispatch } from "react-redux";
import { setTestId } from "../redux/isTrueSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { CircleCheck } from 'lucide-react';


interface TestProps {
    id:number,
    category: string,
    difficulty: string,
    title: string,
    description: string
}

 const Tests = () => {
    const [ tests, setTests ] = useState<TestProps[]>([]);
    const [ err, setErr ] = useState("");

    const getDifficultyColor = (difficulty:string) => {
        switch (difficulty) {
          case "Easy":
            return "bg-green-100 text-green-800 hover:bg-green-100"
          case "Medium":
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          case "Hard":
            return "bg-red-100 text-red-800 hover:bg-red-100"
          default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100"
        }
      }

    async function handleTests () {
        try {
            const response = await axios.get("http://localhost:3000/api/exams");
            const Testdata = await response.data;
            setTests(Testdata.tests)
        } catch (error) {
          setErr(err)
        }
    }

    useEffect(()=> {
        handleTests();
    },[])

    return (
        <div className="p-10 h-screen">
            <h1 className="mb-5 font-bold text-3xl">Available Tests</h1>
            <h1 className="mb-5 text-xl text-gray-400">Choose from our selection of professional exams to test and certify your skills.</h1>
            <div className="flex flex-wrap gap-10">
            {
                tests.map((test)=> (
                    <TestCard key={test.id} test={test} getDifficultyColor={getDifficultyColor} />
                ))
            }
            </div>
        </div>
    )
}

  function TestCard({ test, getDifficultyColor }:any) {
    const dispatch = useDispatch();
    const router = useRouter();
    const {data: session} = useSession();
    const userId = session?.user.id
    const {toast} = useToast();
    
    async function handleAttempt(id:string) {
      try {
        const testId = id
        const response = await axios.post("http://localhost:3000/api/exams/attemptsStart",{
          userId,
          testId
        })
        dispatch(setTestId(id))
        toast({action: <CircleCheck color="green" />,title:"Attempt Started"})
        router.push("/client/mcq")
      } catch (error) {
        console.log(error)
      }
    }
    return (
      <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md bg-black border border-purple-600">
        <CardHeader>
          <div className="flex justify-between items-start mb-3">
            <CardTitle className=" text-white">{test.title}</CardTitle>
            <Badge className={`${getDifficultyColor(test.difficulty)} font-medium`}>{test.difficulty}</Badge>
          </div>
          <CardDescription className="line-clamp-2">{test.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Duration: 60 mins</span>
            <span>•</span>
            <span>Questions: 50</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="font-bold text-lg text-white">Free</span>
          <Button className="bg-purple-600" onClick={()=> {handleAttempt(test.id)}}>Take Test</Button>
        </CardFooter>
      </Card>
    )
  }

export default Tests;
