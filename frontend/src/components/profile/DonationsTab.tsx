import React from 'react';
import { Transaction } from '../../types/profile';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

interface DonationsTabProps {
    transactions: Transaction[];
}

const DonationsTab: React.FC<DonationsTabProps> = ({ transactions }) => {
    if (transactions.length === 0) {
        return (
            <div className="p-8 text-center text-[#71767B]">
                No transaction history
            </div>
        );
    }

    return (
        <div className="divide-y divide-[#2F3336]">
            {transactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-[#EFF3F4]/[0.03] transition-colors">
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-full ${tx.status === 'SUCCESS' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'}`}>
                            {tx.status === 'SUCCESS' ? <ArrowUpRight size={20} /> : <Clock size={20} />}
                        </div>
                        <div>
                            <p className="text-[#E7E9EA] font-bold">{tx.recipientName}</p>
                            <div className="flex items-center gap-2 text-[#71767B] text-xs">
                                <span>{new Date(tx.date).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{tx.type}</span>
                                <span>•</span>
                                <span className={tx.status === 'SUCCESS' ? 'text-[#10B981]' : 'text-[#F59E0B]'}>
                                    {tx.status}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="font-mono text-[#E7E9EA] font-bold text-lg">
                        {tx.amount}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DonationsTab;
