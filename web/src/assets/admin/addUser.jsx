import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const [name, setName] = useState("");
    const [kelas, setKelas] = useState("");
    const [no_urut, setNoUrut] = useState("");
    const [posisi, setPosisi] = useState("");
    const [visi, setVisi] = useState("");
    const [misi, setMisi] = useState("");
    const [proker, setProker] = useState("");
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [msg, setMsg] = useState("");

    const navigate = useNavigate(); 

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const Register = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("kelas", kelas);
        formData.append("no_urut", no_urut);
        formData.append("posisi", posisi);
        formData.append("visi", visi);
        formData.append("misi", misi);
        formData.append("proker", proker);
        formData.append("photo", photo);

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8000/user/add", formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
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
                <h2 className="text-xl font-semibold text-red-600 mb-4 text-center">Tambah Pengguna</h2>
                <form onSubmit={Register} encType="multipart/form-data">
                    <p className="text-center text-red-600">{msg}</p>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Nama</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Masukkan nama OSIS"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Kelas</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Masukkan kelas OSIS"
                            value={kelas}
                            onChange={(e) => setKelas(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">No Urut</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Masukkan Nomor Urut OSIS"
                            value={no_urut}
                            onChange={(e) => setNoUrut(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Posisi</label>
                        <select
                            name="posisi"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={posisi}
                            onChange={(e) => setPosisi(e.target.value)}
                        >
                            <option className="hidden" value="">Pilih Posisi</option>
                            <option value="ketua">Ketua</option>
                            <option value="wakil_ketua">Wakil Ketua</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Visi</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Masukkan Visi OSIS"
                            value={visi}
                            onChange={(e) => setVisi(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Misi</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Masukkan Misi OSIS"
                            value={misi}
                            onChange={(e) => setMisi(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Program Kerja</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Masukkan Proker OSIS"
                            value={proker}
                            onChange={(e) => setProker(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Foto</label>
                        <input
                            type="file"
                            accept="image/png, image/jpg, image/jpeg"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            onChange={handlePhotoChange}
                        />
                        {preview && (
                            <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />
                        )}
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-2">
                        <button type="submit" className="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
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