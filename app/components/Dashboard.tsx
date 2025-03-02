"use client"
import Sidebar from "./Sidebar";
import Tests from "./Tests";
import UserResults from "./UserResults";
import { useAppSelector } from "../redux/store";

const Dashboard = () => {
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