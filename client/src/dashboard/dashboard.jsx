import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Dashboard = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-semibold mb-4">User Dashboard</h2>
                    <div>
                        {user ? (
                            <>
                                <p>Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                                <Link to="/login">
                                    <button
                                        className="bg-gray-800 text-white px-4 py-2 rounded mt-4 hover:bg-gray-700"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <p>No user information available. Please log in.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;