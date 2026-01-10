"use client";
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, Repeat2, Heart, Share, MoreHorizontal, MapPin, BadgeCheck, Clock, Package, Truck, ShieldCheck, AlertCircle } from 'lucide-react';

export default function PostCard({ post, actionLabel }: { post: any, actionLabel?: string }) {
    const isNeed = post.type === 'NEED';

    // Mock structured data if not present (simulate backend)
    // We use post.id to make the 'random' data consistent for the same post
    const seed = post.id ? post.id.charCodeAt(0) : 0;
    const quantities = ['120 units', '500 kg', '50 boxes', '1000 liters', '200 kits'];
    const storageTypes = ['Cold storage required', 'Dry place needed', 'Fragile items', 'No special storage', 'Heavy lifting required'];
    const logisticsTypes = ['Pickup Available', 'Drop-off Needed', 'Third-party Logistics', 'Volunteer Transport'];

    // Simple pseudo-random index selection
    const getVariant = (arr: string[], offset: number) => arr[(seed + offset) % arr.length];

    const structuredData = {
        quantity: post.quantity || getVariant(quantities, 0),
        deadline: post.deadline || `${(seed % 7) + 2} days`,
        storage: post.storage || getVariant(storageTypes, 1),
        urgency: post.ai_metadata?.urgency || (seed % 3 === 0 ? 'High' : seed % 3 === 1 ? 'Medium' : 'Low'),
        regNo: post.regNo || `MH/2023/${1000 + (seed * 5)}`,
        location: post.location || (seed % 2 === 0 ? 'Pune, MH' : 'Mumbai, MH'),
        verified: true,
        reliability: 85 + (seed % 15),
        category: post.ai_metadata?.category || (seed % 2 === 0 ? 'Food & Rations' : 'Medical Supplies')
    };

    const urgencyColor =
        structuredData.urgency === 'High' ? 'text-[#F91880] border-[#F91880]' :
            structuredData.urgency === 'Medium' ? 'text-[#FFD400] border-[#FFD400]' :
                'text-[#00BA7C] border-[#00BA7C]';

    return (
        <article className="border-b border-[#2F3336] hover:bg-[rgba(255,255,255,0.03)] transition-colors cursor-pointer">
            {/* Header / Trust Signals */}
            <div className="px-4 pt-3 flex items-start gap-3">
                <div className="flex-shrink-0">
                    <a href={`/profile/${post.user_id}`}>
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-[#2F3336] overflow-hidden hover:opacity-80 transition-opacity">
                            {post.author?.avatar ? (
                                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                            ) : (
                                isNeed ? <ShieldCheck size={20} className="text-[#2563EB]" /> : <BadgeCheck size={20} className="text-[#2563EB]" />
                            )}
                        </div>
                    </a>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[#71767B] text-sm md:text-[15px]">
                        <div className="flex items-center gap-1 flex-wrap">
                            <span className="font-bold text-[#E7E9EA] truncate hover:underline cursor-pointer">
                                <a href={`/profile/${post.user_id}`}>{post.author?.name || (isNeed ? 'Hope Foundation' : 'Tata CSR')}</a>
                            </span>
                            {structuredData.verified && <BadgeCheck size={16} className="text-[#2563EB]" fill="#2563EB" color="black" />}
                            <span className="truncate">@{post.author?.name ? post.author.name.replace(/\s+/g, '_').toLowerCase() : (isNeed ? 'hope_ngo' : 'tata_csr')}</span>
                            <span className="max-sm:hidden">·</span>
                            <span className="px-1.5 py-0.5 rounded border border-[#536471] text-[11px] text-[#71767B] hover:bg-[#2F3336] transition-colors max-sm:hidden">
                                Reg: {structuredData.regNo}
                            </span>
                            <span>·</span>
                            <span className="hover:underline decoration-[#71767B]">
                                {formatDistanceToNow(new Date(post.created_at))}
                            </span>
                        </div>
                        <button className="group p-2 -m-2 rounded-full hover:bg-[rgba(29,155,240,0.1)] transition-colors">
                            <MoreHorizontal size={18} className="group-hover:text-[#1D9BF0]" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 text-xs mt-1 mb-2 text-[#71767B]">
                        <span className="flex items-center gap-1">
                            <MapPin size={12} /> {structuredData.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <ShieldCheck size={12} /> Govt. Verified
                        </span>
                    </div>

                    {/* Content & Needs Structure */}
                    <div className="text-[#E7E9EA] text-[15px] leading-6 whitespace-pre-wrap mb-3">
                        {post.content}
                    </div>

                    {/* Structured Request Box */}
                    {isNeed && (
                        <div className="mb-3 rounded-xl border border-[#2F3336] bg-[#16181C] overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2 bg-[#202327] border-b border-[#2F3336]">
                                <span className="text-sm font-bold text-[#E7E9EA] uppercase tracking-wide flex items-center gap-2">
                                    <Package size={16} className="text-[#2563EB]" />
                                    {structuredData.category} Request
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded-full border ${urgencyColor} bg-opacity-10 font-bold uppercase`}>
                                    {structuredData.urgency} Priority
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-px bg-[#2F3336]">
                                <div className="bg-[#16181C] p-3">
                                    <p className="text-xs text-[#71767B] uppercase mb-1">Quantity</p>
                                    <p className="text-sm font-bold text-[#E7E9EA]">{structuredData.quantity}</p>
                                </div>
                                <div className="bg-[#16181C] p-3">
                                    <p className="text-xs text-[#71767B] uppercase mb-1">Deadline</p>
                                    <p className="text-sm font-bold text-[#E7E9EA] flex items-center gap-1">
                                        <Clock size={14} className="text-[#2563EB]" /> {structuredData.deadline}
                                    </p>
                                </div>
                                <div className="bg-[#16181C] p-3">
                                    <p className="text-xs text-[#71767B] uppercase mb-1">Requirements</p>
                                    <p className="text-sm font-medium text-[#E7E9EA]">{structuredData.storage}</p>
                                </div>
                                <div className="bg-[#16181C] p-3">
                                    <p className="text-xs text-[#71767B] uppercase mb-1">Logistics</p>
                                    <p className="text-sm font-medium text-[#E7E9EA] flex items-center gap-1">
                                        <Truck size={14} /> Pickup Available
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Bar / Transaction Layer */}
                    <div className="flex gap-3 mb-3 mt-4">
                        <a href={`/messages?postId=${post.id}&intent=request`} className="flex-1">
                            <button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-2 rounded-full text-sm transition-colors shadow-sm flex items-center justify-center gap-2">
                                <Package size={18} />
                                {actionLabel || 'Fulfil Request'}
                            </button>
                        </a>
                        <a href={`/posts/${post.id}/pickup`} className="flex-1">
                            <button className="w-full bg-transparent border border-[#536471] hover:bg-[rgba(239,243,244,0.1)] text-[#EFF3F4] font-bold py-2 rounded-full text-sm transition-colors flex items-center justify-center gap-2">
                                <Truck size={18} />
                                Schedule Pickup
                            </button>
                        </a>
                    </div>

                    {/* Footer Metrics */}
                    <div className="flex items-center gap-6 border-t border-[#2F3336] pt-3 pb-2 text-[#71767B] text-xs">
                        <span className="flex items-center gap-1 hover:text-[#00BA7C] transition-colors cursor-pointer">
                            <span className="font-bold text-[#E7E9EA] text-sm">₹ 2.4L</span> Funds deployed
                        </span>
                        <span className="flex items-center gap-1 hover:text-[#1D9BF0] transition-colors cursor-pointer">
                            <span className="font-bold text-[#E7E9EA] text-sm">340</span> Meals Served
                        </span>
                        <div className="flex-1"></div>
                        <button className="group flex items-center gap-1 transition-colors hover:text-[#2563EB]">
                            <Share size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
