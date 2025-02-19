import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });

      const { token, user, message } = response.data;

      // Simpan token & user info di localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert(message);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow h-screen md:h-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login</h2>

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Masuk</button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Pengguna baru?{" "}
          <Link to="/Register" className="text-blue-600 hover:underline">Daftar</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
