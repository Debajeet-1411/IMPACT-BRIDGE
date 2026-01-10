"use client";
import React, { useState } from 'react';
import { postService } from '@/services/api';
import { Image, MapPin, Calendar, AlertCircle, Package, Truck, ChevronDown, Edit3 } from 'lucide-react';
import RequestNeedModal from './RequestNeedModal';

export default function PostEditor({ onPostCreated }: { onPostCreated: () => void }) {
    const [isNeedModalOpen, setIsNeedModalOpen] = useState(false);

    // Placeholder for Update Modal (user said "Share Update" is smaller/simpler, 
    // we can implement a simple prompt or modal later, for now just an alert or dummy)
    const handleUpdateClick = () => {
        // Simple prompt for now as "Share Update" isn't the priority focus of this step
        // but we'll plan to build a modal for it too.
        alert("Update feature coming in next step!");
    };

    return (
        <>
            <div className="border-b border-[#2F3336] p-4 flex gap-4 items-center">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                        <span className="font-bold text-lg text-white">HF</span>
                    </div>
                </div>

                <div className="flex-1 flex gap-4">
                    <button
                        onClick={() => setIsNeedModalOpen(true)}
                        className="flex-1 bg-[#2563EB]/10 hover:bg-[#2563EB]/20 border border-[#2563EB]/50 text-[#2563EB] rounded-2xl p-4 text-left transition-all group"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <Package size={20} />
                            <span className="font-bold text-lg">Request Need</span>
                        </div>
                        <p className="text-sm text-[#2563EB]/70 group-hover:text-[#2563EB]">Ask for resources, funds, or logistics...</p>
                    </button>

                    <button
                        onClick={handleUpdateClick}
                        className="flex-1 bg-[#202327] hover:bg-[#2F3336] border border-[#2F3336] text-[#E7E9EA] rounded-2xl p-4 text-left transition-all group"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <Edit3 size={20} className="text-[#71767B] group-hover:text-[#E7E9EA]" />
                            <span className="font-bold text-lg">Share Update</span>
                        </div>
                        <p className="text-sm text-[#71767B] group-hover:text-[#E7E9EA]">Post progress, thank yours, or news...</p>
                    </button>
                </div>
            </div>

            <RequestNeedModal
                isOpen={isNeedModalOpen}
                onClose={() => setIsNeedModalOpen(false)}
                onPostCreated={onPostCreated}
            />
        </>
    );
}
