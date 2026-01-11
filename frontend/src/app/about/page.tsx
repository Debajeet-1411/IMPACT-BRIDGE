"use client";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Users, Target, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const team = [
        {
            name: "Debajeet Mandal",
            role: "Lead Developer",
            bio: "Passionate about building scalable systems that drive social change. Expert in full-stack development and AI integration.",
            image: "/team/debajeet.png",
        },
        {
            name: "Abro Nile Sarkar",
            role: "Frontend Architect",
            bio: "Crafting beautiful and intuitive user interfaces. ensuring accessible and responsive designs for all users.",
            image: "/team/abronile.png",
        },
        {
            name: "Netra Kale",
            role: "Product Designer",
            bio: "Bridging the gap between user needs and technical feasibility. Focused on creating seamless user experiences.",
            image: "/team/netra.png",
        },
    ];

    return (
        <div className="bg-black min-h-screen text-[#E7E9EA]">
            <Sidebar current="about" />

            <main className="ml-[88px] xl:ml-[275px] min-h-screen flex flex-col">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-24 px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/10 z-0" />
                    <div className="z-10 max-w-4xl">
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-6 pb-2">
                            Bridging the Gap
                        </h1>
                        <p className="text-xl md:text-2xl text-[#71767B] mb-8 leading-relaxed">
                            Connecting confirmed NGO needs with Corporate CSR initiatives through AI-powered matching, ensuring resources reach where they are needed most.
                        </p>
                        <Link href="/matches" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors">
                            Explore Needs <ArrowRight size={20} />
                        </Link>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-20 px-6 md:px-12 lg:px-24 grid md:grid-cols-3 gap-12 bg-[#16181C]">
                    <div className="bg-black/30 p-8 rounded-3xl border border-[#2F3336]">
                        <Target className="text-blue-500 mb-6" size={48} />
                        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                        <p className="text-[#71767B] leading-relaxed">
                            To democratize access to corporate social responsibility funds for verified NGOs, creating a transparent and efficient ecosystem for social impact.
                        </p>
                    </div>
                    <div className="bg-black/30 p-8 rounded-3xl border border-[#2F3336]">
                        <Heart className="text-rose-500 mb-6" size={48} />
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="text-[#71767B] leading-relaxed">
                            A world where every corporate dollar spent on social good finds its most impactful destination, leaving no genuine need unmet.
                        </p>
                    </div>
                    <div className="bg-black/30 p-8 rounded-3xl border border-[#2F3336]">
                        <Users className="text-emerald-500 mb-6" size={48} />
                        <h3 className="text-2xl font-bold mb-4">Our Community</h3>
                        <p className="text-[#71767B] leading-relaxed">
                            Building a network of trusted organizations and conscious corporations working together to solve society's most pressing challenges.
                        </p>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-24 px-6 md:px-12 lg:px-24">
                    <h2 className="text-4xl font-bold text-center mb-16">Meet the Minds</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {team.map((member) => (
                            <div key={member.name} className="group relative bg-[#16181C] rounded-3xl border border-[#2F3336] overflow-hidden hover:border-[#1D9BF0] transition-colors">
                                <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900" />
                                <div className="px-8 pb-8 -mt-16 flex flex-col items-center text-center">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-32 h-32 rounded-full border-4 border-black bg-slate-200 mb-4 group-hover:scale-105 transition-transform object-cover"
                                    />
                                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                    <p className="text-blue-400 text-sm font-medium mb-4">{member.role}</p>
                                    <p className="text-[#71767B] text-sm leading-relaxed">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
}
