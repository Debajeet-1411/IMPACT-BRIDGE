"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { Search, MoreHorizontal, ArrowLeft, Zap, Users, Building2, Check, X, ArrowRight } from 'lucide-react';

export default function MatchingDashboard() {
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setMatches([
                {
                    id: '1',
                    ngo: 'Hope Childcare',
                    from: '@hope_childcare',
                    company: 'Fresh Foods',
                    need: 'Winter nutrition kits',
                    availability: 'Organic vegetables',
                    score: 92,
                    reason: 'High match: Winter nutrition program needs.'
                },
                {
                    id: '2',
                    ngo: 'EduQuest',
                    from: '@eduquest_org',
                    company: 'Tech Giants',
                    need: 'Laptops for school',
                    availability: 'Refurbished workstations',
                    score: 85,
                    reason: 'Direct hardware match.'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="min-h-screen bg-black text-[#E7E9EA]">
            <div className="flex justify-center max-w-[1265px] mx-auto">
                <header className="w-[275px] flex-shrink-0 relative max-xl:w-[88px]">
                    <Sidebar current="matches" />
                </header>

                <main className="w-[600px] border-x border-[#2F3336] min-h-screen">
                    <div className="sticky top-0 z-10 bg-black/65 backdrop-blur-md border-b border-[#2F3336] px-4 py-3 flex items-center gap-4">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold leading-6">AI Matches</h1>
                            <span className="text-[13px] text-[#71767B]">Recommended for you</span>
                        </div>
                    </div>

                    <div className="p-0">
                        {loading ? (
                            <div className="p-8 text-center text-[#71767B]">Finding matches...</div>
                        ) : matches.map((match) => (
                            <div key={match.id} className="border-b border-[#2F3336] p-4 hover:bg-[rgba(255,255,255,0.03)] cursor-pointer transition-colors">
                                <div className="flex items-start justify-between mb-1">
                                    <div className="flex items-center gap-2 text-[#71767B] text-sm">
                                        <Zap size={16} className="text-[#2563EB]" fill="#2563EB" />
                                        <span className="font-bold text-[#E7E9EA]">AI Match Score</span>
                                        <span>·</span>
                                        <span className="text-[#2563EB] font-bold">{match.score}%</span>
                                    </div>
                                    <button className="text-[#71767B] hover:text-[#2563EB] hover:bg-[#2563EB]/10 p-1.5 rounded-full transition-colors">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>

                                <div className="mt-2 text-[#E7E9EA]">
                                    <div className="flex gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                                            <Users size={20} className="text-[#E7E9EA]" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-[15px]">{match.ngo}</div>
                                            <div className="text-[#71767B] text-[14px]">{match.from}</div>
                                            <div className="mt-1 text-[15px]">Needs: {match.need}</div>
                                        </div>
                                    </div>

                                    <div className="ml-12 pl-1 border-l-2 border-[#2F3336] mb-3">
                                        <div className="flex gap-3 pl-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                                                <Building2 size={16} className="text-[#E7E9EA]" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-[14px]">{match.company}</div>
                                                <div className="text-[#71767B] text-[13px]">Available: {match.availability}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ml-12 bg-[#202327] rounded-2xl p-3 mb-3">
                                        <p className="text-[13px] text-[#71767B] flex gap-2">
                                            <span className="font-bold text-[#2563EB]">Why:</span>
                                            {match.reason}
                                        </p>
                                    </div>

                                    <div className="ml-12 flex items-center gap-4 mt-2">
                                        <button className="flex-1 bg-[#2563EB] hover:bg-[#1A8CD8] text-white font-bold py-2 rounded-full text-center text-sm transition-colors">
                                            Connect
                                        </button>
                                        <button className="flex-1 bg-transparent border border-[#536471] hover:bg-[rgba(239,243,244,0.1)] text-[#EFF3F4] font-bold py-2 rounded-full text-center text-sm transition-colors">
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                <aside className="w-[350px] pl-8 py-3 hidden lg:block sticky top-0 h-screen overflow-y-auto">
                    <div className="sticky top-0 bg-black pb-3 z-10">
                        <div className="relative group">
                            <div className="absolute left-4 top-3 text-[#71767B] group-focus-within:text-[#1D9BF0]">
                                <Search size={20} />
                            </div>
                            <input type="text" placeholder="Search" className="w-full bg-[#202327] text-[#E7E9EA] rounded-full py-3 pl-12 pr-4 border-none focus:ring-1 focus:ring-[#1D9BF0] placeholder-[#71767B] focus:bg-black" />
                        </div>
                    </div>
                    {/* Placeholder for trending in matches */}
                    <div className="bg-[#16181C] rounded-2xl border border-[#16181C] p-4 text-[#71767B]">
                        Trending matches will appear here.
                    </div>
                </aside>
            </div>
        </div>
    );
}
