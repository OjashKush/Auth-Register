import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import apiClient from "../../utils/api";
import { useState } from "react";

export default function Login() {

    const { login, user } = useAuth();  
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await apiClient().loginUser(formData);
        console.log("Login successful:", response);
        login({ userData: response.user });
        } catch (error) {
        console.error("Error during login:", error);
        }
    };

    return (
        <div className="container mx-auto mt-16">
          <div className="flex justify-center">
            <div className="w-96">
              <h2 className="text-3xl mb-6 font-bold">Login Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="mt-1 p-2 w-full border rounded-md"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="mt-1 p-2 w-full border rounded-md"
                    id="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
    
                {user ? <Link to='/dashboard' className="bg-gray-800 text-white p-2 rounded-md mr-2 hover:bg-gray-700">Go to Dashboard</Link> :
                    <button
                  type="submit"
                  className="bg-gray-800 text-white p-2 rounded-md mr-2 hover:bg-gray-700"
                >
                  Submit
                </button>}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register
                </Link>
              </form>
            </div>
          </div>
        </div>
      );
}