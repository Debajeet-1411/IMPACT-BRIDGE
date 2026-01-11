"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api';
import { Users, Building2, Truck, Landmark, Upload, ArrowRight, Check } from 'lucide-react';

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        role: '',
        companyName: '',
        description: '',
        location: '',
        website: '',
        avatar: ''
    });

    // Check for pending auth
    useEffect(() => {
        const pendingEmail = localStorage.getItem('onboarding_email');
        if (!pendingEmail) {
            router.push('/auth/login');
        }
    }, [router]);

    const handleRoleSelect = (role: string) => {
        setFormData({ ...formData, role });
        setStep(2);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const email = localStorage.getItem('onboarding_email');
            const name = localStorage.getItem('onboarding_name'); // From Google

            await authService.completeOnboarding({
                ...formData,
                email,
                name: formData.companyName || name // Prefer company name if provided
            });

            // Cleanup
            localStorage.removeItem('onboarding_email');
            localStorage.removeItem('onboarding_name');

            router.push('/home');
        } catch (error) {
            console.error('Onboarding failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-[#E7E9EA] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Progress Bar */}
                <div className="flex justify-between mb-8 px-2 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-[#2F3336] -z-10 rounded-full"></div>
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-[#1D9BF0] -z-10 rounded-full transition-all duration-300"
                        style={{ width: step === 1 ? '50%' : '100%' }}
                    ></div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 1 ? 'bg-black border-[#1D9BF0] text-[#1D9BF0]' : 'bg-[#2F3336] border-transparent'}`}>1</div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 2 ? 'bg-black border-[#1D9BF0] text-[#1D9BF0]' : 'bg-[#16181C] border-[#2F3336] text-[#71767B]'}`}>2</div>
                </div>

                <h1 className="text-3xl font-extrabold text-center mb-2">Welcome to Impact Bridge</h1>
                <p className="text-[#71767B] text-center mb-10">Let's set up your profile to start making an impact.</p>

                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold mb-6">Choose your role</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { id: 'NGO', icon: Users, label: 'NGO / Non-Profit', desc: 'I want to post needs and receive help.' },
                                { id: 'COMPANY', icon: Building2, label: 'Corporate Donor', desc: 'I have surplus resources to donate.' },
                                { id: 'LOGISITCS', icon: Truck, label: 'Logistics Partner', desc: 'I can help transport goods.' },
                                { id: 'GOVT', icon: Landmark, label: 'Government', desc: 'I verify impacts and provide oversight.' }
                            ].map((role) => (
                                <button
                                    key={role.id}
                                    onClick={() => handleRoleSelect(role.id)}
                                    className="p-6 rounded-2xl border border-[#2F3336] hover:border-[#1D9BF0] hover:bg-[#1D9BF0]/10 transition-all text-left flex flex-col gap-3 group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#2F3336] group-hover:bg-[#1D9BF0] flex items-center justify-center transition-colors text-white">
                                        <role.icon size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">{role.label}</div>
                                        <div className="text-[#71767B] text-sm group-hover:text-[#E7E9EA] transition-colors">{role.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                        <div className="bg-[#16181C] border border-[#2F3336] rounded-2xl p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-[#71767B] mb-2 uppercase">Organization Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    required
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className="w-full bg-black border border-[#2F3336] rounded-lg p-3 text-white focus:border-[#1D9BF0] focus:outline-none transition-colors"
                                    placeholder="e.g. Hope Foundation"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#71767B] mb-2 uppercase">Description</label>
                                <textarea
                                    name="description"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full bg-black border border-[#2F3336] rounded-lg p-3 text-white focus:border-[#1D9BF0] focus:outline-none transition-colors resize-none"
                                    placeholder="Tell us what you do..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#71767B] mb-2 uppercase">Location (City)</label>
                                <input
                                    type="text"
                                    name="location"
                                    required
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full bg-black border border-[#2F3336] rounded-lg p-3 text-white focus:border-[#1D9BF0] focus:outline-none transition-colors"
                                    placeholder="e.g. Mumbai"
                                />
                            </div>

                            <div className="pt-4 flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-[#2F3336] flex items-center justify-center text-[#71767B] border border-dashed border-[#536471]">
                                    <Upload size={20} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm">Profile Photo</div>
                                    <div className="text-xs text-[#71767B]">JPG, PNG max 2MB</div>
                                    <button type="button" className="text-[#1D9BF0] text-xs font-bold mt-1 hover:underline">Upload Image</button>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="flex-1 py-3 rounded-full font-bold border border-[#536471] hover:bg-[#EFF3F4]/10 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-[2] py-3 rounded-full font-bold bg-[#E7E9EA] text-black hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? 'Creating Profile...' : <>Complete Setup <Check size={18} /></>}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
