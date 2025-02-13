import React, { useState } from 'react';
import axios from 'axios';

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (!phone) {
      setErrors('Phone number is required.');
      return false;
    } else if (!/^\+?\d{10,15}$/.test(phone)) {
      setErrors('Please enter a valid phone number.');
      return false;
    }
    setErrors('');
    return true;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setLoading(true);
      setErrorMessage('');

      try {
        const response = await axios.post(
          'http://98.80.226.91/users/login',
          { phone },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          alert('Phone number is registered. Proceeding...');
          console.log(response)
        } else {
          setErrorMessage(response.data.message || 'Phone number not registered.');
        }
      } catch (error) {
        setErrorMessage('An error occurred. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-purple flex flex-col justify-center items-center p-10">
        <div className="text-white text-3xl font-bold mb-4">Firstbench</div>
        <img
          src="/assets/personspeaking.svg"
          alt="Illustration"
          className="w-72"
        />
      </div>

      <div className="w-1/2 flex justify-center items-center bg-gray-50">
        <div className="w-3/4 max-w-sm bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Login</h2>
          <p className="text-gray-600 mb-6">Enter your phone number to continue</p>

          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-purple text-white py-2 rounded-md hover:bg-blue-800 transition duration-300"
          >
            {loading ? 'Checking...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
