

'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [referrerEmail, setReferrerEmail] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Signing up...');

        try {
            const response = await axios.post('https://referalsystem-1.onrender.com/api/signup', {
                email,
                password,
                referrerEmail: referrerEmail || undefined,
            });

            // Store user data (See note below about missing token)
            localStorage.setItem('userData', JSON.stringify(response.data.user));

            setMessage('Signup successful! Redirecting to dashboard...');
            
            // Redirect to the dashboard
            router.push('/dashboard'); 
            
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage(`Error: ${error.response.data.message || 'Signup failed.'}`);
            } else {
                setMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900">Create Account</h2>
                
                {/* Status Message */}
                {message && (
                    <p className={`text-center p-2 rounded ${message.startsWith('Signup successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ... (Email, Password, Referral Input fields) ... */}
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
                    <div className="pt-2">
                        <label htmlFor="referrerEmail" className="block text-sm font-medium text-gray-700">
                            Referral Email (Optional)
                        </label>
                        <input
                            id="referrerEmail"
                            name="referrerEmail"
                            type="email"
                            value={referrerEmail}
                            onChange={(e) => setReferrerEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter the email of the person who referred you"
                        />
                        <p className="mt-1 text-xs text-indigo-600">
                            Use an older account's email to get started with points!
                        </p>
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
                </form>

                {/* --- NAVIGATION BUTTON --- */}
                <div className="pt-4 text-center border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Already have an account?</p>
                    <Link href="/login" passHref>
                        <button
                            type="button"
                            className="w-full py-2 px-4 text-sm font-medium text-indigo-600 bg-indigo-100 border border-indigo-600 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Go to Login
                        </button>
                    </Link>
                </div>
                {/* ------------------------- */}
            </div>
        </div>
    );
}