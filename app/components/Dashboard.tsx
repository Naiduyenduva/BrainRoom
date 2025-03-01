"use client"

import { useState } from "react";
import Sidebar from "./Sidebar";
import Tests from "./Tests";
import UserResults from "./UserResults";
import { useAppSelector } from "../redux/store";
import { useSession } from "next-auth/react";



const Dashboard = () => {
    const {data: session} = useSession();
    console.log(session?.user.id)
    const isTrue = useAppSelector((state:any) => state.isTrue.value);
    return (
        <div className="flex h-screen">
            <div className="w-1/5 border-r border-purple-900">
                <Sidebar />
            </div>
            <div className="w-4/5">
            {
                isTrue ? <Tests /> : <UserResults />
            }
            </div>
        </div>
    )
}

export default Dashboard;