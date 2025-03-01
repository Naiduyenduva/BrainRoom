"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";

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
      <div className="grid justify-center pt-40">
        <h1 className="font-bold text-5xl text-center">Brain Room</h1>
        <h1 className="text-2xl text-gray-400 text-center mt-5">Practice for Group-D Exam with our knowledgeful tests</h1>
        <div className="flex justify-around mt-5 mx-20 gap-5">
          <Button className="bg-gray-800 p-2 px-4 rounded-xl w-60">Start</Button>
          <Button className="bg-gray-800 p-2 px-4 rounded-xl w-60" onClick={handleExplore}>Explore Tests</Button>
        </div>
      </div>
    </div>
  )
}

export default Landing