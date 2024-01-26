import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import apiClient from "../utils/api";


const Dashboard = () => {
    const { user, logout } = useAuth();

    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(user ? user.name : "");
    const [email, setEmail] = useState(user ? user.email : "");  

    const handleLogout = () => {
        logout();
    };

    const handleEdit = () => {
        setEdit(!edit);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        }
    };    

    const handleUpdate = async () => {
        try {
            const updatedUserData = { name, email };
            await apiClient().updateUserProfile(updatedUserData);

            setEdit(false); 
        } catch (error) {
            console.error('Error during profile update:', error);
        }
        fetch('/update_profile', {
            credentials: 'include'  
          })
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-semibold mb-4">User Dashboard</h2>
                    <div>
                        {user ? (
                            <>
                                {edit ? (
                                    <>
                                        <input
                                            className="mt-1 p-2 w-full border rounded-md"
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="mt-1 p-2 w-full border rounded-md"
                                            type="text"
                                            name="email"
                                            value={email}
                                            onChange={handleChange}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p>Name: {user?.name}</p>
                                        <p>Email: {user?.email}</p>
                                    </>
                                )}
                                <Link to="/login">
                                    <button
                                        className="bg-gray-800 text-white px-4 py-2 rounded mt-4 hover:bg-gray-700"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </Link>

                                {edit ? (
                                    <button
                                        className="bg-green-800 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
                                        onClick={handleUpdate}
                                    >
                                        Submit
                                    </button>
                                ) : (
                                    <button
                                        className="bg-gray-800 text-white px-4 py-2 rounded mt-4 hover:bg-gray-700"
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </button>
                                )}
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