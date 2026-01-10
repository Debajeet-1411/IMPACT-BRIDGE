"use client";
import React, { useState } from 'react';
import { X, Calendar, MapPin, Package, AlertCircle, Truck, Box } from 'lucide-react';
import { postService } from '@/services/api';

interface RequestNeedModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPostCreated: () => void;
}

export default function RequestNeedModal({ isOpen, onClose, onPostCreated }: RequestNeedModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        category: 'Food',
        itemType: '',
        quantity: '',
        unit: 'Units',
        priority: 'Medium',
        deadline: '',
        location: 'Pune, MH', // Detailed auto-detect later
        storage: [] as string[],
        notes: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Construct the content string for the current AI backend to parse, 
            // but also pass structured metadata if the API supported it directly.
            // For now, we'll format a rich text representation that the AI extraction will love.
            const content = `Requesting ${formData.quantity} ${formData.unit} of ${formData.itemType} (${formData.category}). 
            Priority: ${formData.priority}. 
            Deadline: ${formData.deadline}. 
            Location: ${formData.location}. 
            Notes: ${formData.notes}
            Storage: ${formData.storage.join(', ')}`;

            await postService.create({
                content,
                type: 'NEED',
                // In a real app, we'd pass structured data side-by-side
                // metadata: formData 
            });

            onPostCreated();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStorage = (type: string) => {
        setFormData(prev => ({
            ...prev,
            storage: prev.storage.includes(type)
                ? prev.storage.filter(t => t !== type)
                : [...prev.storage, type]
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#16181C] w-full max-w-2xl rounded-2xl border border-[#2F3336] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#2F3336]">
                    <h2 className="text-xl font-extrabold text-[#E7E9EA] flex items-center gap-2">
                        <Package className="text-[#2563EB]" />
                        Create Priority Need
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-[rgba(239,243,244,0.1)] rounded-full transition-colors text-[#E7E9EA]">
                        <X size={24} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Category & Item */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#71767B] uppercase">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3 text-[#E7E9EA] focus:border-[#2563EB] focus:outline-none appearance-none"
                            >
                                <option>Food</option>
                                <option>Clothes</option>
                                <option>Medical</option>
                                <option>Education</option>
                                <option>Logistics</option>
                                <option>Shelter</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#71767B] uppercase">Item / Resource</label>
                            <input
                                type="text"
                                placeholder="e.g. Winter Jackets"
                                value={formData.itemType}
                                onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
                                className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3 text-[#E7E9EA] focus:border-[#2563EB] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Quantity & Unit */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#71767B] uppercase">Quantity</label>
                            <input
                                type="number"
                                placeholder="e.g. 100"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3 text-[#E7E9EA] focus:border-[#2563EB] focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#71767B] uppercase">Unit</label>
                            <select
                                value={formData.unit}
                                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3 text-[#E7E9EA] focus:border-[#2563EB] focus:outline-none"
                            >
                                <option>Units</option>
                                <option>Kg</option>
                                <option>Liters</option>
                                <option>Boxes</option>
                                <option>People</option>
                            </select>
                        </div>
                    </div>

                    {/* Priority & Deadline */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#71767B] uppercase">Urgency Priority</label>
                            <div className="flex bg-black border border-[#2F3336] rounded-xl p-1">
                                {['Low', 'Medium', 'High'].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setFormData({ ...formData, priority: p })}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${formData.priority === p
                                                ? (p === 'High' ? 'bg-[#F91880] text-white' : p === 'Medium' ? 'bg-[#FFD400] text-black' : 'bg-[#1D9BF0] text-white')
                                                : 'text-[#71767B] hover:text-[#E7E9EA]'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#71767B] uppercase">Deadline</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-3.5 text-[#71767B]" size={18} />
                                <input
                                    type="date"
                                    value={formData.deadline}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                    className="w-full bg-black border border-[#2F3336] rounded-xl pl-12 pr-4 py-3 text-[#E7E9EA] focus:border-[#2563EB] focus:outline-none [color-scheme:dark]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#71767B] uppercase">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-3.5 text-[#71767B]" size={18} />
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full bg-black border border-[#2F3336] rounded-xl pl-12 pr-4 py-3 text-[#E7E9EA] focus:border-[#2563EB] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Storage Constraints */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#71767B] uppercase">Storage Requirements</label>
                        <div className="flex gap-3 flex-wrap">
                            {['Cold Storage', 'Fragile', 'Dry Place', 'Heavy Lift'].map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => toggleStorage(tag)}
                                    className={`px-4 py-2 rounded-full border text-sm font-bold transition-colors ${formData.storage.includes(tag)
                                            ? 'bg-[#2563EB]/10 border-[#2563EB] text-[#2563EB]'
                                            : 'bg-transparent border-[#536471] text-[#71767B] hover:border-[#E7E9EA] hover:text-[#E7E9EA]'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#71767B] uppercase">Additional Notes</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Any specific instructions for donors..."
                            className="w-full bg-black border border-[#2F3336] rounded-xl px-4 py-3 text-[#E7E9EA] focus:border-[#2563EB] focus:outline-none resize-none h-24"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-[#2F3336] bg-black/50 backdrop-blur-md flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !formData.itemType || !formData.quantity}
                        className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-3 rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                    >
                        {loading ? 'Posting...' : 'Post Priority Need'}
                    </button>
                </div>
            </div>
        </div>
    );
}
