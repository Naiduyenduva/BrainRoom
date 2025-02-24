import Sidebar from "./Sidebar";
import Tests from "./Tests";
const Dashboard = () => {
    return (
        <div className="flex h-screen">
            <div className="w-1/5 border-r border-purple-900">
                <Sidebar />
            </div>
            <div className="w-4/5">
                <Tests />
            </div>
        </div>
    )
}

export default Dashboard;