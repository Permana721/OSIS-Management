import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [kelas, setKelas] = useState('');
  const [no_urut, setNoUrut] = useState('');
  const [role, setRole] = useState('');
  const [posisi, setPosisi] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [proker, setProker] = useState('');
  const [setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow h-screen md:h-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Register</h2>

        <form onSubmit={handleSubmit}>
          {/* Nama */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Kelas */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Kelas</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Kelas"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
            />
          </div>

          {/* No Urut */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">No Urut</label>
            <input
              type="number"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Nomor Urut"
              value={no_urut}
              onChange={(e) => setNoUrut(e.target.value)}
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option className="hidden" value="">Pilih Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Posisi */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Posisi</label>
            <select
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={posisi}
              onChange={(e) => setPosisi(e.target.value)}
            >
              <option className="hidden" value="">Pilih Posisi</option>
              <option value="ketua">Ketua</option>
              <option value="wakil_ketua">Wakil Ketua</option>
            </select>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute top-11 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <i className={showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'} />
            </button>
          </div>

          {/* Program Kerja */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Program Kerja</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Program Kerja"
              value={proker}
              onChange={(e) => setProker(e.target.value)}
            />
          </div>

          {/* Foto */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Foto</label>
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handlePhotoChange}
            />
            {preview && (
              <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />
            )}
          </div>

          {/* Tombol Register */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Daftar
          </button>
        </form>

        {/* Link ke Login */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

