"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Result = () => {
    const router = useRouter();

    function handleDashboard () {
        router.push("/client/dashboard")
    }
    
    return (
      <div className="grid justify-center pt-20">
        <h1 className="text-center text-xl font-bold mb-5">Test Submitted</h1>
        <h1 className="text-xl">Check results in the Dashboard</h1>
        <Button className="bg-purple-600 mt-5" onClick={handleDashboard}>Dashboard</Button>
      </div>
    )
  }
  
  export default Result;