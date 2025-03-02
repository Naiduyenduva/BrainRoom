"use client"
import { House } from 'lucide-react';
import { Library } from 'lucide-react';
import { Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setIsTrue } from "../redux/isTrueSlice";
import { RootState } from '../redux/store';

const Sidebar = () => {
  const isTrue = useAppSelector((state:RootState) => state.isTrue.value);
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handlehome () {
    dispatch(setIsTrue(true));
    router.push("/");
  }

  return (
    <div className="grid gap-10 p-5">
      <h1 className='hidden sm:block'>
        Brain Room
      </h1>
      <div className="sm:grid gap-3 flex">
        <h1 className='flex sm:gap-4 gap- p-2 text-sm sm:text-md rounded-2xl hover:bg-gray-800 transition-all duration-300 cursor-pointer' onClick={handlehome}>
          <House size={18} className='mt-1'/>
          <span className='hidden sm:block'>Home</span></h1>
        <h1 className="text-gray-500 hidden sm:block">Menu</h1>
        <h1 className={`sm:ml-2 flex sm:gap-4 gap-2 p-2 text-sm h-fit sm:text-md rounded-2xl transition-all duration-300 cursor-pointer ${isTrue ? "bg-purple-600 ":"bg-black hover:bg-gray-800"} `} onClick={()=>dispatch(setIsTrue(true))}><Library size={18} className='mt-1' />Available Tests</h1>
        <h1 className={`sm:ml-2 flex sm:gap-4 gap-2 p-2 text-sm sm:text-md rounded-2xl transition-all duration-300 cursor-pointer ${isTrue ? "bg-black hover:bg-gray-800":"bg-purple-600"}`} onClick={()=> dispatch(setIsTrue(false))}><Award size={18} className='mt-1'/>Results</h1>
      </div>
    </div>
  )
}

export default Sidebar;