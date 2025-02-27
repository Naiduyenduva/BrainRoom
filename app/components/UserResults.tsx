"use client"
import axios from 'axios'
import React, { useEffect } from 'react'

const UserResults = () => {
  
  async function handleResults () {
    const response = await axios.get("")
  }
  useEffect(()=> {
    
  },[])
  return (
    <div className='p-10'>
      <h1 className="mb-5 font-bold text-3xl">Results</h1>
      <div className='grid grid-cols-3 gap-5'>
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
      </div>
    </div>
  )
}

function ResultCard () {
  return (
    <div className='w-76 h-fit p-5 rounded-lg border border-purple-600'>
      <h1 className='text-purple-600 font-semibold text-xl'>Verbal Ability</h1>
      <h1>Questions attempted</h1>
      <h1>Correct answers</h1>
      <h1>Score: 2</h1>
    </div>
  )
}

export default UserResults;