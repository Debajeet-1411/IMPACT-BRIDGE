"use client";
import Sidebar from '@/components/Sidebar';
import { Truck, Map as MapIcon, Calendar, ArrowRight, ShieldCheck, Box, UserPlus } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import for Map to avoid SSR issues
const MovingVehiclesMap = dynamic(() => import('@/components/MovingVehiclesMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#16181C] animate-pulse rounded-2xl flex items-center justify-center text-[#71767B]">Loading Live Map...</div>
});

export default function LogisticsDashboard() {

    const handleAssignDriver = () => {
        // Logic for assigning driver - for now a prompt/alert to prove it works
        const driverName = prompt("Enter Driver Name for next available shipment:");
        if (driverName) {
            alert(`Driver ${driverName} assigned successfully! Dispatch notification sent.`);
        }
    };

    return (
        <div className="min-h-screen bg-black text-[#E7E9EA] font-sans flex justify-center">
            <header className="w-[275px] flex-shrink-0 relative max-xl:w-[88px]">
                <Sidebar current="logistics" />
            </header>

            <main className="w-full max-w-[900px] border-x border-[#2F3336] min-h-screen p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold flex items-center gap-3">
                            <Truck size={32} className="text-[#1D9BF0]" />
                            Logistics Command Center
                        </h1>
                        <p className="text-[#71767B] mt-2">Route optimization, fleet management, and delivery tracking.</p>
                    </div>
                    <button
                        onClick={handleAssignDriver}
                        className="bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-[#1D9BF0]/20"
                    >
                        <UserPlus size={18} />
                        + Assign New Driver
                    </button>
                </div>

                {/* Real-time Map Section */}
                <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl overflow-hidden h-[400px] relative mb-8 group">
                    <MovingVehiclesMap />

                    {/* Overlay Info */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-[#2F3336] z-[1000]">
                        <div className="text-[#1D9BF0] font-bold text-sm flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D9BF0] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1D9BF0]"></span>
                            </span>
                            Live Tracking: 12 Vehicles Active
                        </div>
                        <div className="text-[#71767B] text-xs mt-0.5">Pune District Region</div>
                    </div>
                </div>

                {/* Active Deliveries */}
                <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-[#2F3336]">
                        <h2 className="font-bold text-lg">Active Deliveries</h2>
                    </div>
                    <div className="divide-y divide-[#2F3336]">
                        <div className="p-4 hover:bg-[#202327] transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#2563EB]/20 text-[#2563EB] flex items-center justify-center">
                                        <Box size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-[#E7E9EA] flex items-center gap-2">
                                            Ref ID: #LOG-8821
                                            <span className="bg-[#F91880] text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Urgent</span>
                                        </div>
                                        <div className="text-[#71767B] text-sm flex items-center gap-2 mt-0.5">
                                            <MapIcon size={12} /> Mumbai Depot <ArrowRight size={12} /> Pune (CRY)
                                            <span className="text-[#E7E9EA] font-medium ml-2">🕒 ETA: 2 Hours</span>
                                        </div>
                                    </div>
                                </div>
                                <ArrowRight className="text-[#71767B] group-hover:text-[#1D9BF0] transition-colors" />
                            </div>
                        </div>

                        <div className="p-4 hover:bg-[#202327] transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#00BA7C]/20 text-[#00BA7C] flex items-center justify-center">
                                        <Truck size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-[#E7E9EA]">Ref ID: #LOG-8822</div>
                                        <div className="text-[#71767B] text-sm flex items-center gap-2 mt-0.5">
                                            <MapIcon size={12} /> Thane Hub <ArrowRight size={12} /> SNEHA Center
                                            <span className="text-[#E7E9EA] font-medium ml-2">🕒 ETA: 45 Mins</span>
                                        </div>
                                    </div>
                                </div>
                                <ArrowRight className="text-[#71767B] group-hover:text-[#1D9BF0] transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
