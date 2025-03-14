"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import {motion} from "framer-motion"

const Landing = () => {
  const router = useRouter();

  function handleExplore () {
      router.push("/client/dashboard")
  }

  return (
    <div className="">
      <section className="pt-2 flex justify-end gap-2 pr-5">
        <Button onClick={()=>router.push("/client/signup")} className="bg-purple-500">Signup</Button>
        <Button onClick={()=>router.push("/client/signin")}>SignIn</Button>
      </section>
      <div className="grid justify-center sm:pt-40 pt-20">
        <h1 className="font-bold text-3xl sm:text-5xl text-center">Brain Room</h1>
        <h1 className="text-xl sm:text-2xl text-gray-400 text-center mt-5">Practice for Group-D Exam with our knowledgeful tests</h1>
        <div className="sm:flex grid justify-around mt-5 mx-20 gap-5">
          <motion.div
          whileTap={{scale:0.9}}
          >
            <Button className="bg-gray-800 p-2 px-4 rounded-xl w-60">Start</Button>
          </motion.div>
          <motion.div
          whileTap={{scale:0.9}}
          >
            <Button className="bg-gray-800 p-2 px-4 rounded-xl w-60" onClick={handleExplore}>Explore Tests</Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Landing