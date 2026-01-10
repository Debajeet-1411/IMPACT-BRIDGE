"use client";
import Sidebar from '@/components/Sidebar';
import { Landmark, Map, AlertTriangle, ShieldAlert, FileSearch, CheckCircle2 } from 'lucide-react';

export default function GovtConsole() {
    return (
        <div className="min-h-screen bg-black text-[#E7E9EA] font-sans flex justify-center">
            <header className="w-[275px] flex-shrink-0 relative max-xl:w-[88px]">
                <Sidebar current="feed" />
            </header>

            <main className="w-full max-w-[900px] border-x border-[#2F3336] min-h-screen p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold flex items-center gap-3">
                            <Landmark size={32} className="text-[#F91880]" />
                            Government Oversight Console
                        </h1>
                        <p className="text-[#71767B] mt-2">Monitoring verified NGOs, compliance status, and regional needs.</p>
                    </div>
                </div>

                {/* Alert Banners */}
                <div className="bg-[#F91880]/10 border border-[#F91880] rounded-xl p-4 mb-8 flex items-start gap-4">
                    <AlertTriangle className="text-[#F91880] mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-[#F91880] text-lg">High Urgency Alert: Flood Relief in Konkan</h3>
                        <p className="text-[#E7E9EA] text-sm mt-1">
                            Disaster Management Authority has flagged 12 villages in Ratnagiri District.
                            Recommended Action: Direct CSR funds to 'Kokan NGO' and 'Goonj' immediately.
                        </p>
                    </div>
                </div>

                {/* Compliance Stack */}
                <div className="grid grid-cols-2 gap-8">
                    <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
                        <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
                            <FileSearch size={24} className="text-[#1D9BF0]" />
                            Pending Verifications
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-[#202327] rounded-lg">
                                <div>
                                    <div className="font-bold">Green Earth NGO</div>
                                    <div className="text-xs text-[#71767B]">Reg: U80301MH...</div>
                                </div>
                                <button className="text-sm font-bold text-[#1D9BF0] border border-[#1D9BF0] px-3 py-1 rounded-full hover:bg-[#1D9BF0]/10">Review</button>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-[#202327] rounded-lg">
                                <div>
                                    <div className="font-bold">Helping Hands Trust</div>
                                    <div className="text-xs text-[#71767B]">Reg: E-12345...</div>
                                </div>
                                <button className="text-sm font-bold text-[#1D9BF0] border border-[#1D9BF0] px-3 py-1 rounded-full hover:bg-[#1D9BF0]/10">Review</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6">
                        <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
                            <ShieldAlert size={24} className="text-[#00BA7C]" />
                            Compliance Audit
                        </h2>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 text-center border-r border-[#2F3336]">
                                <div className="text-3xl font-extrabold text-[#E7E9EA]">2,450</div>
                                <div className="text-xs text-[#71767B] uppercase">Active NGOs</div>
                            </div>
                            <div className="flex-1 text-center">
                                <div className="text-3xl font-extrabold text-[#00BA7C]">98.2%</div>
                                <div className="text-xs text-[#71767B] uppercase">Compliant</div>
                            </div>
                        </div>
                        <div className="h-2 w-full bg-[#2F3336] rounded-full overflow-hidden">
                            <div className="h-full bg-[#00BA7C] w-[98.2%]"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
