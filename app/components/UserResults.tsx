"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calculator } from "lucide-react"

const UserResults = () => {
  const {data: session} = useSession();
  const [resultsData, setResultsData] = useState([]);

  async function handleResults () {
    try {
      const userId = session?.user.id;
        const response = await axios.post("/api/exams/results",{
          userId
        })  
        const results = response.data.results;
        setResultsData(results);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    handleResults();
  },[])

  return (
    <div className='p-10'>
      <div className='grid sm:grid-cols-3 gap-5'>
        <ResultCard data={resultsData} />
      </div>
    </div>
  )
}

function ResultCard ({data}:any) {
  if (!data || data.length === 0) return <p>No results found</p>;

  const result = data[0];
  const title = result?.test?.title;

  const percentage = ((result.score) / (result.totalQuestions)) * 100
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg text-white bg-black border border-purple-600">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Test Results</CardTitle>
          <div className="bg-primary/10 p-2 rounded-full">
            <Calculator className="h-5 w-5 text-primary" color='white' />
          </div>
        </div>
        <CardDescription className='text-purple-600'>{title}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Score</span>
              <span className="font-medium">{result.score} points</span>
            </div>
            <Progress value={percentage} color='bg-white' className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/10 rounded-lg p-3">
              <div className="text-3xl font-bold">{result.totalQuestions}</div>
              <div className="text-xs text-muted-foreground mt-1">Questions Attempted</div>
            </div>
            <div className="bg-muted/10 rounded-lg p-3">
              <div className="text-3xl font-bold">{result.score}</div>
              <div className="text-xs text-muted-foreground mt-1">Correct Answers</div>
            </div>
          </div>
          <div className="pt-2">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-200">Accuracy</div>
              <div className="text-sm font-medium">{Math.round(percentage)}%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserResults;