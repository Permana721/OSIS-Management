import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminUser = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:8000/user', {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        
        if (query === "") {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter(user => 
                (user.name?.toLowerCase() || "").includes(query) || 
                (user.kelas?.toLowerCase() || "").includes(query) || 
                (user.proker?.toLowerCase() || "").includes(query)
            ));
        }
    };    

    const handleEdit = (user) => {
        navigate("/admin/edit", { state: user });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah kamu yakin ingin menghapus data ini?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:8000/user/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
                const updatedUsers = users.filter((user) => user.id !== id);
                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers);
                alert("User deleted successfully.");
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <aside>
                <Sidebar />
            </aside>

            <div className="flex-1 p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-blue-600">Kelola Pengguna</h2>
                </div>

                <div className="bg-white p-4 shadow-md rounded-md overflow-x-auto">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 mb-4">
                        <Link to={"/admin/add"} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto">
                            + Tambah Pengguna
                        </Link>
                        <input
                            type="text"
                            placeholder="Cari pengguna..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full md:w-56 p-2 border rounded-md"
                        />
                    </div>

                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-50">
                                <th className="p-4 border-b-2 border-gray-300">No</th>
                                <th className="p-4 border-b-2 border-gray-300">Nama</th>
                                <th className="p-4 border-b-2 border-gray-300 hidden md:table-cell">Kelas</th>
                                <th className="p-4 border-b-2 border-gray-300 hidden md:table-cell">Program Kerja</th>
                                <th className="p-4 border-b-2 border-gray-300">Foto</th>
                                <th className="p-4 border-b-2 border-gray-300">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="p-4 border-b border-gray-300">{index + 1}</td>
                                    <td className="p-4 border-b border-gray-300">{user.name}</td>
                                    <td className="p-4 border-b border-gray-300 hidden md:table-cell">{user.kelas}</td>
                                    <td className="p-4 border-b border-gray-300 hidden md:table-cell">{user.proker}</td>
                                    <td className="p-4 border-b border-gray-300">
                                        <img src={`/uploads/${user.foto}`} alt="Foto Pengguna" className="w-20 h-20 object-cover rounded-md" />
                                    </td>
                                    <td className="p-4 border-b border-gray-300 flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                                        <button onClick={() => handleEdit(user)} className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto">
                                            Edit
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white cursor-pointer rounded-md hover:bg-red-600 w-full md:w-auto"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default AdminUser;