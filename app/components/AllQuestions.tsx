"use client"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import { setQuestions } from "../redux/isTrueSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AllQuestions = () => {
    const testId = useAppSelector((state:any) => state.isTrue.testId);
    const questionsArray = useAppSelector((state:any) => state.isTrue.questions);
    const [answers, setAnswers] = useState<{questionId:string,selectedOption:number}[]>([]);
    const dispatch = useAppDispatch();
    const [ count, setCount ] = useState();
    const {data: session} = useSession();
    const userId = session?.user.id;
    const router = useRouter();

    
    async function handleQuestions () {
        try {
            const response = await axios.post("http://localhost:3000/api/exams/allmcqs",{
                testId,
            })
            const questions = response.data;
            console.log(questions)
            dispatch(setQuestions(questions.questions));
            setCount(questions.count)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        handleQuestions();
    },[testId])

    function handleanswer (questionId:string, selectedOption:number) {
        setAnswers((prevAnswers)=> {
            const existingAnswerIndex = prevAnswers.findIndex((ans) => ans.questionId === questionId);

            if (existingAnswerIndex !== -1) {
                // Update existing answer
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[existingAnswerIndex] = { questionId, selectedOption};
                return updatedAnswers;
              } else {
                // Add new answer
                return [...prevAnswers, { questionId, selectedOption }];
              }
            })
        }

    async function handleSubmit () {
        try {
            const response = await axios.post("http://localhost:3000/api/exams/attemptSubmit",{
                userId,
                testId,
                answers
            })
            router.push("/client/result")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        {
            count==0 ? <h1>no questions found</h1> : <QuestionCard onAnswer={handleanswer} onSubmit={handleSubmit} timeRemaining={1800} questionsArray={questionsArray} />
        }  
    </div>
  )
}

export default AllQuestions