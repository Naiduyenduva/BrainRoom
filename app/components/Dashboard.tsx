"use client"
import Sidebar from "./Sidebar";
import Tests from "./Tests";
import UserResults from "./UserResults";
import { useAppSelector } from "../redux/store";
import { RootState } from "../redux/store";

const Dashboard = () => {
    const isTrue = useAppSelector((state:RootState) => state.isTrue.value);
    return (
        <div className="sm:flex h-screen">
            <div className="sm:w-1/5 sm:border-r sm:border-purple-900">
                <Sidebar />
            </div>
            <div className="sm:w-4/5">
            {
                isTrue ? <Tests /> : <UserResults />
            }
            </div>
        </div>
    )
}

export default Dashboard;