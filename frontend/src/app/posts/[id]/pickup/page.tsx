"use client";
import Sidebar from '@/components/Sidebar';
import { useParams, useRouter } from 'next/navigation';
import { Truck, CheckCircle2, ArrowLeft, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function SchedulePickupPage() {
    const params = useParams();
    const router = useRouter();
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-black text-[#E7E9EA] font-sans flex justify-center">
            <header className="w-[275px] flex-shrink-0 relative max-xl:w-[88px]">
                <Sidebar current="feed" />
            </header>

            <main className="w-full max-w-[600px] border-x border-[#2F3336] min-h-screen p-0">
                <div className="sticky top-0 z-10 bg-black/85 backdrop-blur-md px-4 py-3 border-b border-[#2F3336] flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-[#EFF3F4]/10 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-bold">Schedule Logistics</h1>
                </div>

                {step === 1 && (
                    <div className="p-6">
                        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 mb-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-[#1D9BF0]/10 rounded-xl text-[#1D9BF0]">
                                    <Truck size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-1">Logistics Details</h2>
                                    <p className="text-[#71767B]">Arranging transport for Post #{params.id?.slice(0, 8)}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-[#71767B] mb-2">Pickup Date</label>
                                    <input type="date" className="w-full bg-black border border-[#2F3336] rounded-xl p-3 text-[#E7E9EA] focus:border-[#1D9BF0] focus:outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-[#71767B] mb-2">Vehicle Type</label>
                                        <select className="w-full bg-black border border-[#2F3336] rounded-xl p-3 text-[#E7E9EA] focus:border-[#1D9BF0] focus:outline-none">
                                            <option>Small Van</option>
                                            <option>Truck (14ft)</option>
                                            <option>Bike</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#71767B] mb-2">Weight Est.</label>
                                        <input type="text" placeholder="e.g. 50kg" className="w-full bg-black border border-[#2F3336] rounded-xl p-3 text-[#E7E9EA] focus:border-[#1D9BF0] focus:outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            className="w-full bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white py-4 rounded-full font-bold text-lg transition-colors"
                        >
                            Confirm Pickup
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="p-12 text-center flex flex-col items-center justify-center h-[60vh]">
                        <CheckCircle2 size={64} className="text-[#00BA7C] mb-6 animate-bounce" />
                        <h2 className="text-3xl font-extrabold mb-4">Pickup Scheduled!</h2>
                        <p className="text-[#71767B] mb-8 text-lg">
                            Track the vehicle status in the <span className="text-[#1D9BF0]">Logistics Panel</span>.
                        </p>
                        <div className="flex gap-4 w-full">
                            <button onClick={() => router.push('/home')} className="flex-1 border border-[#536471] py-3 rounded-full font-bold hover:bg-[#EFF3F4]/10">Back to Feed</button>
                            <button onClick={() => router.push('/dashboard/logistics')} className="flex-1 bg-[#E7E9EA] text-black py-3 rounded-full font-bold hover:bg-[#D7DBDC]">Go to Panel</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
