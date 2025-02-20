import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <Link to="/">
                            <img src="/smkn2.png" alt="Logo" className="w-12" />
                        </Link>
                    </div>

                    <div className="flex items-center justify-center text-center space-x-8">
                        {[
                            { path: "/", label: "Dashboard" },
                            { path: "https://www.smkn2bdg.sch.id/kepala-sekolah/", label: "Tentang Kami" },
                            { path: "https://www.smkn2bdg.sch.id/kontak-kami/", label: "Kontak kami" },
                        ].map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`p-2 ${
                                    location.pathname === item.path
                                        ? "text-blue-600 font-semibold"
                                        : "text-gray-600 hover:text-blue-600 font-medium"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;