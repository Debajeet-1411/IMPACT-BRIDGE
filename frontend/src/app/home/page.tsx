"use client";
import Sidebar from '@/components/Sidebar';
import PostEditor from '@/components/PostEditor';
import PostCard from '@/components/PostCard';
import { useState, useEffect } from 'react';
import { postService } from '@/services/api';
import { Search, MoreHorizontal, Zap, AlertTriangle, TrendingUp, Users } from 'lucide-react';

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'PRIORITY' | 'NEARBY' | 'IMPACT'>('PRIORITY');

  const fetchPosts = async () => {
    try {
      const response = await postService.getAll(0, 100);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter Logic
  const filteredPosts = posts.filter(post => {
    if (activeTab === 'PRIORITY') return post.type === 'NEED'; // Show strict needs
    if (activeTab === 'NEARBY') return post.type === 'AVAILABILITY'; // Show corporate/resource offers
    if (activeTab === 'IMPACT') return post.type === 'UPDATE' || post.type === 'FULFILLED';
    return true;
  });

  // Mock AI Insights data
  const aiInsights = [
    { icon: Zap, text: "5 donors nearby can fulfill 'Winter Clothes' requests", color: "text-[#2563EB]" },
    { icon: AlertTriangle, text: "Predicted food shortage in Pune district next 7 days", color: "text-[#F91880]" },
    { icon: Users, text: "3 Corproates viewing your recent match request", color: "text-[#2563EB]" }
  ];

  return (
    <div className="min-h-screen bg-black text-[#E7E9EA] layout-container">
      <div className="flex justify-center w-full max-w-[1265px] mx-auto">
        {/* Left Sidebar (275px) - Fixed */}
        <header className="w-[275px] flex-shrink-0 relative max-xl:w-[88px]">
          <Sidebar current="feed" />
        </header>

        {/* Main Feed (600px) - Scrollable */}
        <main className="w-[600px] border-x border-[#2F3336] min-h-screen">
          <div className="sticky top-0 z-10 bg-black/85 backdrop-blur-md border-b border-[#2F3336] px-4">
            <div className="flex justify-around h-[53px]">
              <button
                onClick={() => setActiveTab('PRIORITY')}
                className={`flex-1 hover:bg-[#E7E9EA]/10 transition-colors relative ${activeTab === 'PRIORITY' ? 'text-[#E7E9EA]' : 'text-[#71767B]'}`}
              >
                <span className={`font-bold text-[15px] ${activeTab === 'PRIORITY' ? '' : 'font-medium'}`}>Priority Needs</span>
                {activeTab === 'PRIORITY' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#2563EB] rounded-full"></div>}
              </button>
              <button
                onClick={() => setActiveTab('NEARBY')}
                className={`flex-1 hover:bg-[#E7E9EA]/10 transition-colors relative ${activeTab === 'NEARBY' ? 'text-[#E7E9EA]' : 'text-[#71767B]'}`}
              >
                <span className={`font-bold text-[15px] ${activeTab === 'NEARBY' ? '' : 'font-medium'}`}>Nearby Help</span>
                {activeTab === 'NEARBY' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#2563EB] rounded-full"></div>}
              </button>
              <button
                onClick={() => setActiveTab('IMPACT')}
                className={`flex-1 hover:bg-[#E7E9EA]/10 transition-colors relative ${activeTab === 'IMPACT' ? 'text-[#E7E9EA]' : 'text-[#71767B]'}`}
              >
                <span className={`font-bold text-[15px] ${activeTab === 'IMPACT' ? '' : 'font-medium'}`}>Impact</span>
                {activeTab === 'IMPACT' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#2563EB] rounded-full"></div>}
              </button>
            </div>
          </div>

          <PostEditor onPostCreated={fetchPosts} />

          <div className="pb-64">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post: any) => (
                <PostCard
                  key={post.id}
                  post={post}
                  actionLabel={activeTab === 'NEARBY' ? 'Request' : undefined}
                />
              ))
            ) : (
              <div className="p-8 text-center text-[#71767B]">
                <div className="flex flex-col items-center justify-center p-8 border border-dashed border-[#2F3336] rounded-2xl bg-[#16181C]">
                  <p className="mb-2">No active requests found.</p>
                  <button className="text-[#2563EB] hover:underline text-sm font-bold">Refresh Feed</button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar (350px) */}
        <aside className="w-[350px] pl-8 py-3 hidden lg:block sticky top-0 h-screen overflow-y-auto">
          {/* Search */}
          <div className="sticky top-0 bg-black pb-3 z-10">
            <div className="relative group">
              <div className="absolute left-4 top-3 text-[#71767B] group-focus-within:text-[#2563EB]">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search NGOs, items, locations..."
                className="w-full bg-[#202327] text-[#E7E9EA] rounded-full py-3 pl-12 pr-4 border-none focus:ring-1 focus:ring-[#2563EB] placeholder-[#71767B] focus:bg-black"
              />
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="bg-[#16181C] rounded-2xl border border-[#2F3336] overflow-hidden mb-4">
            <div className="px-4 py-3 border-b border-[#2F3336] flex items-center justify-between">
              <h2 className="font-extrabold text-lg flex items-center gap-2">
                <Zap size={18} className="text-[#2563EB]" fill="#2563EB" />
                AI Impact Insights
              </h2>
            </div>
            <div className="divide-y divide-[#2F3336]">
              {aiInsights.map((insight, i) => (
                <div key={i} className="px-4 py-3 hover:bg-[#1D1F23] cursor-pointer transition-colors flex items-start gap-3">
                  <insight.icon size={18} className={`${insight.color} mt-0.5 flex-shrink-0`} />
                  <p className="text-[14px] leading-5 font-medium">{insight.text}</p>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 text-[#2563EB] text-[14px] hover:bg-[#1D1F23] cursor-pointer transition-colors">
              Show more
            </div>
          </div>

          {/* Active Needs / Trends */}
          <div className="bg-[#16181C] rounded-2xl border border-[#2F3336] overflow-hidden mb-4">
            <h2 className="font-extrabold text-xl px-4 py-3">Active Needs</h2>

            {[
              { cat: 'Urgent · Pune District', title: '#WinterClothes', posts: '125 active requests' },
              { cat: 'High Priority · Mumbai', title: '#MedicalSupplies', posts: '42 active requests' },
              { cat: 'Medium · Education', title: 'School Laptops', posts: '15 requests' },
              { cat: 'Logistics · Pending', title: 'Cold Storage Trucks', posts: '8 trucks needed' },
            ].map((trend, i) => (
              <div key={i} className="px-4 py-3 hover:bg-[#1D1F23] cursor-pointer transition-colors relative">
                <div className="flex justify-between items-start">
                  <div className="text-[13px] text-[#71767B]">{trend.cat}</div>
                  <button className="p-1 rounded-full hover:bg-[rgba(29,155,240,0.1)] text-[#71767B] -mr-2 -mt-1">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                <div className="font-bold text-[15px] leading-5 mt-0.5 mb-1">{trend.title}</div>
                <div className="text-[13px] text-[#71767B]">{trend.posts}</div>
              </div>
            ))}
          </div>

          {/* Recommended Partners */}
          <div className="bg-[#16181C] rounded-2xl border border-[#2F3336] overflow-hidden">
            <h2 className="font-extrabold text-xl px-4 py-3">Suggested Partners</h2>
            {[
              { name: 'Tata Trusts', handle: '@tatatrusts', tag: 'Top Donor' },
              { name: 'Reliance Foundation', handle: '@reliancefound', tag: 'Logistics' },
              { name: 'Zomato Feeding I...', handle: '@feedingindia', tag: 'Food Partner' },
            ].map((user, i) => (
              <div key={i} className="px-4 py-3 hover:bg-[#1D1F23] cursor-pointer transition-colors flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">
                    {user.name[0]}
                  </div>
                  <div className="text-[15px] min-w-0">
                    <div className="font-bold hover:underline truncate w-32">{user.name}</div>
                    <div className="text-[#71767B] leading-4 text-xs">{user.handle}</div>
                    <div className="text-[#00BA7C] text-[11px] mt-0.5">{user.tag}</div>
                  </div>
                </div>
                <button className="bg-[#EFF3F4] text-black font-bold text-sm px-4 py-1.5 rounded-full hover:bg-[#D7DBDC] transition-colors">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
