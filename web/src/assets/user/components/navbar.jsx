import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="container mx-auto p-20">
                        <Link to="/">
                            <img src="/smkn2.png" alt="Logo" className="w-12" />
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6 pr-21">
                        {[
                            { path: "/", label: "Dashboard" },
                            { path: "https://www.smkn2bdg.sch.id/kepala-sekolah/", label: "Tentang Kami" },
                            { path: "https://www.smkn2bdg.sch.id/kontak-kami/", label: "Kontak Kami" },
                        ].map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`p-2 whitespace-nowrap inline-block ${
                                    location.pathname === item.path
                                        ? "text-red-600 font-semibold"
                                        : "text-gray-600 hover:text-red-600 font-medium"
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
