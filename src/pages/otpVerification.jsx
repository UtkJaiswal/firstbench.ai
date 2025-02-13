import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.svg";
import personspeaking from "../assets/personspeaking.svg";

const OTPVerification = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const checkPhoneRegistration = async () => {
    try {
      const response = await axios.post(
        "http://98.80.226.91/users/isPhoneRegistered",
        { phone },
        { timeout: 90000 }
      );
      setIsRegistered(response.data.isRegistered);
      return response.data.isRegistered;
    } catch (err) {
      setError(
        err.response?.data.message ||
          "An error occurred while checking phone registration."
      );
      return false;
    }
  };

  const sendOTP = async () => {
    try {
      const registered = await checkPhoneRegistration();
      if (!registered && !name) {
        setError("Name is required for new registration.");
        return;
      }

      const response = await axios.post(
        "http://98.80.226.91/users/sendOTP",
        {
          phone,
          name,
          isRegistered: registered,
        },
        { timeout: 90000 }
      );

      alert("OTP sent to your phone.");
    } catch (err) {
      setError(err.response?.data.message || "An error occurred.");
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post(
        "http://98.80.226.91/users/verifyOTP",
        {
          phone,
          code: otp,
          name,
        },
        { timeout: 90000 }
      );

      alert("OTP Verified! Registration complete.");
    } catch (err) {
      setError(err.response?.data.message || "An error occurred.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="bg-purple flex-1 flex flex-col justify-between items-center py-2">
        <img src={logo} alt="Logo" />
        <img src={personspeaking} alt="Person Speaking" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center bg-gray-50">
        <div className="w-80">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {/* Phone Number Input */}
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
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

            {!isRegistered && (
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
            )}

            {/* Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={sendOTP}
                className="w-full bg-purple text-white py-3 rounded-lg font-semibold focus:outline-none focus:ring focus:ring-indigo-300"
              >
                Send OTP
              </button>

              <div>
                <label htmlFor="otp" className="sr-only">
                  OTP
                </label>

                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring"
                  required
                />
              </div>

              <button
                type="button"
                onClick={verifyOTP}
                className="w-full bg-purple text-white py-3 rounded-lg font-semibold focus:outline-none focus:ring focus:ring-green-300"
              >
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
