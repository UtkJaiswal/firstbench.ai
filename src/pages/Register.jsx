import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import personspeaking from "../assets/personspeaking.svg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const toOTP = () => {
    navigate("/otp");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // User registration API
      const response = await axios.post(
        "/users/register",
        {
          name,
          email,
          password,
          phone,
        },
        {
          headers: {
            //Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIzNTUxNTQ1LCJleHAiOjE3MjQ1NTE1NDV9.mp6MKNJgy-Bad75uPjsd2q3V8Z_zgNVV9sxEvYYH2ys",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Registration Successful:", response.data.message);

      await axios.post(
        "/users/sendVerificationEmail",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(
        "Registration Successful! Verification email sent. Please check your inbox."
      );
      toOTP();
    } catch (err) {
      console.error("Error:", err.response?.data);
      setError("An error occurred.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="bg-purple flex-1 flex flex-col justify-between items-center py-2">
        <img src={logo} alt="Logo" />
        <img src={personspeaking} alt="Person Speaking" />
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gray-50">
        <div className="w-80">
          <h1 className="text-2xl font-bold mb-4">Account Registration</h1>
          <p className="mb-6 text-gray-500">
            Please enter your details to create an account
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple text-white py-3 rounded-lg font-semibold hover:bg-purple focus:outline-none focus:ring focus:ring-purple"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
