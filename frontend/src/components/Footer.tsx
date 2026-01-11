import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full border-t border-[#2F3336] bg-black text-[#71767B] py-12 mt-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand Column */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-white">
                        <Zap className="fill-white" size={24} />
                        <span className="text-xl font-bold">ImpactBridge</span>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Connecting NGOs and Corporate CSR initiatives with AI-powered matching to maximize social impact.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-bold text-lg">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/matches" className="hover:text-white transition-colors">Explore Needs</Link></li>
                        <li><Link href="/reports" className="hover:text-white transition-colors">Impact Reports</Link></li>
                        <li><Link href="/dashboard/csr" className="hover:text-white transition-colors">CSR Dashboard</Link></li>
                    </ul>
                </div>

                {/* Legal */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-bold text-lg">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-bold text-lg">Connect</h3>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                        <a href="mailto:contact@impactbridge.com" className="hover:text-white transition-colors"><Mail size={20} /></a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-[#2F3336] text-center text-sm">
                <p>&copy; {new Date().getFullYear()} ImpactBridge. All rights reserved.</p>
            </div>
        </footer>
    );
}
