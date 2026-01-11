import React from 'react';
import { Request } from '../../types/profile';
import StatusBanner from '../StatusBanner';
import { Calendar, Package, AlertTriangle } from 'lucide-react';

interface RequestsTabProps {
    requests: Request[];
}

const RequestsTab: React.FC<RequestsTabProps> = ({ requests }) => {
    if (requests.length === 0) {
        return (
            <div className="p-8 text-center text-[#71767B]">
                No requests to show
            </div>
        );
    }

    return (
        <div className="divide-y divide-[#2F3336]">
            {requests.map((req) => (
                <div key={req.id} className="p-4 hover:bg-[#EFF3F4]/[0.03] transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                        <StatusBanner status={req.status === 'FULFILLED' ? 'SERVICE_DELIVERED' : req.status} />
                        <span className="text-[#71767B] text-xs">
                            {new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                    </div>

                    <p className="text-[#E7E9EA] text-[15px] leading-5 mb-3">
                        {req.content}
                    </p>

                    <div className="bg-[#202327] rounded-xl p-3 grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-[#71767B]">
                            <Package size={14} />
                            <span className="text-[#E7E9EA]">{req.meta.quantity}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#71767B]">
                            <Calendar size={14} />
                            <span className="text-[#E7E9EA]">{req.meta.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#71767B] col-span-2">
                            <AlertTriangle size={14} className={req.meta.urgency === 'Critical' ? 'text-red-500' : 'text-yellow-500'} />
                            <span className={req.meta.urgency === 'Critical' ? 'text-red-500 font-bold' : 'text-[#E7E9EA]'}>
                                {req.meta.urgency} Urgency
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RequestsTab;
