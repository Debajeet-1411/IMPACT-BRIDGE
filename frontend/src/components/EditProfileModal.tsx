"use client";
import { useState, useEffect } from 'react';
import { X, Save, Camera, Link, MapPin } from 'lucide-react';
import { profileService } from '@/services/api';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentProfile: any;
    onUpdate: () => void;
}

export default function EditProfileModal({ isOpen, onClose, currentProfile, onUpdate }: EditProfileModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        location: '',
        website: '',
        avatar: '',
        banner: ''
    });

    useEffect(() => {
        if (currentProfile) {
            setFormData({
                name: currentProfile.name || '',
                bio: currentProfile.bio || '',
                location: currentProfile.location || '',
                website: currentProfile.metadata_json?.website || '',
                avatar: currentProfile.metadata_json?.avatar || '',
                banner: currentProfile.metadata_json?.banner || ''
            });
        }
    }, [currentProfile, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await profileService.update(currentProfile.user_id, {
                name: formData.name,
                bio: formData.bio,
                location: formData.location,
                metadata_json: {
                    website: formData.website,
                    avatar: formData.avatar,
                    banner: formData.banner
                }
            });
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[rgba(91,112,131,0.4)] backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="bg-black border border-[#2F3336] w-full max-w-[600px] rounded-2xl relative z-10 shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-4 py-3 bg-[rgba(0,0,0,0.65)] backdrop-blur-md sticky top-0 z-20 border-b border-[#2F3336]">
                    <div className="flex items-center gap-4">
                        <button onClick={onClose} className="p-2 hover:bg-[#181818] rounded-full transition-colors">
                            <X size={20} />
                        </button>
                        <h2 className="font-bold text-xl">Edit Profile</h2>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-[#E7E9EA] text-black hover:bg-[#D7DBDC] px-4 py-1.5 rounded-full font-bold text-sm transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>

                <div className="p-4">
                    {/* Banner Input Mock */}
                    <div className="relative h-32 bg-[#333639] mb-4 group cursor-pointer overflow-hidden">
                        {formData.banner && <img src={formData.banner} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                                <Camera size={24} className="text-white" />
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Banner URL"
                            value={formData.banner}
                            onChange={e => setFormData({ ...formData, banner: e.target.value })}
                            className="absolute bottom-2 left-2 right-2 bg-black/70 border-none text-xs p-2 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                    </div>

                    {/* Avatar Input Mock */}
                    <div className="relative -mt-16 ml-4 w-28 h-28 z-10 mb-6 group cursor-pointer inline-block">
                        <div className="w-full h-full rounded-full border-4 border-black bg-[#16181C] overflow-hidden relative">
                            {formData.avatar ? (
                                <img src={formData.avatar} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-slate-700"></div>
                            )}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={24} />
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Avatar URL"
                            value={formData.avatar}
                            onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                            className="absolute -bottom-8 left-0 w-40 bg-[#16181C] border border-[#2F3336] text-xs p-2 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
                        />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="block px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent rounded border border-[#2F3336] focus:border-[#1D9BF0] focus:ring-0 peer text-white"
                                placeholder=" "
                            />
                            <label htmlFor="name" className="absolute text-sm text-[#71767B] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#1D9BF0]">
                                Name
                            </label>
                        </div>

                        <div className="relative group">
                            <textarea
                                id="bio"
                                rows={3}
                                value={formData.bio}
                                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                className="block px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent rounded border border-[#2F3336] focus:border-[#1D9BF0] focus:ring-0 peer text-white resize-none"
                                placeholder=" "
                            ></textarea>
                            <label htmlFor="bio" className="absolute text-sm text-[#71767B] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#1D9BF0]">
                                Bio
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                type="text"
                                id="location"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                className="block px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent rounded border border-[#2F3336] focus:border-[#1D9BF0] focus:ring-0 peer text-white"
                                placeholder=" "
                            />
                            <label htmlFor="location" className="absolute text-sm text-[#71767B] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#1D9BF0]">
                                Location
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                type="text"
                                id="website"
                                value={formData.website}
                                onChange={e => setFormData({ ...formData, website: e.target.value })}
                                className="block px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent rounded border border-[#2F3336] focus:border-[#1D9BF0] focus:ring-0 peer text-white"
                                placeholder=" "
                            />
                            <label htmlFor="website" className="absolute text-sm text-[#71767B] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#1D9BF0]">
                                Website
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
