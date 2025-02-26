"use client"

import { useState } from "react";
import Sidebar from "./Sidebar";
import Tests from "./Tests";
import UserResults from "./UserResults";
const Dashboard = () => {
    const [istrue, setIstrue ] = useState(true)
    return (
        <div className="flex h-screen">
            <div className="w-1/5 border-r border-purple-900">
                <Sidebar />
            </div>
            <div className="w-4/5">
            {
                istrue ? <Tests /> : <UserResults />
            }
            </div>
        </div>
    )
}

export default Dashboard;