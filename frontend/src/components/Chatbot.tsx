"use client";
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { chatService } from '../services/api';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ id: number; text: string; sender: 'user' | 'bot' }[]>([
        { id: 1, text: "Hi there! I'm your Impact Assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (isOpen && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMsg = { id: Date.now(), text: input, sender: 'user' as const };
        setMessages(prev => [...prev, newMsg]);
        setInput("");

        // Call AI Service
        setIsTyping(true);
        try {
            const response = await chatService.sendMessage(input);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: response.data.response, sender: 'bot' }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting to my brain right now.", sender: 'bot' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] h-[500px] bg-black/90 backdrop-blur-xl border border-[#2F3336] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200">
                    {/* Header */}
                    <div className="p-4 bg-[#16181C] border-b border-[#2F3336] flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1D9BF0] to-[#8B5CF6] flex items-center justify-center">
                                <Sparkles size={16} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Impact AI</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-yellow-400' : 'bg-[#00BA7C]'} animate-pulse`} />
                                    <span className="text-[10px] text-[#71767B] uppercase font-bold tracking-wider">{isTyping ? "Thinking..." : "Online"}</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="p-1 hover:bg-[#EFF3F4]/10 rounded-full transition-colors text-[#71767B] hover:text-[#E7E9EA]">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-[#2F3336]' : 'bg-[#1D9BF0]/10'}`}>
                                    {msg.sender === 'user' ? <User size={14} className="text-[#E7E9EA]" /> : <Bot size={16} className="text-[#1D9BF0]" />}
                                </div>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                    ? 'bg-[#1D9BF0] text-white rounded-tr-none'
                                    : 'bg-[#202327] text-[#E7E9EA] rounded-tl-none border border-[#2F3336]'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-[#16181C] border-t border-[#2F3336]">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask anything..."
                                className="w-full bg-[#202327] border border-transparent focus:border-[#1D9BF0] rounded-full py-2.5 pl-4 pr-10 text-sm text-[#E7E9EA] placeholder-[#71767B] outline-none transition-all"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="absolute right-1 top-1 p-1.5 bg-[#1D9BF0] rounded-full text-white hover:bg-[#1A8CD8] disabled:opacity-50 disabled:bg-transparent disabled:text-[#71767B] transition-all"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={toggleChat}
                className="group w-14 h-14 bg-[#1D9BF0] hover:bg-[#1A8CD8] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(29,155,240,0.3)] transition-all hover:scale-110 active:scale-95"
            >
                {isOpen ? (
                    <X size={28} className="text-white" />
                ) : (
                    <MessageCircle size={28} className="text-white fill-current" />
                )}
            </button>
        </div>
    );
}
