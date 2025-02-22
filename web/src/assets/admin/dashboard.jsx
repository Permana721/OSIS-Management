import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AdminDashboard = () => {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8000/user", {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            setUserCount(response.data.length); 
        } catch (error) {
            console.error("Error fetching user count:", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="hidden md:block">
                <Sidebar />
            </aside>

            <div className="flex flex-col flex-1">
                <main className="flex-1 p-8 overflow-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Selamat Datang, Admin!</h2>
                            <p className="text-gray-500">Home &gt; Dashboard</p>
                        </div>
                        <img src="/img/background/background.png" alt="User Profile" className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md cursor-pointer"/>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                        <div className="bg-white p-6 shadow-md rounded-md flex items-center space-x-4">
                            <FontAwesomeIcon icon={faUser} className="text-red-600 text-3xl" />
                            <div>
                                <h3 className="text-2xl font-semibold">{userCount}</h3>
                                <p className="text-gray-500">User</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
