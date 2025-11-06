
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link for navigation

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Logging in...');

        try {
            const response = await axios.post('https://referalsystem-1.onrender.com/api/login', {
                email,
                password,
            });

            // Store token and user data (In a real app, use secure cookies/context)
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('userData', JSON.stringify(response.data.user));

            setMessage('Login successful! Redirecting...');
            
            // Redirect to the dashboard
            router.push('/dashboard'); 

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage(`Error: ${error.response.data.message || 'Login failed.'}`);
            } else {
                setMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>
                
                {/* Status Message */}
                {message && (
                    <p className={`text-center p-2 rounded ${message.startsWith('Login successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Log In
                    </button>
                </form>

                {/* --- NAVIGATION BUTTON --- */}
                <div className="pt-4 text-center border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">New user?</p>
                    <Link href="/signup" passHref>
                        <button
                            type="button"
                            className="w-full py-2 px-4 text-sm font-medium text-indigo-600 bg-indigo-100 border border-indigo-600 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Go to Signup
                        </button>
                    </Link>
                </div>
                {/* ------------------------- */}
            </div>
        </div>
    );
}