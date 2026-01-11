import React from 'react';
import { Review } from '../../types/profile';
import { UserCheck } from 'lucide-react';

interface ReviewsTabProps {
    reviews: Review[];
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ reviews }) => {
    if (reviews.length === 0) {
        return (
            <div className="p-8 text-center text-[#71767B]">
                No reviews yet
            </div>
        );
    }

    return (
        <div className="divide-y divide-[#2F3336]">
            {reviews.map((review) => (
                <div key={review.id} className="p-4 hover:bg-[#EFF3F4]/[0.03] transition-colors">
                    <div className="flex items-start gap-3">
                        <img
                            src={review.authorAvatar}
                            alt={review.authorName}
                            className="w-10 h-10 rounded-full bg-slate-700 object-cover mt-1"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.authorName)}&background=random`;
                            }}
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-[#E7E9EA] text-sm">{review.authorName}</h3>
                                    <p className="text-[#71767B] text-xs mb-1">{new Date(review.date).toLocaleDateString()}</p>
                                </div>
                                <div className="bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded text-[10px] font-bold border border-[#10B981]/20">
                                    VERIFIED NGO
                                </div>
                            </div>

                            <div className="mt-2 text-[#E7E9EA] text-[15px] leading-5">
                                "{review.content}"
                            </div>

                            <div className="mt-3 bg-[#202327] rounded-lg p-2 text-xs text-[#71767B] border border-[#2F3336]">
                                <span className="font-bold text-[#E7E9EA]">Context:</span> {review.context}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewsTab;
