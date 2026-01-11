import React from 'react';
import { Connection } from '../../types/profile';
import { Mail, User } from 'lucide-react';

interface ConnectionsTabProps {
    connections: Connection[];
}

const ConnectionsTab: React.FC<ConnectionsTabProps> = ({ connections }) => {
    if (connections.length === 0) {
        return (
            <div className="p-8 text-center text-[#71767B]">
                No connections yet
            </div>
        );
    }

    return (
        <div className="divide-y divide-[#2F3336]">
            {connections.map((conn) => (
                <div key={conn.id} className="p-4 flex items-center justify-between hover:bg-[#EFF3F4]/[0.03] transition-colors">
                    <div className="flex items-center gap-3">
                        <img
                            src={conn.avatar}
                            alt={conn.name}
                            className="w-10 h-10 rounded-full bg-slate-700 object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(conn.name)}&background=random`;
                            }}
                        />
                        <div>
                            <h3 className="font-bold text-[#E7E9EA] text-sm">{conn.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-[#71767B]">
                                <span className={`
                                    px-1.5 py-0.5 rounded-sm font-bold
                                    ${conn.role === 'NGO' ? 'bg-orange-500/10 text-orange-500' :
                                        conn.role === 'COMPANY' ? 'bg-blue-500/10 text-blue-500' :
                                            'bg-purple-500/10 text-purple-500'}
                                `}>
                                    {conn.role}
                                </span>
                                <span>•</span>
                                <span>{conn.location}</span>
                            </div>
                        </div>
                    </div>
                    <button className="p-2 text-[#71767B] hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] rounded-full transition-colors">
                        <Mail size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ConnectionsTab;
