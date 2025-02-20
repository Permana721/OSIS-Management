import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/admin/login");
    };

    return (
        <aside className="w-64 h-full bg-white shadow-lg p-6">
            <Link to="/admin">
                <h1 className="text-2xl mt-2 font-bold text-blue-600">Pengelola OSIS</h1>
            </Link>

            <nav className="mt-6">
                <h2 className="text-gray-500 uppercase text-sm font-semibold">Main</h2>
                <ul className="mt-2 space-y-2">
                    <li className="duration-300 hover:bg-blue-100 rounded-md">
                        <Link
                        to="/admin"
                        className={`flex items-center p-2 rounded-md ${
                            location.pathname === "/admin" ? "bg-blue-100 text-blue-600 font-semibold" : ""
                        }`}
                        >
                        Dashboard
                        </Link>
                    </li>
                </ul>

                <h2 className="mt-6 text-gray-500 uppercase text-sm font-semibold">Account</h2>
                <ul className="mt-2 space-y-2">
                    <li className="duration-300 hover:bg-blue-100 rounded-md">
                        <Link
                        to="/admin/user"
                        className={`p-2 block rounded-md ${
                            location.pathname === "/admin/user" ? "bg-blue-100 text-blue-600 font-semibold" : ""
                        }`}
                        >
                        User
                        </Link>
                    </li>
                </ul>

                <h2 className="mt-6 text-gray-500 uppercase text-sm font-semibold">Auth</h2>
                <ul className="mt-2 space-y-2">
                    <li className="duration-300 hover:bg-blue-100 rounded-md">
                        <button
                        onClick={handleLogout}
                        className="p-2 block cursor-pointer w-full text-left rounded-md"
                        >
                        Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;