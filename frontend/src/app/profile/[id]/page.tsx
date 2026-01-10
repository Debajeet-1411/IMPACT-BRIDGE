"use client";
import Sidebar from '@/components/Sidebar';
import PostCard from '@/components/PostCard';
import { ArrowLeft, Calendar, Link as LinkIcon, MapPin, MoreHorizontal, Mail, ShieldCheck, BadgeCheck, Users, Home, Clock, Phone, AlertTriangle, Zap, Search, Award, CheckCircle2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { profileService, postService } from '@/services/api';
import EditProfileModal from '@/components/EditProfileModal';

export default function ProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Posts');

    const userId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
    // Mock check if this is "my" profile - in reality check auth token ID vs route ID
    const isMyProfile = true;

    const fetchProfileData = async () => {
        try {
            const profileData = await profileService.get(userId);
            setProfile(profileData.data);

            // Fetch user's posts
            // Ideally backend filters by user_id, here we filter client side mock
            const allPosts = await postService.getAll();
            setPosts(allPosts.data.filter((p: any) => p.user_id === userId));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchProfileData();
        }
    }, [userId]);

    if (loading) return <div className="bg-black min-h-screen text-white flex items-center justify-center">Loading...</div>;
    if (!profile) return <div className="bg-black min-h-screen text-white flex items-center justify-center">Profile not found</div>;

    const bannerUrl = profile.metadata_json?.banner || 'https://pbs.twimg.com/profile_banners/1599694467026788354/1676643324/1500x500';
    const avatarUrl = profile.metadata_json?.avatar || profile.avatar;
    const website = profile.metadata_json?.website || '';

    // Mock metadata for other tabs
    const metadata = profile.metadata_json || {};

    return (
        <div className="min-h-screen bg-black text-[#E7E9EA] layout-container">
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                currentProfile={profile}
                onUpdate={fetchProfileData}
            />

            <div className="flex justify-center w-full max-w-[1265px] mx-auto">
                {/* Left Sidebar */}
                <header className="w-[275px] flex-shrink-0 relative max-xl:w-[88px]">
                    <Sidebar current="profile" />
                </header>

                {/* Main Content */}
                <main className="w-[600px] border-x border-[#2F3336] min-h-screen relative">
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-black/60 backdrop-blur-md px-4 py-1 flex items-center gap-6">
                        <button onClick={() => router.back()} className="p-2 hover:bg-[#EFF3F4]/10 rounded-full transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h2 className="font-bold text-xl leading-6">{profile.name}</h2>
                            <p className="text-[#71767B] text-[13px]">{posts.length} posts</p>
                        </div>
                    </div>

                    {/* Banner */}
                    <div className="h-[200px] bg-[#333639] relative">
                        <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                    </div>

                    {/* Profile Actions */}
                    <div className="px-4 relative mb-4">
                        <div className="absolute -top-[70px] left-4 border-4 border-black rounded-full w-[134px] h-[134px] bg-black overflow-hidden">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                                    <span className="text-4xl">{profile.name[0]}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end pt-3 gap-2">
                            <button className="p-2 border border-[#536471] rounded-full hover:bg-[rgba(239,243,244,0.1)] transition-colors">
                                <MoreHorizontal size={20} />
                            </button>
                            <button className="p-2 border border-[#536471] rounded-full hover:bg-[rgba(239,243,244,0.1)] transition-colors">
                                <Mail size={20} />
                            </button>
                            {isMyProfile ? (
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="border border-[#536471] font-bold px-4 py-1.5 rounded-full hover:bg-[rgba(239,243,244,0.1)] transition-colors"
                                >
                                    Edit profile
                                </button>
                            ) : (
                                <button className="bg-[#EFF3F4] text-black font-bold px-4 py-1.5 rounded-full hover:bg-[#D7DBDC] transition-colors">
                                    Follow
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="px-4 mb-4">
                        <h1 className="font-extrabold text-xl leading-6 flex items-center gap-1">
                            {profile.name}
                            {profile.is_verified && <BadgeCheck size={20} className="text-[#2563EB]" fill="#2563EB" color="black" />}
                        </h1>
                        <div className="text-[#71767B] text-[15px] mb-3">@{profile.name.replace(/\s+/g, '_').toLowerCase()}</div>

                        {profile.bio && <div className="mb-3 whitespace-pre-wrap">{profile.bio}</div>}

                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#71767B] text-[15px] mb-3">
                            {profile.location && (
                                <span className="flex items-center gap-1">
                                    <MapPin size={18} /> {profile.location}
                                </span>
                            )}
                            {website && (
                                <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" className="flex items-center gap-1 text-[#1D9BF0] hover:underline">
                                    <LinkIcon size={18} className="text-[#71767B]" /> {website.replace(/^https?:\/\//, '')}
                                </a>
                            )}
                            <span className="flex items-center gap-1">
                                <Calendar size={18} /> Joined December 2025
                            </span>
                        </div>

                        <div className="flex gap-5 text-[14px]">
                            <span className="hover:underline cursor-pointer"><span className="font-bold text-[#E7E9EA]">45</span> <span className="text-[#71767B]">Following</span></span>
                            <span className="hover:underline cursor-pointer"><span className="font-bold text-[#E7E9EA]">1.2M</span> <span className="text-[#71767B]">Followers</span></span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-[#2F3336]">
                        {['Posts', 'Replies', 'Highlights', 'Media', 'Likes'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className="flex-1 hover:bg-[#EFF3F4]/10 transition-colors h-[53px] relative font-medium text-[#71767B]"
                            >
                                {tab}
                                {activeTab === tab && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#2563EB] rounded-full"></div>}
                            </button>
                        ))}
                    </div>

                    {/* Timeline */}
                    <div className="pb-64">
                        {posts.map((post: any) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </main>

                {/* Right Sidebar - AI & Contacts */}
                <aside className="w-[350px] pl-8 py-3 hidden lg:block sticky top-0 h-screen overflow-y-auto">
                    {/* Search */}
                    <div className="sticky top-0 bg-black pb-3 z-10">
                        <div className="relative group">
                            <div className="absolute left-4 top-3 text-[#71767B] group-focus-within:text-[#2563EB]">
                                <Search size={20} />
                            </div>
                            <input type="text" placeholder="Search this profile" className="w-full bg-[#202327] text-[#E7E9EA] rounded-full py-3 pl-12 pr-4 border-none focus:ring-1 focus:ring-[#2563EB] placeholder-[#71767B] focus:bg-black" />
                        </div>
                    </div>

                    {/* AI Insights - "Hackathon Gold" */}
                    <div className="bg-[#16181C] rounded-2xl border border-[#2F3336] overflow-hidden mb-4">
                        <div className="px-4 py-3 border-b border-[#2F3336] flex items-center justify-between">
                            <h2 className="font-extrabold text-lg flex items-center gap-2">
                                <Zap size={18} className="text-[#2563EB]" fill="#2563EB" />
                                AI Impact Insights
                            </h2>
                        </div>
                        <div className="p-4">
                            <div className="mb-4">
                                <div className="text-[#71767B] text-xs font-bold uppercase mb-2">Shortage Prediction</div>
                                <div className="p-3 bg-[#F91880]/10 border border-[#F91880]/30 rounded-xl text-[#F91880] text-sm font-medium flex items-start gap-2">
                                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                                    Predicted shortage of 'Winter Clothes' in next 14 days based on weather forecast.
                                </div>
                            </div>
                            <div>
                                <div className="text-[#71767B] text-xs font-bold uppercase mb-2">Suggested Donors</div>
                                <div className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-[#202327] p-1 rounded">
                                    <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                                    <div className="text-sm font-bold text-[#E7E9EA]">Zara India Retail</div>
                                </div>
                                <div className="flex items-center gap-2 cursor-pointer hover:bg-[#202327] p-1 rounded">
                                    <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                                    <div className="text-sm font-bold text-[#E7E9EA]">H&M CSR Division</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Accountability */}
                    <div className="bg-[#16181C] rounded-2xl border border-[#2F3336] overflow-hidden">
                        <h2 className="font-extrabold text-lg px-4 py-3 border-b border-[#2F3336]">
                            Contact & Accountability
                        </h2>
                        <div className="p-4 space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#2563EB]/20 flex items-center justify-center text-[#2563EB] font-bold">
                                    {profile.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-[#E7E9EA]">Director / Trustee</div>
                                    <div className="text-[#71767B]">Dr. Priya Sharma</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-[#E7E9EA]">
                                <Mail size={16} className="text-[#71767B]" />
                                contact@{profile.name.split(' ')[0].toLowerCase()}.org
                            </div>
                            <div className="flex items-center gap-2 text-[#E7E9EA]">
                                <Phone size={16} className="text-[#71767B]" />
                                +91 98765 43210
                            </div>

                            <div className="pt-2 border-t border-[#2F3336]">
                                <div className="text-[#71767B] text-xs uppercase font-bold mb-1">Trust Score</div>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-[#FFD400]">
                                        {[1, 2, 3, 4, 5].map(s => <Zap key={s} size={14} fill="#FFD400" className={s < 5 ? "" : "opacity-30"} />)}
                                    </div>
                                    <span className="font-bold text-[#E7E9EA]">4.8/5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
