import React from 'react';
import { Commitment } from '../../types/profile';
import { Truck, CheckCircle2, CircleDashed, ExternalLink } from 'lucide-react';

interface CommitmentsTabProps {
    commitments: Commitment[];
}

const CommitmentsTab: React.FC<CommitmentsTabProps> = ({ commitments }) => {
    if (commitments.length === 0) {
        return (
            <div className="p-8 text-center text-[#71767B]">
                No commitments found
            </div>
        );
    }

    return (
        <div className="divide-y divide-[#2F3336]">
            {commitments.map((commitment) => (
                <div key={commitment.id} className="p-4 hover:bg-[#EFF3F4]/[0.03] transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-[#E7E9EA]">{commitment.title}</h3>
                                {commitment.status === 'COMPLETED' ? (
                                    <span className="bg-[#10B981]/10 text-[#10B981] text-[10px] px-2 py-0.5 rounded-full border border-[#10B981]/20 font-bold">
                                        FULFILLED
                                    </span>
                                ) : (
                                    <span className="bg-[#F59E0B]/10 text-[#F59E0B] text-[10px] px-2 py-0.5 rounded-full border border-[#F59E0B]/20 font-bold">
                                        IN PROGRESS
                                    </span>
                                )}
                            </div>
                            <p className="text-[#71767B] text-sm mb-2">
                                For <span className="text-[#2563EB]">{commitment.ngoName}</span> • {new Date(commitment.date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <p className="text-[#E7E9EA] text-sm mb-4">{commitment.description}</p>

                    <div className="bg-[#202327] rounded-xl p-3 border border-[#2F3336]">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${commitment.courierStatus === 'Delivered' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#2563EB]/10 text-[#2563EB]'}`}>
                                    <Truck size={18} />
                                </div>
                                <div>
                                    <p className="text-[#E7E9EA] text-sm font-medium">{commitment.courierStatus}</p>
                                    <p className="text-[#71767B] text-xs">Tracking ID: {commitment.trackingId || 'N/A'}</p>
                                </div>
                            </div>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EFF3F4] text-black text-xs font-bold rounded-full hover:bg-[#D7DBDC] transition-colors">
                                <ExternalLink size={12} />
                                Track Live
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommitmentsTab;
