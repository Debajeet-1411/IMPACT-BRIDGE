"use client";
import Sidebar from '@/components/Sidebar';
import { Search, MoreHorizontal, Edit, Send } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

// Mock Data for previous interactions
const MOCK_CHATS = [
    {
        id: 1,
        user: { name: 'Hope Foundation', avatar: '', username: '@hope_ngo', verified: true },
        lastMessage: 'Thank you for the update on the shipment.',
        timestamp: '2h',
        unread: false
    },
    {
        id: 2,
        user: { name: 'Tata CSR', avatar: '', username: '@tata_csr', verified: true },
        lastMessage: 'We can arrange the logistics for tomorrow.',
        timestamp: '1d',
        unread: true
    },
    {
        id: 3,
        user: { name: 'Zomato Feeding India', avatar: '', username: '@zomato_feeding', verified: true },
        lastMessage: 'Please confirm the quantity required.',
        timestamp: '3d',
        unread: false
    }
];

interface Message {
    id: number;
    sender: 'user' | 'other' | 'bot'; // 'bot' for the automated prompts
    text?: string;
    options?: string[]; // For bot choices
    timestamp: Date;
}

export default function MessagesPage() {
    const searchParams = useSearchParams();
    const postId = searchParams.get('postId');
    const intent = searchParams.get('intent');
    const [activeChat, setActiveChat] = useState<number | null>(postId ? 0 : 1); // 0 = New/Transient chat
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    // Simulate fetching post details if postId exists
    useEffect(() => {
        if (postId && intent === 'request') {
            // Reset chat for new request
            setMessages([
                {
                    id: 1,
                    sender: 'bot',
                    text: `Hello! You are initiating a request for **Post #${postId}**. \nHow can we help you proceed?`,
                    options: ['📦 I can fulfil the full quantity', '🚚 I can help with logistics', '💬 I have a question', '📞 Contact Coordinator'],
                    timestamp: new Date()
                }
            ]);
            setActiveChat(0); // 0 indicates the "New Request" context
        } else if (!postId) {
            // Load default chat history for existing chat
            setMessages([
                { id: 1, sender: 'other', text: 'Hey, is the request still open?', timestamp: new Date(Date.now() - 3600000) },
                { id: 2, sender: 'user', text: 'Yes, we still need about 50 units.', timestamp: new Date(Date.now() - 1800000) }
            ]);
        }
    }, [postId, intent]);

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        const newUserMsg: Message = { id: Date.now(), sender: 'user', text, timestamp: new Date() };
        setMessages(prev => [...prev, newUserMsg]);
        setInput('');

        // Simulate Bot Response if in Request Mode
        if (activeChat === 0) {
            setTimeout(() => {
                let reply = "Thanks for your response. The coordinator has been notified.";
                if (text.includes('full quantity')) reply = "Great! Please confirm your pickup location.";
                if (text.includes('logistics')) reply = "Excellent. Our logistics partner will coordinate with you.";

                setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply, timestamp: new Date() }]);
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen bg-black text-[#E7E9EA] layout-container flex justify-center">
            {/* Left Sidebar (Nav) */}
            <header className="w-[275px] flex-shrink-0 relative max-xl:w-[88px]">
                <Sidebar current="messages" />
            </header>

            {/* Chat List Sidebar */}
            <aside className="w-[390px] border-r border-[#2F3336] h-screen sticky top-0 flex flex-col hidden lg:flex">
                <div className="p-3 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-10">
                    <h2 className="text-xl font-bold px-2">Messages</h2>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-[#EFF3F4]/10 rounded-full transition-colors"><MoreHorizontal size={20} /></button>
                        <button className="p-2 hover:bg-[#EFF3F4]/10 rounded-full transition-colors"><Edit size={20} /></button>
                    </div>
                </div>

                <div className="px-4 pb-2">
                    <div className="relative group">
                        <div className="absolute left-4 top-2.5 text-[#71767B] group-focus-within:text-[#1D9BF0]">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Direct Messages"
                            className="w-full bg-[#202327] text-[#E7E9EA] rounded-full py-2 pl-12 pr-4 border border-transparent focus:border-[#1D9BF0] focus:bg-black transition-colors text-xs"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {/* If simulating new chat, show it at top */}
                    {activeChat === 0 && (
                        <div className="px-4 py-3 bg-[#16181C] border-r-2 border-[#1D9BF0] cursor-pointer">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-bold">
                                    REQ
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-sm">New Request</span>
                                        <span className="text-[#71767B] text-xs">@automated_bot</span>
                                    </div>
                                    <div className="text-[#71767B] text-sm truncate">Initiating request for Post #{postId}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {MOCK_CHATS.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat.id)}
                            className={`px-4 py-3 hover:bg-[#EFF3F4]/5 cursor-pointer flex gap-3 ${activeChat === chat.id ? 'bg-[#16181C] border-r-2 border-[#1D9BF0]' : ''}`}
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                                {chat.user.avatar ? <img src={chat.user.avatar} /> : <div className="w-full h-full flex items-center justify-center font-bold text-xs">{chat.user.name[0]}</div>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <span className="font-bold text-sm truncate text-[#E7E9EA]">{chat.user.name}</span>
                                    <span className="text-[#71767B] text-xs">{chat.timestamp}</span>
                                </div>
                                <div className="text-[#71767B] text-sm truncate">
                                    {chat.lastMessage}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Chat Window */}
            <main className="w-[600px] border-r border-[#2F3336] h-screen flex flex-col relative max-w-full">
                {/* Header */}
                <div className="px-4 py-3 bg-black/60 backdrop-blur-md border-b border-[#2F3336] flex items-center justify-between sticky top-0 z-20">
                    <div className="flex flex-col">
                        <h2 className="font-bold text-lg leading-5">
                            {activeChat === 0 ? 'Request Assistant' : MOCK_CHATS.find(c => c.id === activeChat)?.user.name || 'Select a chat'}
                        </h2>
                        {activeChat === 0 && <span className="text-[#71767B] text-xs">Automated Support</span>}
                    </div>
                    <MoreHorizontal size={20} className="text-[#1D9BF0]" />
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            <div
                                className={`max-w-[80%] px-4 py-3 rounded-2xl text-[15px] whitespace-pre-wrap ${msg.sender === 'user'
                                        ? 'bg-[#1D9BF0] text-white rounded-br-none'
                                        : 'bg-[#202327] text-[#E7E9EA] rounded-bl-none'
                                    }`}
                            >
                                {msg.text}
                            </div>

                            {/* Bot Options (Chips) */}
                            {msg.sender === 'bot' && msg.options && (
                                <div className="flex flex-wrap gap-2 mt-2 max-w-[80%]">
                                    {msg.options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSendMessage(opt)}
                                            className="bg-transparent border border-[#1D9BF0] text-[#1D9BF0] hover:bg-[#1D9BF0]/10 font-bold py-1.5 px-3 rounded-full text-xs transition-colors"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <span className="text-[#71767B] text-[11px] mt-1 px-1">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-[#2F3336] bg-black">
                    <div className="bg-[#202327] rounded-2xl flex items-center px-2">
                        <input
                            type="text"
                            className="bg-transparent border-none focus:ring-0 text-[#E7E9EA] placeholder-[#71767B] w-full py-3 px-2"
                            placeholder="Start a new message"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSendMessage(input)}
                        />
                        <button
                            onClick={() => handleSendMessage(input)}
                            disabled={!input.trim()}
                            className="p-2 text-[#1D9BF0] hover:bg-[#1D9BF0]/10 rounded-full disabled:opacity-50 transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
