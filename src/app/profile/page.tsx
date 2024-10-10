'use client';
import axios from 'axios';
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    const getUserDetails = async () => {
        try {
            const res = await axios.post('/api/users/me');
            const data = res.data.data;
            setUserData(data);
            toast.success('User details fetched successfully');
        } catch (error: any) {
            console.log(error.message);
            toast.error('Failed to fetch user details');
        }
    };

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Profile Page</h1>
                
                <div className="mb-6 text-center">
                    {userData ? (
                        <div className="space-y-2">
                            <p className="text-lg text-gray-700"><strong>Email:</strong> {userData.email}</p>
                            <p className="text-lg text-gray-700"><strong>Username:</strong> {userData.username}</p>
                            <p className="text-lg text-gray-700"><strong>Phone:</strong> {userData.phone}</p>
                        </div>
                    ) : (
                        <p className="text-lg text-gray-600">No user data available</p>
                    )}
                </div>

                <button
                    onClick={logout}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Logout
                </button>

                {!userData && (
                    <button
                        onClick={getUserDetails}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 mt-4"
                    >
                        Get User Details
                    </button>
                )}
            </div>
        </div>
    );
}
