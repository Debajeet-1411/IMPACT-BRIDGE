"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Loader2, Zap } from 'lucide-react';
import { authService } from '@/services/api';

function SignupContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialRole = searchParams.get('role') || 'NGO'; // Default to NGO if not specified

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await authService.signup({
                email,
                password,
                name,
                role: initialRole
            });

            localStorage.setItem('token', response.data.access_token);
            if (response.data.user_id) {
                localStorage.setItem('user_id', response.data.user_id);
            }

            // Redirect based on role
            const nextPath = initialRole === 'COMPANY'
                ? '/auth/setup/donor'
                : '/auth/setup/ngo';

            router.push(nextPath);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.detail || 'Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center mb-6">
                    <div className="p-3 bg-[rgba(37,99,235,0.1)] rounded-full">
                        <Zap className="text-[#2563EB]" size={32} fill="currentColor" />
                    </div>
                </Link>
                <h2 className="mt-2 text-center text-3xl font-extrabold text-[#E7E9EA]">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-[#71767B]">
                    Join ImpactBridge today
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-black border border-[#2F3336] py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10">
                    <form className="space-y-6" onSubmit={handleSignup}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-[#E7E9EA]">
                                Full Name
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-[#71767B]" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="bg-black block w-full pl-10 pr-3 py-2 border border-[#2F3336] rounded-lg text-[#E7E9EA] placeholder-[#71767B] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent sm:text-sm"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-[#E7E9EA]">
                                Email
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-[#71767B]" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="bg-black block w-full pl-10 pr-3 py-2 border border-[#2F3336] rounded-lg text-[#E7E9EA] placeholder-[#71767B] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent sm:text-sm"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-bold text-[#E7E9EA]">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-[#71767B]" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="bg-black block w-full pl-10 pr-3 py-2 border border-[#2F3336] rounded-lg text-[#E7E9EA] placeholder-[#71767B] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent sm:text-sm"
                                    placeholder="........"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center font-bold bg-[rgba(239,68,68,0.1)] p-2 rounded-lg border border-red-500/20">
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-[#1D2B3A] hover:bg-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                style={{ backgroundColor: '#0F1419' }} // Twitter/X dark button style base, overridden by hover
                            >
                                {/* Replicating the button style from login */}
                                <div className="absolute inset-0 bg-[#EFF3F4] text-black hover:bg-[#D7DBDC] w-full h-full rounded-full flex items-center justify-center font-bold text-[15px] transition-colors" style={{ position: 'relative' }}>
                                    {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                                        <>
                                            Create Account <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                        {/* Fallback to simple styled button if above structure is too complex, but trying to match "Get Started" style */}
                        <style jsx>{`
                button[type="submit"] {
                    background-color: #1D9BF0; /* Default primary */
                }
            `}</style>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#2F3336]" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-black text-[#71767B]">
                                    Already have an account? <Link href="/auth/login" className="text-[#E9a620] hover:text-[#d4961d] font-bold">Sign in</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupContent />
        </Suspense>
    )
}
