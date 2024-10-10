'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({ email: '', password: '' });
    const [buttonDisable, setButtonDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log('Login success', response.data);
            router.push('/profile');
        } catch (error: any) {
            console.log('Login failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisable(!(user.email && user.password));
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
                <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
                    {loading ? 'Processing...' : 'Login'}
                </h1>
                <label className="block mb-2 text-sm text-gray-600">Email</label>
                <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="block mb-2 text-sm text-gray-600">Password</label>
                <input
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={onLogin}
                    disabled={buttonDisable}
                    className={`w-full py-2 rounded-md text-white ${buttonDisable ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition duration-300`}
                >
                    {loading ? 'Logging In...' : buttonDisable ? 'Fill all fields' : 'Login'}
                </button>
                <Link href="/singup" className="block mt-4 text-center text-blue-500 hover:underline">
                    Don't have an account? Sign Up
                </Link>
                <Link href="/forgot-password" className="block mt-2 text-center text-blue-500 hover:underline">
                    Forgot Password?
                </Link>
            </div>
        </div>
    );
}
