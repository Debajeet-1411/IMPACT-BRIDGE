import React from 'react';
import { Activity, Clock, CheckCircle } from 'lucide-react';

interface StatusBannerProps {
    status: 'LIVE' | 'PENDING' | 'FULFILLED' | 'SERVICE_DELIVERED';
    className?: string;
}

const StatusBanner: React.FC<StatusBannerProps> = ({ status, className = '' }) => {
    switch (status) {
        case 'LIVE':
            return (
                <div className={`flex items-center gap-2 bg-[#2563EB]/10 text-[#2563EB] px-3 py-1.5 rounded-full text-xs font-bold border border-[#2563EB]/20 ${className}`}>
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2563EB]"></span>
                    </span>
                    LIVE REQUEST
                </div>
            );
        case 'PENDING':
            return (
                <div className={`flex items-center gap-2 bg-[#F59E0B]/10 text-[#F59E0B] px-3 py-1.5 rounded-full text-xs font-bold border border-[#F59E0B]/20 ${className}`}>
                    <Clock size={14} />
                    PENDING APPROVAL
                </div>
            );
        case 'FULFILLED':
        case 'SERVICE_DELIVERED':
            return (
                <div className={`flex items-center gap-2 bg-[#10B981]/10 text-[#10B981] px-3 py-1.5 rounded-full text-xs font-bold border border-[#10B981]/20 ${className}`}>
                    <CheckCircle size={14} />
                    SERVICE DELIVERED
                </div>
            );
        default:
            return null;
    }
};

export default StatusBanner;
