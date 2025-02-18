import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow h-screen md:h-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
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

          <div className="mb-6 text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Lupa Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Masuk
          </button>
        </form>
        
        <p className="mt-6 text-sm text-center text-gray-600">
          Pengguna baru?{' '}
          <Link to="/Register" className="text-blue-600 hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
