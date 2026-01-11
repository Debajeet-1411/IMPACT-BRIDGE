import React from 'react';
import { SAMPLE_REQUESTS, NGOS, COMPANIES, TRENDING_NEWS } from '../../data/seedData';
import { UserPlus, MoreHorizontal, ArrowUpRight } from 'lucide-react';

export const TopImpactorsWidget = () => {
    // Mix of NGOs and Companies for suggestions
    const suggestions = [...NGOS.slice(0, 2), ...COMPANIES.slice(0, 1)];
    const [followed, setFollowed] = React.useState<Set<string>>(new Set());

    const toggleFollow = (name: string) => {
        const next = new Set(followed);
        if (next.has(name)) {
            next.delete(name);
        } else {
            next.add(name);
        }
        setFollowed(next);
    };

    return (
        <div className="bg-[#16181C] rounded-2xl mb-4 overflow-hidden">
            <div className="p-4 py-3">
                <h2 className="text-xl font-bold text-[#E7E9EA]">Who to follow</h2>
            </div>

            {suggestions.map((entity, i) => {
                const isFollowing = followed.has(entity.name);
                return (
                    <div key={i} className="px-4 py-3 hover:bg-[rgba(255,255,255,0.03)] transition-colors cursor-pointer flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <img
                                src={(entity as any).metadata?.avatar || (entity as any).meta?.avatar}
                                alt={entity.name}
                                className="w-10 h-10 rounded-full bg-slate-700 object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(entity.name)}&background=random`;
                                }}
                            />
                            <div className="flex flex-col overflow-hidden">
                                <span className="font-bold text-[#E7E9EA] text-[15px] truncate hover:underline">{entity.name}</span>
                                <span className="text-[#71767B] text-[13px] truncate">@{entity.name.replace(/\s+/g, '').toLowerCase()}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleFollow(entity.name)}
                            className={`font-bold px-4 py-1.5 rounded-full text-sm transition-colors ${isFollowing
                                    ? 'bg-transparent border border-[#536471] text-[#EFF3F4] hover:border-red-600 hover:text-red-600 hover:bg-red-600/10 group'
                                    : 'bg-[#E7E9EA] hover:bg-[#D7DBDC] text-black'
                                }`}
                        >
                            <span className={isFollowing ? 'group-hover:hidden' : ''}>{isFollowing ? 'Following' : 'Follow'}</span>
                            <span className={`hidden ${isFollowing ? 'group-hover:inline' : ''}`}>Unfollow</span>
                        </button>
                    </div>
                );
            })}

            <div className="p-4 py-3 hover:bg-[rgba(255,255,255,0.03)] cursor-pointer text-[#2563EB] text-[15px]">
                Show more
            </div>
        </div>
    );
};

export const UrgentNeedsWidget = () => {
    // Filter for LIVE and Critical/High urgency requests
    const urgentRequests = SAMPLE_REQUESTS.filter(r =>
        r.status === 'LIVE' && ['Critical', 'High'].includes(r.meta.urgency)
    ).slice(0, 3);

    if (urgentRequests.length === 0) return null;

    return (
        <div className="bg-[#16181C] rounded-2xl mb-4 overflow-hidden border border-[#2F3336]">
            <div className="p-4 py-3 border-b border-[#2F3336]">
                <h2 className="text-xl font-bold text-[#E7E9EA]">Urgent Needs Nearby</h2>
            </div>

            {urgentRequests.map((req) => (
                <div key={req.id} className="p-4 hover:bg-[rgba(255,255,255,0.03)] transition-colors border-b border-[#2F3336] last:border-0">
                    <div className="flex items-start justify-between mb-1">
                        <span className="text-[#71767B] text-xs font-bold uppercase tracking-wider">{req.meta.category}</span>
                        <span className="text-red-500 text-xs font-bold bg-red-500/10 px-2 py-0.5 rounded">{req.meta.urgency}</span>
                    </div>
                    <p className="font-bold text-[#E7E9EA] text-[15px] leading-5 mb-2 line-clamp-2">
                        {req.content}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-[#71767B] text-sm">Target: {req.meta.quantity}</span>
                        <button className="text-[#2563EB] text-sm font-bold hover:underline flex items-center gap-1">
                            Help Now <ArrowUpRight size={14} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const HappeningsWidget = () => {
    return (
        <div className="bg-[#16181C] rounded-2xl mb-4 overflow-hidden">
            <div className="p-4 py-3">
                <h2 className="text-xl font-bold text-[#E7E9EA]">What's Happening</h2>
            </div>

            {TRENDING_NEWS.map((item) => (
                <div key={item.id} className="px-4 py-3 hover:bg-[rgba(255,255,255,0.03)] transition-colors cursor-pointer relative">
                    <div className="flex justify-between text-[#71767B] text-[13px] mb-0.5">
                        <span>{item.category || 'Trending'}</span>
                        <MoreHorizontal size={16} className="hover:text-[#2563EB]" />
                    </div>
                    {item.title ? (
                        <p className="font-bold text-[#E7E9EA] text-[15px] leading-5">
                            {item.title}
                        </p>
                    ) : (
                        <p className="font-bold text-[#E7E9EA] text-[15px]">
                            {item.hashtag}
                        </p>
                    )}
                    <span className="text-[#71767B] text-[13px] mt-1 block">
                        {item.posts} posts
                    </span>
                </div>
            ))}

            <div className="p-4 py-3 hover:bg-[rgba(255,255,255,0.03)] cursor-pointer text-[#2563EB] text-[15px]">
                Show more
            </div>
        </div>
    );
};
