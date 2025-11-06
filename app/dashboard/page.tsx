'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
    email: string;
    points: number;
    referrerEmail: string | null;
}

export default function DashboardPage() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const userDataString = localStorage.getItem('userData');

        if (!token || !userDataString) {
            router.push('/login');
            return;
        }

        try {
            const userData: UserData = JSON.parse(userDataString);
            setUser(userData);
        } catch (e) {
            console.error("Failed to parse user data:", e);
            localStorage.clear();
            router.push('/login');
        } finally {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return <div className="text-center mt-10">Loading user profile...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-2xl">
                <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">
                    Welcome to Your Dashboard, {user.email}!
                </h1>
                
                <p className="text-2xl font-semibold text-gray-800 mb-8 p-4 bg-indigo-50 rounded-lg">
                    Current Points: <span className="text-indigo-600 font-bold">{user.points}</span>
                </p>

                <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Referral Information</h2>
                    
                    {user.referrerEmail ? (
                        <div className="p-4 border-l-4 border-green-500 bg-green-50">
                            <p className="text-lg text-gray-700">
                                You were successfully referred by: 
                                <span className="font-semibold text-green-700 ml-2">{user.referrerEmail}</span>
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                You received **10 bonus points** upon signup!
                            </p>
                        </div>
                    ) : (
                        <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                            <p className="text-lg text-gray-700">
                                You signed up directly.
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Share your email with friends, and you both get **10 points** when they sign up!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}