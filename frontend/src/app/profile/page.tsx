"use client";
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { MapPin, Link as LinkIcon, Calendar, ArrowLeft, Search } from 'lucide-react';
import RequestsTab from '@/components/profile/RequestsTab';
import CommitmentsTab from '@/components/profile/CommitmentsTab';
import DonationsTab from '@/components/profile/DonationsTab';
import ConnectionsTab from '@/components/profile/ConnectionsTab';
import ReviewsTab from '@/components/profile/ReviewsTab';
import { TopImpactorsWidget, UrgentNeedsWidget, HappeningsWidget } from '@/components/widgets/SidebarWidgets';
import EditProfileModal from '@/components/profile/EditProfileModal';
import { SAMPLE_REQUESTS, SAMPLE_COMMITMENTS, SAMPLE_TRANSACTIONS, SAMPLE_CONNECTIONS, SAMPLE_REVIEWS } from '@/data/seedData';

type TabType = 'Requests' | 'Commitments' | 'Donations' | 'Connections' | 'Reviews';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<TabType>('Requests');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [profile, setProfile] = useState({
        name: 'Hope Childcare',
        handle: '@hope_childcare',
        role: 'NGO', // Change to 'COMPANY' to test Reviews tab
        bio: 'Providing shelter, education, and care for orphaned children in Mumbai since 2010. We believe every child deserves a chance at a bright future.',
        location: 'Mumbai, India',
        website: 'hopechildcare.org',
        joined: 'Joined December 2025',
        stats: {
            following: 45,
            followers: 1256
        },
        avatar: '',
        cover_image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop'
    });

    // Calculate dynamic tabs based on role
    const tabs: TabType[] = ['Requests', 'Commitments', 'Donations', 'Connections'];
    if (profile.role === 'COMPANY') {
        tabs.push('Reviews');
    }

    const handleSaveProfile = (newData: { name: string; bio: string; location: string; website: string }) => {
        setProfile(prev => ({
            ...prev,
            ...newData
        }));
    };

    return (
        <div className="min-h-screen bg-black text-[#E7E9EA]">
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                initialData={{
                    name: profile.name,
                    bio: profile.bio,
                    location: profile.location,
                    website: profile.website,
                    avatar: profile.avatar,
                    coverImage: profile.cover_image
                }}
                onSave={handleSaveProfile}
            />

            <div className="flex justify-center max-w-[1265px] mx-auto">
                <header className="w-[275px] flex-shrink-0 relative max-xl:w-[88px]">
                    <Sidebar current="profile" />
                </header>

                <main className="w-[600px] border-x border-[#2F3336] min-h-screen pb-20">
                    {/* Sticky Header */}
                    <div className="sticky top-0 z-10 bg-black/65 backdrop-blur-md px-4 py-0.5 border-b border-[#2F3336] hidden sm:block">
                        <div className="flex items-center gap-6 h-[53px]">
                            <button className="p-2 -ml-2 rounded-full hover:bg-[rgba(239,243,244,0.1)] transition-colors">
                                <ArrowLeft size={20} />
                            </button>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold leading-6">{profile.name}</h1>
                                <span className="text-[13px] text-[#71767B]">{SAMPLE_REQUESTS.length} Requests</span>
                            </div>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="h-[200px] bg-[#333639] w-full bg-cover bg-center" style={{ backgroundImage: `url('${profile.cover_image}')` }}></div>

                    {/* Profile Header */}
                    <div className="px-4 pb-4 border-b border-[#2F3336]">
                        <div className="flex justify-between items-start">
                            <div className="w-[134px] h-[134px] rounded-full bg-black p-1 -mt-[15%]">
                                <img
                                    src={profile.avatar || "/logos/hope_childcare_logo_placeholder_or_use_seed.png"}
                                    alt={profile.name}
                                    className="w-full h-full rounded-full bg-slate-700 border-4 border-black object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=random&size=200`;
                                    }}
                                />
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="mt-3 bg-transparent border border-[#536471] text-[#EFF3F4] font-bold py-1.5 px-4 rounded-full hover:bg-[rgba(239,243,244,0.1)] transition-colors"
                            >
                                Edit profile
                            </button>
                        </div>

                        <div className="mt-2">
                            <h2 className="text-xl font-extrabold text-[#E7E9EA] leading-6">{profile.name}</h2>
                            <p className="text-[15px] text-[#71767B]">{profile.handle}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">
                                {profile.role}
                            </span>
                        </div>

                        <p className="mt-3 text-[15px] text-[#E7E9EA] leading-5 whitespace-pre-wrap">{profile.bio}</p>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[#71767B] text-[15px]">
                            <div className="flex items-center gap-1">
                                <MapPin size={18} />
                                {profile.location}
                            </div>
                            <div className="flex items-center gap-1">
                                <LinkIcon size={18} />
                                <a href="#" className="text-[#2563EB] hover:underline">{profile.website}</a>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar size={18} />
                                {profile.joined}
                            </div>
                        </div>

                        <div className="flex gap-5 mt-3 text-[14px]">
                            <div className="hover:underline cursor-pointer">
                                <span className="font-bold text-[#E7E9EA]">{profile.stats.following}</span>
                                <span className="text-[#71767B] ml-1">Following</span>
                            </div>
                            <div className="hover:underline cursor-pointer">
                                <span className="font-bold text-[#E7E9EA]">{profile.stats.followers}</span>
                                <span className="text-[#71767B] ml-1">Followers</span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-[#2F3336] overflow-x-auto hide-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className="flex-1 hover:bg-[#E7E9EA]/10 transition-colors h-[53px] relative flex items-center justify-center min-w-[100px] px-2"
                            >
                                <span className={`font-bold text-[15px] ${activeTab === tab ? 'text-[#E7E9EA]' : 'text-[#71767B]'}`}>
                                    {tab}
                                </span>
                                {activeTab === tab && <div className="absolute bottom-0 w-14 h-1 bg-[#2563EB] rounded-full"></div>}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div>
                        {activeTab === 'Requests' && <RequestsTab requests={SAMPLE_REQUESTS} />}
                        {activeTab === 'Commitments' && <CommitmentsTab commitments={SAMPLE_COMMITMENTS} />}
                        {activeTab === 'Donations' && <DonationsTab transactions={SAMPLE_TRANSACTIONS} />}
                        {activeTab === 'Connections' && <ConnectionsTab connections={SAMPLE_CONNECTIONS} />}
                        {activeTab === 'Reviews' && <ReviewsTab reviews={SAMPLE_REVIEWS} />}
                    </div>
                </main>

                <aside className="w-[350px] pl-8 py-3 hidden lg:block sticky top-0 h-screen overflow-y-auto hide-scrollbar">
                    <div className="sticky top-0 bg-black pb-3 z-10">
                        <div className="relative group">
                            <div className="absolute left-4 top-3 text-[#71767B] group-focus-within:text-[#2563EB]">
                                <Search size={20} />
                            </div>
                            <input type="text" placeholder="Search" className="w-full bg-[#202327] text-[#E7E9EA] rounded-full py-3 pl-12 pr-4 border-none focus:ring-1 focus:ring-[#2563EB] placeholder-[#71767B] focus:bg-black" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 pb-20">
                        <TopImpactorsWidget />
                        <UrgentNeedsWidget />
                        <HappeningsWidget />
                    </div>
                </aside>
            </div>
        </div>
    );
}
