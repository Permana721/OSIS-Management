import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const EditUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state || {}; 
    const [formData, setFormData] = useState({
        name: user?.name || "",
        kelas: user?.kelas || "",
        email: user?.email || "",
        password: user?.password || "",
        proker: user?.proker || "",
        foto: user?.foto || "", // Menyimpan nama file sebelumnya
    });
    // const [newFoto, setNewFoto] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, foto: e.target.files[0] });
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("kelas", formData.kelas);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("proker", formData.proker);
        
        if (formData.foto instanceof File) {
            formDataToSend.append("foto", formData.foto);
        }
    
        try {
            await axios.patch(`http://localhost:8000/user/update/${user.id}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/admin/user");
        } catch (error) {
            console.error("Error updating user:", error.response || error);
        }
    };    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 shadow-md rounded-md max-w-lg w-full">
                <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">Edit Data Pengguna</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Nama</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan nama OSIS"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Kelas</label>
                        <input
                            type="text"
                            name="kelas"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan kelas OSIS"
                            value={formData.kelas}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan email OSIS"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan password baru (opsional)"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Program Kerja</label>
                        <input
                            type="text"
                            name="proker"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan Proker OSIS"
                            value={formData.proker}
                            onChange={handleChange}
                        />
                    </div>
                    
                    {/* Menampilkan gambar saat ini */}
                

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Upload Foto Baru</label>
                        <input
                            type="file"
                            name="foto"
                            accept="image/png, image/jpg, image/jpeg"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-2">
                        <button type="submit" className="w-full md:w-auto px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Simpan
                        </button>
                        <Link to={"/admin/user"} className="w-full md:w-auto px-4 py-2 cursor-pointer bg-gray-400 text-white rounded-md hover:bg-gray-500 mt-2 md:mt-0">
                            Kembali
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
