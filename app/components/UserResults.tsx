"use client"
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calculator } from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { setIsTrue } from '../redux/isTrueSlice'
import { useDispatch, UseDispatch } from 'react-redux'

interface Result {
  score: number;
  totalQuestions: number;
  test: {
    title: string;
  };
}

const UserResults = () => {
  const {data: session, status} = useSession();
  const [resultsData, setResultsData] = useState([]);
  const {toast} = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

   const handleResults = useCallback(async () => {
      if(!session?.user?.id) {
        toast({title:"Please signin to see results"})
        dispatch(setIsTrue(true))
        router.push("/")
        return;
      }
    try {
        const userId = session?.user?.id;
        if(!userId) {
          return
        }
        const response = await axios.post("/api/exams/results",{
          userId
        })  
        const results = response.data.results;
        setResultsData(results);
    } catch (error) {
      console.log(error)
    }
  },[session?.user?.id])

  useEffect(()=> {
    handleResults();
  },[handleResults])

  return (
    <div className='p-10'>
      <div className='grid sm:grid-cols-3 gap-5'>
        <ResultCard data={resultsData} />
      </div>
    </div>
  )
}

function ResultCard ({data}:{ data: Result[] }) {
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