'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleForgotPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error: any) {
            setMessage('Failed to send reset link. Please try again.');
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
                <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">Forgot Password</h1>
                <label className="block mb-2 text-sm text-gray-600">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleForgotPassword}
                    className={`w-full py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
            </div>
        </div>
    );
}
