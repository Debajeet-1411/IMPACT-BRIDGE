"use client";
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/api';
import { Zap, Users, Building2, ArrowRight } from 'lucide-react';

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialRole = searchParams.get('role') || 'NGO';

    const [email, setEmail] = useState('');
    const [role, setRole] = useState(initialRole);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await authService.login(email, role);
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('role', role);
            router.push('/feed');
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[600px] bg-black min-h-screen flex flex-col justify-center px-8 mx-auto">
            <div className="flex justify-center mb-10">
                <Zap className="text-[#E7E9EA]" size={50} fill="white" />
            </div>

            <h1 className="text-3xl font-extrabold text-[#E7E9EA] mb-8 text-center">Sign in to ImpactBridge</h1>

            <div className="bg-black rounded-2xl">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-[15px] font-bold text-[#E7E9EA] mb-3">
                            Select Account Type
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setRole('NGO')}
                                className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 ${role === 'NGO'
                                    ? 'border-[#2563EB] bg-[rgba(37,99,235,0.1)]'
                                    : 'border-[#536471] hover:bg-[rgba(239,243,244,0.1)]'
                                    }`}
                            >
                                <Users className={`${role === 'NGO' ? 'text-[#2563EB]' : 'text-[#71767B]'}`} size={28} />
                                <p className={`font-bold ${role === 'NGO' ? 'text-[#2563EB]' : 'text-[#E7E9EA]'}`}>NGO</p>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('COMPANY')}
                                className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 ${role === 'COMPANY'
                                    ? 'border-[#00BA7C] bg-[rgba(0,186,124,0.1)]'
                                    : 'border-[#536471] hover:bg-[rgba(239,243,244,0.1)]'
                                    }`}
                            >
                                <Building2 className={`mx-auto ${role === 'COMPANY' ? 'text-[#00BA7C]' : 'text-[#71767B]'}`} size={28} />
                                <p className={`font-bold ${role === 'COMPANY' ? 'text-[#00BA7C]' : 'text-[#E7E9EA]'}`}>Corporate</p>
                            </button>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute top-0 left-0 pl-3 pt-3 pointer-events-none text-[#71767B] text-sm group-focus-within:text-[#2563EB] transition-colors">
                            Email
                        </div>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            className="w-full px-3 pt-6 pb-2 bg-black border border-[#536471] rounded text-[#E7E9EA] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] focus:outline-none transition-colors placeholder-transparent peer"
                            placeholder="Email"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#E7E9EA] text-black rounded-full font-bold text-[17px] hover:bg-[#D7DBDC] transition-colors disabled:opacity-50 mt-4"
                    >
                        {loading ? 'Signing in...' : 'Next'}
                    </button>

                    <button className="w-full py-2 bg-transparent text-[#E7E9EA] border border-[#536471] rounded-full font-bold text-[17px] hover:bg-[rgba(239,243,244,0.1)] transition-colors">
                        Forgot password?
                    </button>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#2F3336]" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-black text-[#71767B]">
                                    Don't have an account? <Link href="/auth/select-role" className="text-[#2563EB] hover:underline font-bold">Sign up</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="bg-black min-h-screen">
            <Suspense>
                <LoginContent />
            </Suspense>
        </div>
    )
}
