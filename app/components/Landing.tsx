"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import {motion} from "framer-motion"
import { BellDot } from "lucide-react";

const Landing = () => {
  const router = useRouter();

  function handleExplore () {
      router.push("/client/dashboard")
  }

  return (
    <div>
      <section className="pt-2 flex justify-end gap-2 pr-5">
        <Button onClick={()=>router.push("/client/signup")} className="bg-purple-500">Signup</Button>
        <Button onClick={()=>router.push("/client/signin")}>SignIn</Button>
      </section>
      <div className="grid justify-center sm:pt-32 pt-20">
        <div className="flex justify-center">
          <h1 className="border rounded-full w-fit p-1 text-xs">Test your knowledge</h1>
        </div>
      <h2 className="grid justify-center text-6xl font-bold mb-2 leading-tight">
            Master Your Skills with
            <span className="text-purple-600 ml-40"> Brain Room</span>
      </h2>
        <h1 className="text-xl sm:text-2xl text-gray-400 text-center">Practice for Group-D Exam with our knowledgeful tests</h1>
        <div className="sm:flex grid justify-around mt-5 mx-20 gap-5">
          <motion.div
          whileTap={{scale:0.9}}
          >
            <Button className="bg-purple-600 p-2 px-4 rounded-xl w-60 h-12">Start</Button>
          </motion.div>
          <motion.div
          whileTap={{scale:0.9}}
          >
            <Button className="bg-gray-800 p-2 px-4 rounded-xl w-60 h-12" onClick={handleExplore}>Explore Tests</Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Landing