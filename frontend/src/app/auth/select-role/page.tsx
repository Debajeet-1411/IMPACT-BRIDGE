"use client";

import Link from 'next/link';
import { Zap, Building2, Users } from 'lucide-react';

export default function SelectRolePage() {
    return (
        <div className="min-h-screen bg-black flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-[1265px] mx-auto text-center">
                <div className="mb-8 flex justify-center">
                    <div className="p-3 bg-[rgba(37,99,235,0.1)] rounded-full">
                        <Zap className="text-[#2563EB]" size={40} fill="currentColor" />
                    </div>
                </div>

                <h1 className="text-4xl font-extrabold text-[#E7E9EA] mb-4">
                    How will you use ImpactBridge?
                </h1>
                <p className="text-[#71767B] mb-12 text-lg">
                    Select your role to get started
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
                    {/* Donor Card */}
                    <Link href="/auth/signup?role=COMPANY" className="group w-full md:w-1/2">
                        <div className="bg-black border border-[#2F3336] rounded-2xl p-8 hover:bg-[#16181C] hover:border-[#E7E9EA] transition-all text-left h-full flex flex-col items-start cursor-pointer">
                            <div className="w-14 h-14 rounded-xl bg-[#E7E9EA] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Building2 className="text-black" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-[#E7E9EA] mb-3">I'm a Donor</h2>
                            <p className="text-[#71767B] mb-6 flex-grow">
                                Hotels, restaurants, corporates with surplus food or supplies to donate.
                            </p>
                            <div className="text-[#E7E9EA] font-bold group-hover:underline flex items-center">
                                Get Started <span className="ml-2">→</span>
                            </div>
                        </div>
                    </Link>

                    {/* NGO Card */}
                    <Link href="/auth/signup?role=NGO" className="group w-full md:w-1/2">
                        <div className="bg-black border border-[#2F3336] rounded-2xl p-8 hover:bg-[#16181C] hover:border-[#2563EB] transition-all text-left h-full flex flex-col items-start cursor-pointer">
                            <div className="w-14 h-14 rounded-xl bg-[#2563EB] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Users className="text-white" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-[#E7E9EA] mb-3">I'm an NGO</h2>
                            <p className="text-[#71767B] mb-6 flex-grow">
                                Orphanages, shelters, food banks seeking donations.
                            </p>
                            <div className="text-[#2563EB] font-bold group-hover:underline flex items-center">
                                Get Started <span className="ml-2">→</span>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="mt-12">
                    <p className="text-[#71767B]">
                        Already have an account? <Link href="/auth/login" className="text-[#2563EB] font-bold hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
