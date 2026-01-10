"use client";
import Link from 'next/link';
import { Home, Search, Bell, Mail, FileText, User, MoreHorizontal, Zap, Building, Landmark, Truck, BarChart3, ShieldCheck } from 'lucide-react';
type SidebarPage =
    | 'feed'
    | 'matches'
    | 'reports'
    | 'profile'
    | 'messages'
    | 'notifications'
    | 'logistics'
    | 'csr'
    | 'govt';

interface SidebarProps {
    current: SidebarPage;
}


export default function Sidebar({ current }: SidebarProps) {
    const menuItems = [
        { icon: Home, label: 'Home', href: '/feed', id: 'feed' },
        { icon: Search, label: 'Explore Needs', href: '/matches', id: 'matches' },
        { icon: Bell, label: 'Notifications', href: '/notifications', id: 'notifications' },
        { icon: Mail, label: 'Messages', href: '/messages', id: 'messages' },
        { icon: FileText, label: 'Impact Reports', href: '/reports', id: 'reports' },
        { icon: User, label: 'Profile', href: '/profile', id: 'profile' },
    ] as const;

    const proTools = [
        { icon: BarChart3, label: 'CSR Dashboard', href: '/dashboard/csr', id: 'csr', color: 'text-emerald-500' },
        { icon: Landmark, label: 'Govt. Console', href: '/dashboard/govt', id: 'govt', color: 'text-amber-500' },
        { icon: Truck, label: 'Logistics Panel', href: '/dashboard/logistics', id: 'logistics', color: 'text-blue-500' },
    ] as const;

    return (
        <aside className="fixed h-screen w-[275px] flex flex-col justify-between px-3 py-1 border-r border-[#2F3336] overflow-y-auto z-50 max-xl:w-[88px]">
            <div>
                {/* Logo */}
                <div className="p-3 mb-1 w-fit rounded-full hover:bg-[rgba(239,243,244,0.1)] transition-colors cursor-pointer">
                    <Link href="/">
                        <Zap className="text-[#EFF3F4]" size={30} fill="white" />
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="space-y-1 mb-4">
                    {menuItems.map((item) => {
                        const isActive = current === item.id;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className="group flex items-center w-fit"
                            >
                                <div className={`flex items-center gap-4 px-4 py-3 rounded-full transition-colors ${isActive ? 'font-bold' : 'font-normal'} group-hover:bg-[rgba(239,243,244,0.1)]`}>
                                    <item.icon size={26} className="text-[#EFF3F4]" strokeWidth={isActive ? 3 : 2} />
                                    <span className="text-xl text-[#EFF3F4] mr-4 max-xl:hidden">{item.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-[#2F3336] my-2 pt-2 max-xl:hidden">
                    <p className="px-4 text-xs font-bold text-[#71767B] mb-2 uppercase tracking-wider">Professional Tools</p>
                    <nav className="space-y-1">
                        {proTools.map((item) => (
                            <Link key={item.id} href={item.href} className="group flex items-center w-fit">
                                <div className="flex items-center gap-4 px-4 py-3 rounded-full transition-colors group-hover:bg-[rgba(239,243,244,0.1)]">
                                    <item.icon size={26} className={item.color} />
                                    <span className="text-xl text-[#EFF3F4] mr-4">{item.label}</span>
                                </div>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Post Button */}
                <button className="w-[90%] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-lg py-3.5 rounded-full shadow-md transition-colors max-xl:p-3 max-xl:w-auto max-xl:rounded-full">
                    <span className="max-xl:hidden">Report Need</span>
                    <Z className="xl:hidden" size={24} />
                </button>
            </div>

            {/* User Profile Hook */}
            <div className="mb-4 p-3 rounded-full hover:bg-[rgba(239,243,244,0.1)] cursor-pointer transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                        <Building size={20} className="text-white" />
                    </div>
                    <div className="hidden xl:block">
                        <div className="flex items-center gap-1">
                            <p className="font-bold text-[#E7E9EA] text-sm">Hope Foundation</p>
                            <ShieldCheck size={14} className="text-[#1D9BF0]" />
                        </div>
                        <p className="text-[#71767B] text-sm">@hope_ngo • Verified</p>
                    </div>
                </div>
                <MoreHorizontal className="text-[#E7E9EA] hidden xl:block" size={18} />
            </div>
        </aside>
    );
}

// Helper for mobile icon
function Z({ size, className }: { size: number, className?: string }) {
    return <Zap size={size} className={className} fill="currentColor" />;
}
