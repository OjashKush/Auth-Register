import React, { useState } from "react";
import apiClient from "../../utils/api";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
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
          const response = await apiClient().registerUser(formData);
    
          console.log("Registration successful:", response);
    
        } catch (error) {
          console.error("Error during registration:", error);
        }
      };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-4">Register Form</h2>
          <form action="post" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input mt-1 block w-full"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input mt-1 block w-full"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input mt-1 block w-full"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Submit
            </button>

            <a href="/login" className="ml-2 text-blue-500 hover:underline">
              Login
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
