import Navbar from "./components/navbar";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="py-20 px-10 min-h-screen bg-gray-100">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold text-blue-600 mb-4">Dashboard</h1>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Selamat Datang di Dashboard</h2>
                        <p className="text-gray-600">Ini adalah halaman dashboard sederhana.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;