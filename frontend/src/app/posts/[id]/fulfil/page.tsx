"use client";
import Sidebar from '@/components/Sidebar';
import { useParams, useRouter } from 'next/navigation';
import { Package, CheckCircle2, ArrowLeft, Building2 } from 'lucide-react';
import { useState } from 'react';

export default function FulfilRequestPage() {
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
                    <h1 className="text-xl font-bold">Fulfil Request</h1>
                </div>

                {step === 1 && (
                    <div className="p-6">
                        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 mb-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-[#2563EB]/10 rounded-xl text-[#2563EB]">
                                    <Package size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-1">Confirm Contribution</h2>
                                    <p className="text-[#71767B]">You are initiating a fulfilment for Post #{params.id?.slice(0, 8)}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-[#71767B] mb-2">Quantity to Pledge</label>
                                    <input type="number" placeholder="Enter quantity" className="w-full bg-black border border-[#2F3336] rounded-xl p-3 text-[#E7E9EA] focus:border-[#2563EB] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#71767B] mb-2">Message to NGO</label>
                                    <textarea placeholder="Add a note..." className="w-full bg-black border border-[#2F3336] rounded-xl p-3 text-[#E7E9EA] focus:border-[#2563EB] focus:outline-none h-24"></textarea>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-4 rounded-full font-bold text-lg transition-colors"
                        >
                            Confirm Pledge
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="p-12 text-center flex flex-col items-center justify-center h-[60vh]">
                        <CheckCircle2 size={64} className="text-[#00BA7C] mb-6 animate-bounce" />
                        <h2 className="text-3xl font-extrabold mb-4">Pledge Recorded!</h2>
                        <p className="text-[#71767B] mb-8 text-lg">
                            The NGO has been notified. You can track this in your <span className="text-[#2563EB]">CSR Dashboard</span>.
                        </p>
                        <div className="flex gap-4 w-full">
                            <button onClick={() => router.push('/feed')} className="flex-1 border border-[#536471] py-3 rounded-full font-bold hover:bg-[#EFF3F4]/10">Back to Feed</button>
                            <button onClick={() => router.push('/dashboard/csr')} className="flex-1 bg-[#E7E9EA] text-black py-3 rounded-full font-bold hover:bg-[#D7DBDC]">Go to Dashboard</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
