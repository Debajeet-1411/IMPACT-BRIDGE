"use client";
import Sidebar from '@/components/Sidebar';
import { MapPin, Link as LinkIcon, Calendar, ArrowLeft, Mail, Search } from 'lucide-react';

export default function ProfilePage() {
    const profile = {
        name: 'Hope Childcare',
        handle: '@hope_childcare',
        role: 'NGO',
        bio: 'Providing shelter, education, and care for orphaned children in Mumbai since 2010. We believe every child deserves a chance at a bright future.',
        location: 'Mumbai, India',
        website: 'hopechildcare.org',
        joined: 'Joined December 2025',
        stats: {
            following: 45,
            followers: 1256
        }
    };

    return (
        <div className="min-h-screen bg-black text-[#E7E9EA]">
            <div className="flex justify-center max-w-[1265px] mx-auto">
                <header className="w-[275px] flex-shrink-0 relative max-xl:w-[88px]">
                    <Sidebar current="profile" />
                </header>

                <main className="w-[600px] border-x border-[#2F3336] min-h-screen">
                    {/* Sticky Header */}
                    <div className="sticky top-0 z-10 bg-black/65 backdrop-blur-md px-4 py-0.5 border-b border-[#2F3336] hidden sm:block">
                        <div className="flex items-center gap-6 h-[53px]">
                            <button className="p-2 -ml-2 rounded-full hover:bg-[rgba(239,243,244,0.1)] transition-colors">
                                <ArrowLeft size={20} />
                            </button>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold leading-6">{profile.name}</h1>
                                <span className="text-[13px] text-[#71767B]">354 posts</span>
                            </div>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="h-[200px] bg-[#333639] w-full"></div>

                    {/* Profile Header */}
                    <div className="px-4 pb-4 border-b border-[#2F3336]">
                        <div className="flex justify-between items-start">
                            <div className="w-[134px] h-[134px] rounded-full bg-black p-1 -mt-[15%]">
                                <div className="w-full h-full rounded-full bg-slate-700 border-4 border-black"></div>
                            </div>
                            <button className="mt-3 bg-transparent border border-[#536471] text-[#EFF3F4] font-bold py-1.5 px-4 rounded-full hover:bg-[rgba(239,243,244,0.1)] transition-colors">
                                Edit profile
                            </button>
                        </div>

                        <div className="mt-2">
                            <h2 className="text-xl font-extrabold text-[#E7E9EA] leading-6">{profile.name}</h2>
                            <p className="text-[15px] text-[#71767B]">{profile.handle}</p>
                        </div>

                        <p className="mt-3 text-[15px] text-[#E7E9EA] leading-5">{profile.bio}</p>

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
                    <div className="flex border-b border-[#2F3336]">
                        {['Posts', 'Replies', 'Highlights', 'Media', 'Likes'].map((tab, i) => (
                            <button key={i} className="flex-1 hover:bg-[#E7E9EA]/10 transition-colors h-[53px] relative flex items-center justify-center">
                                <span className={`font-bold text-[15px] ${i === 0 ? 'text-[#E7E9EA]' : 'text-[#71767B]'}`}>
                                    {tab}
                                </span>
                                {i === 0 && <div className="absolute bottom-0 w-14 h-1 bg-[#2563EB] rounded-full"></div>}
                            </button>
                        ))}
                    </div>

                    {/* Placeholder Feed */}
                    <div className="p-8 text-center text-[#71767B]">
                        No posts to show
                    </div>
                </main>

                <aside className="w-[350px] pl-8 py-3 hidden lg:block sticky top-0 h-screen overflow-y-auto">
                    <div className="sticky top-0 bg-black pb-3 z-10">
                        <div className="relative group">
                            <div className="absolute left-4 top-3 text-[#71767B] group-focus-within:text-[#2563EB]">
                                <Search size={20} />
                            </div>
                            <input type="text" placeholder="Search" className="w-full bg-[#202327] text-[#E7E9EA] rounded-full py-3 pl-12 pr-4 border-none focus:ring-1 focus:ring-[#2563EB] placeholder-[#71767B] focus:bg-black" />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
