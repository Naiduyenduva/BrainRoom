"use client"
import { House } from 'lucide-react';
import { Library } from 'lucide-react';
import { Award } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const Sidebar = () => {

  const router = useRouter();
  const [ clicked, setClicked ] = useState(false);

  function handlehome () {
    router.push("/");
    console.log("handlehome")
  }
  return (
    <div className="grid gap-10 p-5">
      <div>
        Brain Room
      </div>
      <div className="grid gap-3">
        <h1 className='flex gap-4 p-2 rounded-2xl hover:bg-gray-800 transition-all duration-300 cursor-pointer' onClick={handlehome}><House size={18} className='mt-1'/>Home</h1>
        <h1 className="text-gray-500">Menu</h1>
        <h1 className={`ml-2 flex gap-4 p-2 rounded-2xl transition-all duration-300 cursor-pointer ${clicked ? "bg-purple-600":"bg-black"} hover:bg-gray-800`} onClick={()=>setClicked(true)}><Library size={18} className='mt-1' />Available Tests</h1>
        <h1 className="ml-2 flex gap-4 p-2 rounded-2xl hover:bg-gray-800 transition-all duration-300 cursor-pointer"><Award size={18} className='mt-1'/>Results</h1>
      </div>
    </div>
  )
}

export default Sidebar