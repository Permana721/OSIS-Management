import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './assets/admin/dashboard';
import AdminUser from './assets/admin/user';
import AddUser from './assets/admin/addUser';
import EditUser from './assets/admin/editUser';
import Login from './assets/admin/auth/login';
import Register from './assets/admin/auth/register';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/user" element={<AdminUser />} />
                <Route path="/admin/add" element={<AddUser />} />
                <Route path="/admin/edit" element={<EditUser />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;