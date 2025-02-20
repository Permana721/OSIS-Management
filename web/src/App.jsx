import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './assets/admin/dashboard';
import AdminUser from './assets/admin/user';
import AddUser from './assets/admin/addUser';
import EditUser from './assets/admin/editUser';
import Login from './assets/admin/auth/login';
import Register from './assets/admin/auth/register';
import PrivateRoute from './privateRoute';

import Dashboard from './assets/user/dashboard'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />

                <Route path="/admin/register" element={<Register />} />
                <Route path="/admin/login" element={<Login />} />

                <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                <Route path="/admin/user" element={<PrivateRoute><AdminUser /></PrivateRoute>} />
                <Route path="/admin/add" element={<PrivateRoute><AddUser /></PrivateRoute>} />
                <Route path="/admin/edit" element={<PrivateRoute><EditUser /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;