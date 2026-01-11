"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Loader2, ArrowRight, Building, MapPin, Phone } from 'lucide-react';
import { authService, profileService } from '@/services/api';

export default function DonorSetupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        organization_type: 'Hotel',
        description: '',
        address: '',
        phone: '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCoverFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                alert("Session error, please sign in again");
                router.push('/auth/login');
                return;
            }

            let avatarUrl = '';
            let coverUrl = '';

            // Upload Avatar
            if (file) {
                const res = await profileService.uploadAvatar(userId, file);
                avatarUrl = res.data.avatar_url;
            }

            // Upload Cover
            if (coverFile) {
                const res = await profileService.uploadCoverImage(userId, coverFile);
                coverUrl = res.data.cover_image_url;
            }

            // Update Profile
            await profileService.update(userId, {
                name: formData.name,
                description: formData.description,
                organization_type: formData.organization_type,
                address: formData.address,
                phone: formData.phone,
                metadata: {
                    avatar: avatarUrl,
                    cover_image: coverUrl
                }
            });

            router.push('/dashboard/csr');

        } catch (err) {
            console.error(err);
            alert("Setup failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-2xl mx-auto w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-[#E7E9EA] rounded-full mb-4">
                        <Building className="text-black h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-[#E7E9EA]">
                        Set Up Your Donor Profile
                    </h2>
                    <p className="mt-2 text-[#71767B]">
                        Tell us about your organization so we can match you with the right NGOs
                    </p>
                </div>

                <div className="bg-black border border-[#2F3336] shadow-xl sm:rounded-2xl overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">

                        {/* Cover Image Upload (Optional) */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-[#E7E9EA] mb-2">Cover Image (Optional)</label>
                            <label className="cursor-pointer group relative block">
                                <div className="w-full h-32 rounded-lg bg-[#16181C] border-2 border-dashed border-[#2F3336] flex items-center justify-center group-hover:border-white transition-colors overflow-hidden">
                                    {coverFile ? (
                                        <img src={URL.createObjectURL(coverFile)} alt="Cover Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center">
                                            <Upload className="text-[#71767B] mx-auto mb-2" />
                                            <span className="text-xs text-[#71767B]">Upload banner (800×200 recommended)</span>
                                        </div>
                                    )}
                                </div>
                                <input type="file" className="hidden" onChange={handleCoverChange} accept="image/*" />
                            </label>
                        </div>

                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center mb-6 relative -mt-16">
                            <label className="cursor-pointer group relative">
                                <div className="w-24 h-24 rounded-full bg-black border-4 border-black flex items-center justify-center overflow-hidden shadow-lg relative z-10">
                                    <div className="w-full h-full bg-[#16181C] border-2 border-dashed border-[#2F3336] flex items-center justify-center group-hover:border-white transition-colors overflow-hidden rounded-full">
                                        {file ? (
                                            <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <Upload className="text-[#71767B]" />
                                        )}
                                    </div>
                                </div>
                                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                <span className="mt-2 block text-xs text-[#E7E9EA] font-bold text-center">Upload Logo</span>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#E7E9EA] mb-1">Organization Name *</label>
                            <input name="name" type="text" required className="w-full bg-black border border-[#2F3336] rounded-lg p-2 text-[#E7E9EA] focus:ring-2 focus:ring-white"
                                value={formData.name} onChange={handleChange} placeholder="Grand Hyatt Mumbai" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#E7E9EA] mb-1">Organization Type</label>
                            <select name="organization_type" className="w-full bg-black border border-[#2F3336] rounded-lg p-2 text-[#E7E9EA] focus:ring-2 focus:ring-white"
                                value={formData.organization_type} onChange={handleChange}>
                                <option value="Hotel">Hotel</option>
                                <option value="Restaurant">Restaurant</option>
                                <option value="Corporate">Corporate Office</option>
                                <option value="Factory">Factory</option>
                                <option value="ConfrenceCenter">Convention Center</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#E7E9EA] mb-1">Description</label>
                            <textarea name="description" rows={3} className="w-full bg-black border border-[#2F3336] rounded-lg p-2 text-[#E7E9EA] focus:ring-2 focus:ring-white"
                                value={formData.description} onChange={handleChange} placeholder="Brief description of your organization and typical surplus..."></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#E7E9EA] mb-1">Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#71767B]">
                                    <MapPin size={18} />
                                </div>
                                <input name="address" type="text" className="w-full pl-10 bg-black border border-[#2F3336] rounded-lg p-2 text-[#E7E9EA] focus:ring-2 focus:ring-white"
                                    value={formData.address} onChange={handleChange} placeholder="123 Main Street, Mumbai, India" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#E7E9EA] mb-1">Contact Phone</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#71767B]">
                                    <Phone size={18} />
                                </div>
                                <input name="phone" type="text" className="w-full pl-10 bg-black border border-[#2F3336] rounded-lg p-2 text-[#E7E9EA] focus:ring-2 focus:ring-white"
                                    value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#E7E9EA] text-black rounded-full py-3 font-bold hover:bg-[#D7DBDC] transition-colors border border-transparent flex justify-center items-center"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <>Complete Setup <ArrowRight className="ml-2 h-4 w-4" /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
