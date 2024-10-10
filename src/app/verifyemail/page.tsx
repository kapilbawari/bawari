'use client';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function VerifyEmailPage() {
    const [token, setToken] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // Function to verify user email
    const verifyUserEmail = useCallback(async () => {
        setLoading(true);
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);  // Success state
            setError(false);
        } catch (error: unknown) {
            setError(true);  // Error state
            if (axios.isAxiosError(error)) {
                console.log("Verification error:", error.response?.data);
            } else {
                console.log("Unexpected error:", error);
            }
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Fetch token from URL
    useEffect(() => {
        const queryToken = new URLSearchParams(window.location.search).get('token');
        if (queryToken) {
            setToken(queryToken);
        }
    }, []);

    // Trigger verification when token is available
    useEffect(() => {
        if (token) {
            verifyUserEmail();
        }
    }, [token, verifyUserEmail]); // Added verifyUserEmail to dependencies

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Verify Email</h1>

                {/* Token Box */}
                <div className={`p-4 border ${token ? 'border-green-500' : 'border-red-500'} rounded-lg mb-6`}>
                    <h2 className="text-lg text-gray-700 truncate">
                        {token ? (
                            <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">
                                Token: {token}
                            </span>
                        ) : "No token found"}
                    </h2>
                </div>

                {/* Verification Messages */}
                {loading && (
                    <div className="bg-blue-100 text-blue-700 p-4 rounded-lg mb-4">
                        <h2 className="text-lg font-semibold">Verifying your email...</h2>
                    </div>
                )}
                
                {verified && (
                    <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                        <h2 className="text-lg font-semibold">Email Verified Successfully!</h2>
                        <Link href="/login">
                            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
                                Go to Login
                            </button>
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                        <h2 className="text-lg font-semibold">Verification Failed</h2>
                        <p>Please try again or contact support.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
