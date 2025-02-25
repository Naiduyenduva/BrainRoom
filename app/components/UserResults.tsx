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
    </div>
  )
}

export default UserResults;