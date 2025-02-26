"use client"
import { useRouter } from "next/navigation"
const Landing = () => {
  const router = useRouter();

  function handleExplore () {
      router.push("/client/dashboard")
      console.log("clicked")
  }

  return (
    <div className="grid justify-center pt-40">
      <h1 className="font-bold text-5xl text-center">Brain Room</h1>
      <h1 className="text-2xl text-gray-400 text-center mt-5">Practice for Group-D Exam with our knowledgeful tests</h1>
      <div className="flex justify-around mt-5 mx-20 gap-5">
        <button className="bg-gray-800 p-2 px-4 rounded-xl w-60">Start</button>
        <button className="bg-gray-800 p-2 px-4 rounded-xl w-60" onClick={handleExplore}>Explore Tests</button>
      </div>
    </div>
  )
}

export default Landing