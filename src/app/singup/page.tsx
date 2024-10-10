'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface User {
    email: string;
    phone: string;
    password: string;
    username: string;
}

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = useState<User>({
        email: '',
        phone: '',
        password: '',
        username: '',
    });

    const [buttonDisable, setButtonDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/singup', user);
            console.log('Signup success', response.data);
            toast.success('Signup successful! Redirecting to login...');
            router.push('/login');
            setUser({ email: '', phone: '', password: '', username: '' }); // Reset form
        } catch (error: any) {
            console.log('Signup failed', error.message);
            toast.error('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisable(!(user.email && user.password && user.username));
    }, [user]);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>{loading ? 'Processing...' : 'Signup'}</h1>

            <label htmlFor="username" style={styles.label}>Username</label>
            <input
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Enter your username"
                type="text"
                style={styles.input}
            />

            <label htmlFor="email" style={styles.label}>Email</label>
            <input
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
                type="email"
                style={styles.input}
            />
            
            <label htmlFor="phone" style={styles.label}>Phone</label>
            <input
                id="phone"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                placeholder="Enter your phone"
                type="text"
                style={styles.input}
            />

            <label htmlFor="password" style={styles.label}>Password</label>
            <input
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
                type="password"
                style={styles.input}
            />

            <button
                onClick={onSignup}
                disabled={buttonDisable}
                style={{ ...styles.button, ...(buttonDisable ? styles.buttonDisabled : styles.buttonActive) }}
            >
                {loading ? 'Signing Up...' : buttonDisable ? 'Fill all fields' : 'Signup'}
            </button>

            <Link href="/login" style={styles.link}>
                Visit login page
            </Link>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '26px',
        marginBottom: '30px',
        textAlign: 'center',
        color: '#333',
    },
    label: {
        display: 'block',
        marginBottom: '10px',
        fontSize: '15px',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
    },
    button: {
        width: '100%',
        padding: '12px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        color: '#fff',
        cursor: 'not-allowed',
    },
    buttonActive: {
        backgroundColor: '#007bff',
        color: '#fff',
    },
    link: {
        display: 'block',
        marginTop: '20px',
        textAlign: 'center',
        textDecoration: 'none',
        color: '#007bff',
        fontSize: '14px',
    },
};
