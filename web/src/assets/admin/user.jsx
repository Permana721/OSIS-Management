import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";

const AdminUser = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", kelas: "XI-RPL 2", programKerja: "Masuk Surga" },
        { id: 2, name: "Jane Smith", kelas: "XI-AM 1", programKerja: "Makan Siang Gratis" },
        { id: 3, name: "Alice Johnson", kelas: "XI-TJKT 1", programKerja: "Tidur siang 3 jam" },
    ]);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const deleteUser = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
        setUsers(users.filter((user) => user.id !== id));
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
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-56 p-2 border rounded-md"
                        />
                    </div>

                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-50">
                            <th className="p-4 border-b-2 border-gray-300">Nama</th>
                            <th className="p-4 border-b-2 border-gray-300 hidden md:table-cell">Kelas</th>
                            <th className="p-4 border-b-2 border-gray-300 hidden md:table-cell">Program Kerja</th>
                            <th className="p-4 border-b-2 border-gray-300">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="p-4 border-b border-gray-300">{user.name}</td>
                                        <td className="p-4 border-b border-gray-300 hidden md:table-cell">{user.kelas}</td>
                                        <td className="p-4 border-b border-gray-300 hidden md:table-cell">{user.programKerja}</td>
                                        <td className="p-4 border-b border-gray-300 flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                                            <Link to={"/admin/edit"} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto" >
                                            Edit
                                            </Link>
                                            <button
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full md:w-auto"
                                            onClick={() => deleteUser(user.id)}
                                            >
                                            Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-500">
                                Tidak ada pengguna ditemukan.
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUser;
