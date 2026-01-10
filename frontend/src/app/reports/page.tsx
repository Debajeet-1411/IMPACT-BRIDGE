"use client";
import Sidebar from "@/components/Sidebar";
import {
    TrendingUp,
    Users,
    Package,
    Leaf,
    Clock,
    CheckCircle,
    Building,
    Heart,
    FileText,
    Download,
    Share2
} from "lucide-react";
import { motion } from "framer-motion";

export default function ReportsPage() {
    const stats = [
        {
            label: "Surplus Redirected",
            value: "₹2.4Cr",
            change: "↑ 34% vs last month",
            icon: TrendingUp,
            color: "text-green-500",
            bgColor: "bg-green-500/10",
        },
        {
            label: "NGOs Supported",
            value: "450+",
            change: "↑ 12% vs last month",
            icon: Users,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
        },
        {
            label: "Meals Distributed",
            value: "125K",
            change: "↑ 28% vs last month",
            icon: Package,
            color: "text-orange-500",
            bgColor: "bg-orange-500/10",
        },
        {
            label: "Waste Reduced",
            value: "45 Tons",
            change: "↑ 18% vs last month",
            icon: Leaf,
            color: "text-emerald-500",
            bgColor: "bg-emerald-500/10",
        },
    ];

    const matches = [
        {
            type: "Food Surplus",
            time: "2 hours ago",
            donor: "Grand Hyatt Mumbai",
            recipient: "Akshaya Patra Foundation",
            description: "Post-conference buffet redirected to feed school children in Dharavi.",
            quantity: "250 meals",
            verified: true,
        },
        {
            type: "Office Supplies",
            time: "1 day ago",
            donor: "Tata Electronics",
            recipient: "Goonj",
            description: "Refurbished laptops and stationery donated to rural education centers.",
            quantity: "500+ items",
            verified: true,
        },
        {
            type: "Food Surplus",
            time: "2 days ago",
            donor: "ITC Hotels",
            recipient: "Robin Hood Army",
            description: "Wedding banquet leftovers distributed to homeless shelters overnight.",
            quantity: "180 meals",
            verified: true,
        },
        {
            type: "Cafeteria Surplus",
            time: "3 days ago",
            donor: "Infosys Campus",
            recipient: "Feeding India",
            description: "Daily cafeteria excess matched with local orphanage for dinner service.",
            quantity: "320 meals",
            verified: true,
        },
        {
            type: "Food Surplus",
            time: "4 days ago",
            donor: "Marriott Bangalore",
            recipient: "Smile Foundation",
            description: "Conference catering overflow provided to children's home.",
            quantity: "150 meals",
            verified: true,
        },
        {
            type: "School Supplies",
            time: "1 week ago",
            donor: "Wipro Limited",
            recipient: "CRY India",
            description: "Annual stationery drive matched with underprivileged schools.",
            quantity: "1000+ items",
            verified: true,
        },
    ];

    return (
        <div className="min-h-screen bg-black text-[#E7E9EA] font-sans">
            <div className="flex justify-center max-w-[1400px] mx-auto">
                {/* Sidebar - Fixed Left */}
                <header className="w-[275px] flex-shrink-0 sticky top-0 h-screen max-xl:w-[88px] z-50">
                    <Sidebar current="reports" />
                </header>

                {/* Main Content - Expanded Width */}
                <main className="flex-1 border-l border-[#2F3336] min-h-screen pb-20">

                    {/* Hero Section */}
                    <div className="pt-16 pb-12 px-8 text-center bg-gradient-to-b from-black to-[#0A0A0A]">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                Real-time Insight into Your <span className="text-[#FF9F1C]">Global Footprint</span>
                            </h1>
                            <p className="text-[#71767B] text-lg max-w-2xl mx-auto mb-12">
                                Track every donation, measure every impact. Transparent reporting for donors and NGOs alike.
                            </p>
                        </motion.div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                                    className="bg-black border border-[#2F3336] rounded-xl p-6 flex flex-col items-start hover:border-[#FF9F1C]/50 transition-colors group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex justify-between w-full mb-4">
                                        <span className="text-[#71767B] text-sm font-medium">{stat.label}</span>
                                        <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                            <stat.icon size={20} className={stat.color} />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-extrabold mb-2">{stat.value}</div>
                                    <div className="text-xs font-semibold text-green-500">
                                        {stat.change}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Matches Section */}
                    <section className="px-8 mb-20">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <h2 className="text-2xl font-bold mb-2">Recent Matches</h2>
                            <p className="text-[#71767B]">Live feed of successful donor-NGO connections</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {matches.map((match, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 * i, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="bg-black border border-[#2F3336] rounded-xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF9F1C]/10 transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="bg-[#1D9BF0]/10 text-[#1D9BF0] text-xs px-2 py-1 rounded-full font-medium">
                                            {match.type}
                                        </span>
                                        <div className="flex items-center text-[#71767B] text-xs gap-1">
                                            <Clock size={12} />
                                            {match.time}
                                        </div>
                                    </div>

                                    <div className="mb-6 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-[#2F3336] flex items-center justify-center">
                                                <Building size={16} className="text-[#E7E9EA]" />
                                            </div>
                                            <span className="font-bold text-sm">{match.donor}</span>
                                        </div>
                                        <div className="w-px h-4 bg-[#2F3336] ml-4"></div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-[#2F3336] flex items-center justify-center">
                                                <Heart size={16} className="text-[#F91880]" />
                                            </div>
                                            <span className="font-bold text-sm">{match.recipient}</span>
                                        </div>
                                    </div>

                                    <p className="text-[#71767B] text-sm mb-4 leading-relaxed line-clamp-2">
                                        {match.description}
                                    </p>

                                    <div className="flex justify-between items-center pt-4 border-t border-[#2F3336]">
                                        <span className="text-[#FF9F1C] font-bold text-sm">{match.quantity}</span>
                                        {match.verified && (
                                            <span className="flex items-center gap-1 text-[#00BA7C] text-xs">
                                                <CheckCircle size={14} />
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* CSR Reporting Section */}
                    <section className="px-8 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-[#16181C] to-black border border-[#2F3336] rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-12"
                        >
                            <div className="flex-1 space-y-6">
                                <h2 className="text-3xl font-bold">Automated CSR Reporting</h2>
                                <p className="text-[#71767B] text-lg">
                                    Every donation generates comprehensive impact reports automatically. Track your corporate social responsibility metrics with verified data and beautiful visualizations.
                                </p>
                                <ul className="space-y-4 pt-4">
                                    {[
                                        "Real-time donation tracking and verification",
                                        "Monthly and quarterly impact summaries",
                                        "Tax-compliant documentation",
                                        "ESG metrics for stakeholder reports",
                                        "Carbon footprint reduction certificates"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[#E7E9EA]">
                                            <div className="w-2 h-2 rounded-full bg-[#00BA7C]"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Sample Report Card Visual */}
                            <div className="flex-1 w-full max-w-md bg-white rounded-xl text-black p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Sample Impact Report</div>
                                        <div className="font-bold text-lg">Q4 2025 Summary</div>
                                    </div>
                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-semibold text-gray-600">Verified</span>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <div className="text-3xl font-bold text-[#2563EB]">847</div>
                                        <div className="text-xs text-gray-500 mt-1">Donations Made</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-[#00BA7C]">32K</div>
                                        <div className="text-xs text-gray-500 mt-1">People Served</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-[#FF9F1C]">12.5T</div>
                                        <div className="text-xs text-gray-500 mt-1">CO₂ Saved</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-[#16181C]">₹45L</div>
                                        <div className="text-xs text-gray-500 mt-1">Value Generated</div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 flex justify-center gap-4 text-xs text-gray-400">
                                    <span className="cursor-pointer hover:text-[#2563EB] flex items-center gap-1">
                                        <Download size={12} /> Download PDF
                                    </span>
                                    <span>•</span>
                                    <span className="cursor-pointer hover:text-[#2563EB] flex items-center gap-1">
                                        <Share2 size={12} /> Share Report
                                    </span>
                                    <span>•</span>
                                    <span className="cursor-pointer hover:text-[#2563EB]">
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Footer Copyright */}
                    <div className="text-center text-[#71767B] text-xs pb-8">
                        © 2026 ImpactBridge. Built with purpose.
                    </div>
                </main>
            </div>
        </div>
    );
}
