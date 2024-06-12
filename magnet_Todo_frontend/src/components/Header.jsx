import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="bg-gradient-to-r from-gray-900 to-black text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <Link to="/">Task Manager</Link>
                </h1>
                <nav className="space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/register" className="hover:underline">Register</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                    {
                        localStorage.getItem('token') && (
                            <button 
                                onClick={handleLogout} 
                                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                            >
                                Logout
                            </button>
                        )
                    }

                </nav>
            </div>
        </header>
    );
};

export default Header;
