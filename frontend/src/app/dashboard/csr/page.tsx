"use client";
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { BarChart3, TrendingUp, DollarSign, Users, PieChart, ArrowUpRight, CheckCircle2 } from 'lucide-react';

import { useState } from 'react';

export default function CSRDashboard() {
    const [filter, setFilter] = useState('All');

    const pledges = [
        { id: 1, ngo: 'Child Rights and You', project: 'Winter Jacket Drive', amount: '₹ 2,50,000', status: 'Completed', date: 'Jan 12, 2026' },
        { id: 2, ngo: 'Akanksha Foundation', project: 'Digital Literacy Tablets', amount: '₹ 5,00,000', status: 'Processing', date: 'Jan 10, 2026' },
        { id: 3, ngo: 'SNEHA', project: 'Maternal Health Kits', amount: '₹ 1,20,000', status: 'Completed', date: 'Jan 05, 2026' },
        { id: 4, ngo: 'Goonj', project: 'Flood Relief Material', amount: '₹ 3,00,000', status: 'Pending', date: 'Jan 14, 2026' },
        { id: 5, ngo: 'Teach For India', project: 'Fellowship Sponsorship', amount: '₹ 10,00,000', status: 'Processing', date: 'Jan 08, 2026' },
        { id: 6, ngo: 'Nanhi Kali', project: 'Girl Child Education', amount: '₹ 75,000', status: 'Completed', date: 'Dec 28, 2025' },
    ];

    const filteredPledges = filter === 'All'
        ? pledges
        : pledges.filter(p => p.status === filter);

    return (
        <div className="min-h-screen bg-black text-[#E7E9EA] font-sans flex justify-center">
            <header className="w-[275px] flex-shrink-0 relative max-xl:w-[88px]">
                <Sidebar current="feed" /> {/* Ideally this should highlight 'csr' but sidebar props need update */}
            </header>

            <main className="w-full max-w-[900px] border-x border-[#2F3336] min-h-screen p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold flex items-center gap-3">
                            <BarChart3 size={32} className="text-[#00BA7C]" />
                            CSR Impact Dashboard
                        </h1>
                        <p className="text-[#71767B] mt-2">Real-time overview of your corporate social responsibility initiatives.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-[#1D9BF0] text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-[#1A8CD8] transition-colors">Download Report</button>
                        <button className="border border-[#536471] px-4 py-2 rounded-full font-bold text-sm hover:bg-[#2F3336] transition-colors">Settings</button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#00BA7C]/20 flex items-center justify-center text-[#00BA7C]">
                                <DollarSign size={20} />
                            </div>
                            <span className="text-[#00BA7C] text-sm font-bold flex items-center gap-1">+12% <ArrowUpRight size={14} /></span>
                        </div>
                        <div className="text-3xl font-extrabold text-[#E7E9EA]">₹ 45.2L</div>
                        <div className="text-[#71767B] text-sm">Total Funds Deployed</div>
                    </div>

                    <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#1D9BF0]/20 flex items-center justify-center text-[#1D9BF0]">
                                <Users size={20} />
                            </div>
                            <span className="text-[#1D9BF0] text-sm font-bold flex items-center gap-1">+5 <ArrowUpRight size={14} /></span>
                        </div>
                        <div className="text-3xl font-extrabold text-[#E7E9EA]">12,450</div>
                        <div className="text-[#71767B] text-sm">Lives Impacted</div>
                    </div>

                    <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#FFD400]/20 flex items-center justify-center text-[#FFD400]">
                                <CheckCircle2 size={20} />
                            </div>
                            <span className="text-[#71767B] text-sm font-bold">Q4 Goal</span>
                        </div>
                        <div className="text-3xl font-extrabold text-[#E7E9EA]">85%</div>
                        <div className="text-[#71767B] text-sm">Utilization Rate</div>
                    </div>
                </div>

                {/* Pledges Section */}
                <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-[#2F3336] flex justify-between items-center">
                        <h2 className="font-bold text-lg">Pledges Made</h2>
                        <div className="flex bg-[#202327] rounded-full p-1">
                            {['All', 'Completed', 'Processing', 'Pending'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === status
                                        ? 'bg-[#1D9BF0] text-white shadow-sm'
                                        : 'text-[#71767B] hover:text-[#E7E9EA]'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#202327] text-[#71767B] uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Beneficiary NGO</th>
                                <th className="px-6 py-3">Project</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2F3336]">
                            {filteredPledges.length > 0 ? (
                                filteredPledges.map((pledge) => (
                                    <tr key={pledge.id} className="hover:bg-[#202327] transition-colors">
                                        <td className="px-6 py-4 font-bold text-[#E7E9EA]">{pledge.ngo}</td>
                                        <td className="px-6 py-4 text-[#71767B]">{pledge.project}</td>
                                        <td className="px-6 py-4 text-[#71767B]">{pledge.date}</td>
                                        <td className="px-6 py-4 font-mono text-[#E7E9EA]">{pledge.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${pledge.status === 'Completed' ? 'text-[#00BA7C] bg-[#00BA7C]/10' :
                                                pledge.status === 'Processing' ? 'text-[#FFD400] bg-[#FFD400]/10' :
                                                    'text-[#F91880] bg-[#F91880]/10'
                                                }`}>
                                                {pledge.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-[#71767B]">
                                        No pledges found in this category.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Recent Distributions (Impact) */}
                <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl overflow-hidden mt-8">
                    <div className="p-4 border-b border-[#2F3336] flex justify-between items-center">
                        <h2 className="font-bold text-lg">Recent Impact Distributions</h2>
                        <Link href="/reports" className="text-[#1D9BF0] text-sm hover:underline font-bold">View Full Report</Link>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#202327] text-[#71767B] uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Distribution Date</th>
                                <th className="px-6 py-3">Partner NGO</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3">Impact Delivered</th>
                                <th className="px-6 py-3">Proof</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2F3336]">
                            {[
                                { date: 'Jan 15, 2026', ngo: 'Child Rights and You', loc: 'Mumbai, MH', impact: '250 Winter Jackets', proof: 'Verified' },
                                { date: 'Jan 12, 2026', ngo: 'Akanksha Foundation', loc: 'Pune, MH', impact: '50 Tablets', proof: 'Verified' },
                                { date: 'Jan 08, 2026', ngo: 'SNEHA', loc: 'Dharavi, Mumbai', impact: '120 Health Kits', proof: 'Verified' },
                                { date: 'Dec 25, 2025', ngo: 'Goonj', loc: 'News Delhi, DL', impact: '500kg Dry Ration', proof: 'Pending' },
                            ].map((dist, i) => (
                                <tr key={i} className="hover:bg-[#202327] transition-colors">
                                    <td className="px-6 py-4 text-[#71767B]">{dist.date}</td>
                                    <td className="px-6 py-4 font-bold text-[#E7E9EA]">{dist.ngo}</td>
                                    <td className="px-6 py-4 text-[#71767B]">{dist.loc}</td>
                                    <td className="px-6 py-4 font-bold text-[#E7E9EA]">{dist.impact}</td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center gap-1.5 text-xs font-bold ${dist.proof === 'Verified' ? 'text-[#00BA7C]' : 'text-[#FFD400]'}`}>
                                            {dist.proof === 'Verified' ? <CheckCircle2 size={14} /> : null}
                                            {dist.proof}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
