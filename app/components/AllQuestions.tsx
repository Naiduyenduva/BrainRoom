"use client"

import axios from "axios"
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import { setQuestions } from "../redux/isTrueSlice";

const AllQuestions = () => {
    const testId = useAppSelector((state:any) => state.isTrue.testId);
    const questionsArray = useAppSelector((state:any) => state.isTrue.questions);
    const dispatch = useAppDispatch();
    const [ count, setCount ] = useState();

    function handleanswer () {
        
    }
    
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
  return (
    <div>
        {
            count==0 ? <h1>no questions found</h1> : <QuestionCard onAnswer={handleanswer} timeRemaining={1800} questionsArray={questionsArray} />
        }  
    </div>
  )
}

export default AllQuestions