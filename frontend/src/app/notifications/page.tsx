"use client";
import Sidebar from '@/components/Sidebar';
import { Bell, Package, Check, Heart, UserPlus, Info } from 'lucide-react';

export default function NotificationsPage() {
    const notifications = [
        {
            id: 1,
            type: 'request',
            icon: Package,
            color: 'text-[#1D9BF0]',
            bg: 'bg-[#1D9BF0]/10',
            content: <span className="text-[#E7E9EA]"><span className="font-bold">Tata CSR</span> confirmed pickup for <span className="font-bold">Winter Jacket Drive</span>.</span>,
            time: '2h ago',
            read: false
        },
        {
            id: 2,
            type: 'success',
            icon: Check,
            color: 'text-[#00BA7C]',
            bg: 'bg-[#00BA7C]/10',
            content: <span className="text-[#E7E9EA]">Your impact report for <span className="font-bold">Dec 2025</span> has been verified.</span>,
            time: '5h ago',
            read: true
        },
        {
            id: 3,
            type: 'social',
            icon: Heart,
            color: 'text-[#F91880]',
            bg: 'bg-[#F91880]/10',
            content: <span className="text-[#E7E9EA]"><span className="font-bold">Zomato Feeding India</span> liked your post.</span>,
            time: '1d ago',
            read: true
        },
        {
            id: 4,
            type: 'social',
            icon: UserPlus,
            color: 'text-[#71767B]',
            bg: 'bg-[#71767B]/10',
            content: <span className="text-[#E7E9EA]"><span className="font-bold">Tech Mahindra Foundation</span> started following you.</span>,
            time: '2d ago',
            read: true
        },
        {
            id: 5,
            type: 'system',
            icon: Info,
            color: 'text-[#FFD400]',
            bg: 'bg-[#FFD400]/10',
            content: <span className="text-[#E7E9EA]">System maintenance scheduled for <span className="font-bold">Jan 20, 2026</span>.</span>,
            time: '3d ago',
            read: true
        }
    ];

    return (
        <div className="min-h-screen bg-black text-[#E7E9EA] flex justify-center font-sans">
            <header className="w-[275px] flex-shrink-0 relative max-xl:w-[88px]">
                <Sidebar current="notifications" />
            </header>

            <main className="w-full max-w-[600px] border-x border-[#2F3336] min-h-screen">
                <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 px-4 py-3 border-b border-[#2F3336]">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        Notifications
                        <span className="bg-[#1D9BF0] text-xs px-2 py-0.5 rounded-full text-white">1 new</span>
                    </h1>
                </div>

                <div className="divide-y divide-[#2F3336]">
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`p-4 flex gap-4 hover:bg-[#16181C] transition-colors cursor-pointer ${!notif.read ? 'bg-[#16181C]/50' : ''}`}
                        >
                            <div className={`w-10 h-10 rounded-full ${notif.bg} flex items-center justify-center flex-shrink-0`}>
                                <notif.icon size={20} className={notif.color} />
                            </div>
                            <div className="flex-1">
                                <div className="text-[15px] leading-snug mb-1">
                                    {notif.content}
                                </div>
                                <div className="text-[#71767B] text-sm">
                                    {notif.time}
                                </div>
                            </div>
                            {!notif.read && (
                                <div className="w-2 h-2 rounded-full bg-[#1D9BF0] mt-2" />
                            )}
                        </div>
                    ))}
                </div>
            </main>

            {/* Right Sidebar (Suggestions or Filters) */}
            <div className="w-[350px] ml-8 hidden lg:block pt-4">
                <div className="bg-[#16181C] rounded-2xl p-4 border border-[#2F3336]">
                    <h2 className="font-bold text-lg mb-4">Filters</h2>
                    <div className="space-y-2">
                        <label className="flex items-center gap-3 text-[#E7E9EA] cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 bg-transparent border-[#71767B] rounded text-[#1D9BF0] focus:ring-0" />
                            <span>Mentions & Replies</span>
                        </label>
                        <label className="flex items-center gap-3 text-[#E7E9EA] cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 bg-transparent border-[#71767B] rounded text-[#1D9BF0] focus:ring-0" />
                            <span>System Updates</span>
                        </label>
                        <label className="flex items-center gap-3 text-[#E7E9EA] cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 bg-transparent border-[#71767B] rounded text-[#1D9BF0] focus:ring-0" />
                            <span>Impact Alerts</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
