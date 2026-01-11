"use client";
import React, { useState, useEffect } from 'react';
import { X, Camera } from 'lucide-react';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: {
        name: string;
        bio: string;
        location: string;
        website: string;
        avatar?: string;
        coverImage?: string;
    };
    onSave: (data: { name: string; bio: string; location: string; website: string }) => void;
}

export default function EditProfileModal({ isOpen, onClose, initialData, onSave }: EditProfileModalProps) {
    const [name, setName] = useState(initialData.name);
    const [bio, setBio] = useState(initialData.bio);
    const [location, setLocation] = useState(initialData.location);
    const [website, setWebsite] = useState(initialData.website);

    // Reset state when modal opens with fresh data
    useEffect(() => {
        if (isOpen) {
            setName(initialData.name);
            setBio(initialData.bio);
            setLocation(initialData.location);
            setWebsite(initialData.website);
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({ name, bio, location, website });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-black w-full max-w-[600px] rounded-2xl relative z-10 max-h-[90vh] overflow-y-auto border border-[#2F3336] shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 sticky top-0 bg-black/80 backdrop-blur-md z-20">
                    <div className="flex items-center gap-4">
                        <button onClick={onClose} className="p-2 hover:bg-[#EFF3F4]/10 rounded-full transition-colors">
                            <X size={20} className="text-[#EFF3F4]" />
                        </button>
                        <h2 className="text-xl font-bold text-[#E7E9EA]">Edit Profile</h2>
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-[#EFF3F4] text-black font-bold px-4 py-1.5 rounded-full hover:bg-[#D7DBDC] transition-colors text-sm"
                    >
                        Save
                    </button>
                </div>

                {/* Cover Image Simulation */}
                <div className="h-[200px] bg-[#333639] relative group cursor-pointer">
                    {initialData.coverImage && (
                        <img src={initialData.coverImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-75">
                        <div className="p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                            <Camera size={24} className="text-[#EFF3F4]" />
                        </div>
                    </div>
                </div>

                {/* Avatar Simulation */}
                <div className="px-4 relative mb-4">
                    <div className="w-[112px] h-[112px] rounded-full bg-black p-1 -mt-[56px] relative group cursor-pointer inline-block">
                        <img
                            src={initialData.avatar || "/default-avatar.png"}
                            className="w-full h-full rounded-full bg-slate-700 object-cover opacity-80 group-hover:opacity-60 transition-opacity border-4 border-black"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initialData.name)}&background=random`;
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                                <Camera size={20} className="text-[#EFF3F4]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="px-4 pb-8 space-y-6">
                    <div className="border border-[#2F3336] rounded px-2 py-1 focus-within:border-[#1D9BF0] group">
                        <label className="text-xs text-[#71767B] block group-focus-within:text-[#1D9BF0]">Name</label>
                        <input
                            type="text"
                            className="w-full bg-transparent text-[#E7E9EA] outline-none text-[17px] py-1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="border border-[#2F3336] rounded px-2 py-1 focus-within:border-[#1D9BF0] group">
                        <label className="text-xs text-[#71767B] block group-focus-within:text-[#1D9BF0]">Bio</label>
                        <textarea
                            className="w-full bg-transparent text-[#E7E9EA] outline-none text-[17px] py-1 resize-none h-[80px]"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            maxLength={160}
                        />
                    </div>

                    <div className="border border-[#2F3336] rounded px-2 py-1 focus-within:border-[#1D9BF0] group">
                        <label className="text-xs text-[#71767B] block group-focus-within:text-[#1D9BF0]">Location</label>
                        <input
                            type="text"
                            className="w-full bg-transparent text-[#E7E9EA] outline-none text-[17px] py-1"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div className="border border-[#2F3336] rounded px-2 py-1 focus-within:border-[#1D9BF0] group">
                        <label className="text-xs text-[#71767B] block group-focus-within:text-[#1D9BF0]">Website</label>
                        <input
                            type="text"
                            className="w-full bg-transparent text-[#E7E9EA] outline-none text-[17px] py-1"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
