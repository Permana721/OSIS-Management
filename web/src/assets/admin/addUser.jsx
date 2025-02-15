import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const [name, setName] = useState("");
    const [kelas, setKelas] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [proker, setProker] = useState("");
    const [msg, setMsg] = useState("");

    const navigate = useNavigate(); 

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/user/add", {
                name: name,
                kelas: kelas,
                email: email,
                password: password,
                proker: proker,
            });
            navigate("/admin/user");
        } catch (error) {
            if (error.response) {
                setMsg("Terjadi kesalahan. Silakan coba lagi.");
            } 
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 shadow-md rounded-md max-w-lg w-full">
                <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">Tambah Pengguna</h2>
                <form onSubmit={Register}>
                    <p className="text-center text-red-600">{msg}</p>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Nama</label>
                        <input
                        name="name"
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan nama OSIS"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Kelas</label>
                        <input
                        name="kelas"
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan kelas OSIS"
                        value={kelas}
                        onChange={(e) => setKelas(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                        name="email"
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan email OSIS"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                        name="password"
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan password OSIS"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Program Kerja</label>
                        <input
                        name="proker"
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan Proker OSIS"
                        value={proker}
                        onChange={(e) => setProker(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-2">
                        <button type="submit" className="w-full md:w-auto cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Simpan
                        </button>
                        <Link to={"/admin/user"} className="w-full md:w-auto px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 mt-2 md:mt-0">
                            Kembali
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
