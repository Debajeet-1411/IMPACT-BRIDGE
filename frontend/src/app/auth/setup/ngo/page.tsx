"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Loader2, ArrowRight, Building2, MapPin, Phone, FileText, Users } from 'lucide-react';
import { authService, profileService } from '@/services/api';
// Workaround for jwt-decode if not installed: simple parse

function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


export default function NGOSetupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        phone: '',
        accepted_donation_types: 'Food', // Simple select for now
        capacity: '',
        urgency_level: 5
    });
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("No token found");

            // Decode token to get user_id (sub is email, need to fetch profile first to get ID? 
            // Actually backend update_profile uses user_id in URL.
            // Wait, standard JWT usually has 'sub' as ID or explicit ID. 
            // My backend uses email as 'sub'.

            // Strategy: Login returns token. 
            // API needs /api/profiles/{user_id}. 
            // User ID is UUID.
            // I need to fetch current user or profile first? 
            // Or updates logic to use 'me' alias? 
            // Backend api/profiles/{user_id}.
            // Problem: Frontend doesn't know UUID from token (only email).

            // FAST FIX: Add /api/auth/me or similar, OR trust the backend to look up by Token?
            // Profiles API requires user_id.
            // Let's assume for now I need to GET /api/auth/me or verify against lookup.
            // BUT current backend endpoints use user_id explicitly.

            // Better approach: I update the Profile using the email (sub) from the token?
            // No, Profiles API expects UUID.

            // Let's fetch the profile first using the email? No, endpoint is by UUID.

            // Quickest Fix: Decode token -> check if "id" is present. 
            // Backend logic: 
            // `access_token = security.create_access_token(data={"sub": user.email, "role": user.role})`
            // It DOES NOT put UUID in token.

            // I will update Login/Signup response to return user_id as well!
            // OR I create a endpoint to get 'me'.

            // Let's rely on `devLogin` response which is just token.
            // I will assume for this implementation that I will first fetch "me" or 
            // update `auth.py` to return user_id in the token response body.

            // Since I control backend, I will UPDATING auth.py to return user_id is best.
            // I'll do that in task boundary next.

            // For now, I'll fetch `/api/auth/me` (IF IT EXISTED) or assumes I can get it.
            // Actually, I can use a hack: loop through all profiles? No.

            // OK, I'll add `user_id` to the Signup/Login response in `auth.py`.
            // For this file, I'll assume I have `localStorage.getItem('user_id')`.

            const userId = localStorage.getItem('user_id');
            if (!userId) {
                alert("Session error, please sign in again");
                router.push('/auth/login');
                return;
            }

            // Upload Avatar
            if (file) {
                await profileService.uploadAvatar(userId, file);
            }

            // Update Profile
            await profileService.update(userId, {
                name: formData.name,
                description: formData.description,
                address: formData.address,
                phone: formData.phone,
                capacity: formData.capacity,
                urgency_level: formData.urgency_level,
                accepted_donation_types: [formData.accepted_donation_types]
            });

            router.push('/dashboard');

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
                    <div className="inline-flex items-center justify-center p-3 bg-[rgba(37,99,235,0.1)] rounded-full mb-4">
                        <Building2 className="text-[#2563EB] h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-[#E7E9EA]">
                        Set Up Your NGO Profile
                    </h2>
                    <p className="mt-2 text-[#71767B]">
                        Help donors find and support your organization
                    </p>
                </div>

                <div className="bg-black border border-[#2F3336] shadow-xl sm:rounded-2xl overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center mb-6">
                            <label className="cursor-pointer group relative">
                                <div className="w-24 h-24 rounded-full bg-[#16181C] border-2 border-dashed border-[#2F3336] flex items-center justify-center group-hover:border-[#2563EB] transition-colors overflow-hidden">
                                    {file ? (
                                        <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <Upload className="text-[#71767B]" />
                                    )}
                                </div>
                                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                <span className="mt-2 block text-xs text-[#2563EB] font-bold text-center">Upload Logo</span>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#E7E9EA] mb-1">Organization Name *</label>
                            <input name="name" type="text" required className="w-full bg-black border border-[#2F3336] rounded-lg p-2 text-[#E7E9EA] focus:ring-2 focus:ring-[#2563EB]"
                                value={formData.name} onChange={handleChange} placeholder="Hope Foundation" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#E7E9EA] mb-1">Description</label>
                            <textarea name="description" rows={3} className="w-full bg-black border border-[#2F3336] rounded-lg p-2 text-[#E7E9EA] focus:ring-2 focus:ring-[#2563EB]"
                                value={formData.description} onChange={handleChange} placeholder="Describe your mission..."></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#E7E9EA] mb-1">Accepted Donation Types</label>
                            <select name="accepted_donation_types" className="w-full bg-black border border-[#2F3336] rounded-lg p-2 text-[#E7E9EA] focus:ring-2 focus:ring-[#2563EB]"
                                value={formData.accepted_donation_types} onChange={handleChange}>
                                <option value="Food">Food</option>
                                <option value="Supplies">Supplies</option>
                                <option value="Both">Both Food & Supplies</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#E7E9EA] mb-1">Capacity (units you can receive)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Users className="h-5 w-5 text-[#71767B]" /> {/* Corrected Icon usage if defined, assume simplified */}
                                </div>
                                <input name="capacity" type="text" className="w-full pl-10 bg-black border border-[#2F3336] rounded-lg p-2 text-[#E7E9EA] focus:ring-2 focus:ring-[#2563EB]"
                                    value={formData.capacity} onChange={handleChange} placeholder="e.g., 100" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#E7E9EA] mb-1 flex justify-between">
                                <span>Current Urgency Level</span>
                                <span className="text-[#2563EB]">{formData.urgency_level}/10</span>
                            </label>
                            <input name="urgency_level" type="range" min="1" max="10" className="w-full h-2 bg-[#2F3336] rounded-lg appearance-none cursor-pointer"
                                value={formData.urgency_level} onChange={(e) => setFormData({ ...formData, urgency_level: parseInt(e.target.value) })} />
                            <p className="text-xs text-[#71767B] mt-1">Higher urgency = priority matching with donors</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#E7E9EA] mb-1">Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#71767B]">
                                    <MapPin size={18} />
                                </div>
                                <input name="address" type="text" className="w-full pl-10 bg-black border border-[#2F3336] rounded-lg p-2 text-[#E7E9EA] focus:ring-2 focus:ring-[#2563EB]"
                                    value={formData.address} onChange={handleChange} placeholder="123 Main Street, Mumbai, India" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#E7E9EA] mb-1">Contact Phone</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#71767B]">
                                    <Phone size={18} />
                                </div>
                                <input name="phone" type="text" className="w-full pl-10 bg-black border border-[#2F3336] rounded-lg p-2 text-[#E7E9EA] focus:ring-2 focus:ring-[#2563EB]"
                                    value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#0F1419] text-white rounded-full py-3 font-bold hover:bg-[#1D2B3A] transition-colors border border-transparent hover:border-[#2F3336] flex justify-center items-center"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <>Complete Setup <ArrowRight className="ml-2 h-4 w-4" /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
