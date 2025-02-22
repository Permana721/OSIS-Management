import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import axios from "axios";

const Dashboard = () => {
    const [groupedData, setGroupedData] = useState({});

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/user");
            const grouped = response.data.reduce((acc, user) => {
                if (!acc[user.no_urut]) {
                    acc[user.no_urut] = { ketua: null, wakil: null, visi: "", misi: "", proker: "" };
                }

                if (user.posisi === "ketua") {
                    acc[user.no_urut].ketua = user;
                    acc[user.no_urut].visi = user.visi;
                    acc[user.no_urut].misi = user.misi;
                    acc[user.no_urut].proker = user.proker;
                } else if (user.posisi === "wakil_ketua") {
                    acc[user.no_urut].wakil = user;
                }

                return acc;
            }, {});

            setGroupedData(grouped);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="py-20 px-10 min-h-screen bg-gray-100">
                <div className="container mx-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(groupedData).map(([no_urut, { ketua, wakil, visi, misi, proker }]) => (
                            <div key={no_urut} className="relative bg-white p-6 rounded-lg shadow-md">
                                <div className="absolute top-2 left-2 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                                    {no_urut}
                                </div>
                                <div className="flex justify-center gap-6">
                                    <div className="flex flex-col items-center">
                                        <div className="w-32 h-32 border rounded overflow-hidden flex items-center justify-center bg-gray-200">
                                            <img 
                                                src={ketua?.foto ? `/uploads/${ketua.foto}` : "/default.jpg"} 
                                                alt="Ketua OSIS" 
                                                className="w-full h-full object-fit-cover" 
                                            />
                                        </div>
                                        <p className="mt-2 text-center font-semibold">{ketua?.name || "Ketua OSIS"}</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-32 h-32 border rounded overflow-hidden flex items-center justify-center bg-gray-200">
                                            <img 
                                                src={wakil?.foto ? `/uploads/${wakil.foto}` : "/default.jpg"} 
                                                alt="Wakil OSIS" 
                                                className="w-full h-full object-fit-cover" 
                                            />
                                        </div>
                                        <p className="mt-2 text-center font-semibold">{wakil?.name || "Wakil OSIS"}</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <p className="font-semibold">Visi:</p>
                                    <p className="border-b border-gray-300 pb-1">{visi || "Belum tersedia"}</p>

                                    <p className="font-semibold mt-2">Misi:</p>
                                    <p className="border-b border-gray-300 pb-1">{misi || "Belum tersedia"}</p>

                                    <p className="font-semibold mt-2">Program Kerja:</p>
                                    <p className="border-b border-gray-300 pb-1">{proker || "Belum tersedia"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
