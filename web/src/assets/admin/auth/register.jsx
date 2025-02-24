import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      await axios.post("http://localhost:8000/user/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/login");
      } catch (error) {
        if (error.response) {
            setMsg("Terjadi kesalahan. Silakan coba lagi.");
        } 
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow h-screen md:h-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Register</h2>
        <form onSubmit={Register} encType="multipart/form-data">
          <p className="text-center text-red-600">{msg}</p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Masukkan Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Daftar
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/admin/login" className="text-red-600 hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AddUser;

