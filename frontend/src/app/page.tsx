"use client";
import Link from 'next/link';
import { ArrowRight, Users, Building2, TrendingUp, MapPin, Clock, CheckCircle2, Bell, FileText, ChevronRight, Zap, Target, BarChart3, Shield, Award, Search, Hash } from 'lucide-react';

export default function LandingPage() {
  const stats = [
    { value: '125K+', label: 'Meals Distributed', sub: 'This quarter', trend: '+23%', trendLabel: 'vs last month' },
    { value: '340', label: 'Partner NGOs', sub: 'Active organizations', icon: Users },
    { value: '89', label: 'Corporate Donors', sub: 'Hotels, factories, corporates', icon: Building2 },
    { value: '45 tons', label: 'Waste Reduced', sub: 'Food saved from landfills', trend: '+18%', trendLabel: 'vs last month' },
  ];

  const features = [
    { icon: MapPin, text: 'Proximity-based matching within configurable radius', color: 'text-[#2563EB]' },
    { icon: Clock, text: 'Time-sensitive donations handled with urgency scoring', color: 'text-[#2563EB]' },
    { icon: CheckCircle2, text: 'Capacity verification ensures NGOs can handle donations', color: 'text-[#2563EB]' },
    { icon: Bell, text: 'Real-time notifications for immediate action', color: 'text-[#2563EB]' },
  ];

  const leaders = [
    { rank: 1, name: 'Grand Hyatt Hotels', badge: 'Gold', type: 'Corporate Donor', donations: 847 },
    { rank: 2, name: 'Tata Group CSR', badge: 'Silver', type: 'Corporate Donor', donations: 623 },
    { rank: 3, name: 'Infosys Foundation', badge: 'Bronze', type: 'Corporate Donor', donations: 512 },
    { rank: 4, name: 'ITC Hotels', badge: null, type: 'Corporate Donor', donations: 389 },
    { rank: 5, name: 'Wipro Cares', badge: null, type: 'Corporate Donor', donations: 278 },
  ];

  return (
    <div className="min-h-screen bg-black text-[#E7E9EA] font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black/65 backdrop-blur-md z-50 border-b border-[#2F3336]">
        <div className="max-w-[1265px] mx-auto px-4 h-[53px] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-2 rounded-full hover:bg-[rgba(37,99,235,0.1)] transition-colors">
              <Zap className="text-[#E7E9EA]" size={26} fill="white" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 font-bold text-[15px]">
            <a href="#" className="relative text-[#E7E9EA]">Home <div className="absolute -bottom-[17px] left-0 w-full h-[4px] bg-[#2563EB] rounded-full"></div></a>
            <a href="#about" className="text-[#71767B] hover:text-[#E7E9EA] transition-colors">About</a>
            <a href="#impact" className="text-[#71767B] hover:text-[#E7E9EA] transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="px-5 py-1.5 border border-[#536471] hover:bg-[rgba(239,243,244,0.1)] text-[#EFF3F4] font-bold rounded-full transition-colors text-sm">
              Sign In
            </Link>
            <Link
              href="/auth/login"
              className="px-5 py-1.5 bg-[#EFF3F4] text-black rounded-full font-bold text-sm hover:bg-[#D7DBDC] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 border-b border-[#2F3336]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[rgba(37,99,235,0.1)] rounded-full text-[#2563EB] text-[13px] font-bold mb-6 border border-[#2563EB]/20">
            <Zap size={14} fill="currentColor" />
            AI-Powered Donation Matching
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-[#E7E9EA] tracking-tight mb-6 leading-none">
            Bridge Surplus to Need with <span className="text-[#2563EB]">Precision</span>
          </h1>

          <p className="text-xl text-[#71767B] max-w-2xl mx-auto mb-10 leading-relaxed">
            ImpactBridge connects corporate donors with NGOs using AI to maximize
            social impact, reduce waste, and generate comprehensive CSR reports.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/auth/login?role=COMPANY"
              className="px-8 py-3 bg-[#2563EB] text-white rounded-full font-bold text-lg hover:bg-[#1D4ED8] transition-colors"
            >
              Start Donating
            </Link>
            <Link
              href="#about"
              className="px-8 py-3 bg-transparent text-[#E7E9EA] rounded-full font-bold text-lg border border-[#536471] hover:bg-[rgba(239,243,244,0.1)] transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-0 border-b border-[#2F3336]">
        <div className="max-w-[1265px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#2F3336]">
            {stats.map((stat, i) => (
              <div key={i} className="px-8 py-10 hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-4xl font-extrabold text-[#E7E9EA]">{stat.value}</p>
                  {stat.trend && (
                    <span className="flex items-center gap-1 text-[#00BA7C] text-xs font-bold">
                      ↑ {stat.trend}
                    </span>
                  )}
                  {stat.icon && <stat.icon className="text-[#71767B]" size={24} />}
                </div>
                <p className="text-sm font-bold text-[#E7E9EA] uppercase tracking-wide">{stat.label}</p>
                <p className="text-xs text-[#71767B] mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligent Matching Section */}
      <section className="py-20 px-4 border-b border-[#2F3336]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              <h2 className="text-4xl font-extrabold text-[#E7E9EA] mb-6 leading-tight">
                Intelligent Matching,<br />
                <span className="text-[#71767B]">Transparent Impact.</span>
              </h2>
              <p className="text-[#E7E9EA] text-lg mb-8 leading-relaxed">
                Every match is explainable. Our AI doesn&apos;t just connect—it explains why each NGO was selected, creating trust and accountability.
              </p>

              <div className="space-y-5">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <feature.icon className={feature.color} size={24} />
                    <span className="text-[#E7E9EA] text-lg font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: AI Explanation Card (Twitter Style) */}
            <div className="bg-black rounded-2xl border border-[#2F3336] overflow-hidden">
              <div className="p-4 border-b border-[#2F3336] flex items-center justify-between bg-black/50 backdrop-blur-sm sticky top-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center">
                    <Zap size={20} className="text-white" fill="white" />
                  </div>
                  <div>
                    <div className="font-bold text-[#E7E9EA]">AI Match Engine</div>
                    <div className="text-[#71767B] text-sm">@impact_ai</div>
                  </div>
                </div>
                <div className="text-[#71767B]"><ArrowRight size={20} /></div>
              </div>
              <div className="p-4">
                <p className="text-[#E7E9EA] text-lg mb-2">
                  Match Analysis for <span className="text-[#2563EB] hover:underline cursor-pointer">@hope_foundation</span>:
                </p>
                <div className="space-y-1 mb-4">
                  <p className="text-[#2563EB] text-[15px] hover:underline cursor-pointer">#HighUrgency #ProximityMatch #CapacityVerified</p>
                </div>

                <div className="border border-[#2F3336] rounded-xl overflow-hidden mb-4">
                  <div className="p-3 border-b border-[#2F3336] hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                    <div className="text-[#71767B] text-xs uppercase font-bold mb-1">Distance</div>
                    <div className="text-[#E7E9EA] font-bold">2.3 KM from pickup</div>
                  </div>
                  <div className="p-3 border-b border-[#2F3336] hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                    <div className="text-[#71767B] text-xs uppercase font-bold mb-1">Urgency Score</div>
                    <div className="text-[#E7E9EA] font-bold flex items-center gap-2">
                      <div className="w-24 h-2 bg-[#2F3336] rounded-full overflow-hidden">
                        <div className="h-full bg-[#F91880] w-[80%]"></div>
                      </div>
                      8/10 Priority
                    </div>
                  </div>
                  <div className="p-3 hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                    <div className="text-[#71767B] text-xs uppercase font-bold mb-1">Relevance</div>
                    <div className="text-[#E7E9EA] font-bold">94% Semantic Match</div>
                  </div>
                </div>

                <div className="text-[#71767B] text-[15px]">
                  10:42 AM · Jan 10, 2026 · <span className="text-[#E7E9EA] font-bold">2.4K</span> Views
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Leaders */}
      <section id="impact" className="py-20 px-4 border-b border-[#2F3336]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#E7E9EA] mb-4">Impact Leaders</h2>
            <p className="text-[#71767B]">
              Celebrating the organizations making the biggest difference in bridging surplus to need.
            </p>
          </div>

          <div className="bg-black rounded-2xl border border-[#2F3336] overflow-hidden">
            {leaders.map((leader, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-6 py-5 ${i !== leaders.length - 1 ? 'border-b border-[#2F3336]' : ''} hover:bg-[rgba(255,255,255,0.03)] transition-colors cursor-pointer`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center text-lg font-bold">
                    {leader.rank === 1 ? '🥇' : leader.rank === 2 ? '🥈' : leader.rank === 3 ? '🥉' : <span className="text-[#71767B] text-sm">#{leader.rank}</span>}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-[#E7E9EA] hover:underline">{leader.name}</h4>
                      {leader.badge && (
                        <Award size={16} className={leader.badge === 'Gold' ? 'text-[#FFD400]' : leader.badge === 'Silver' ? 'text-[#71767B]' : 'text-[#F97316]'} />
                      )}
                    </div>
                    <p className="text-sm text-[#71767B]">{leader.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#E7E9EA]">{leader.donations}</p>
                  <p className="text-xs text-[#71767B]">donations</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 border-b border-[#2F3336]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <Zap size={64} className="text-[#E7E9EA]" fill="white" />
          </div>
          <h2 className="text-5xl font-extrabold text-[#E7E9EA] mb-8">
            Ready to Make an Impact?
          </h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/auth/login?role=COMPANY"
              className="px-10 py-4 bg-[#E7E9EA] text-black rounded-full font-bold text-xl hover:bg-[#D7DBDC] transition-colors"
            >
              Join as Donor
            </Link>
            <Link
              href="/auth/login?role=NGO"
              className="px-10 py-4 bg-[#2563EB] text-white rounded-full font-bold text-xl hover:bg-[#1D4ED8] transition-colors"
            >
              Join as NGO
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6">
        <div className="max-w-[1265px] mx-auto text-center text-[#71767B] text-sm">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="hover:text-[#E7E9EA] hover:underline">About</a>
            <a href="#" className="hover:text-[#E7E9EA] hover:underline">Help Center</a>
            <a href="#" className="hover:text-[#E7E9EA] hover:underline">Terms of Service</a>
            <a href="#" className="hover:text-[#E7E9EA] hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-[#E7E9EA] hover:underline">Cookie Policy</a>
            <a href="#" className="hover:text-[#E7E9EA] hover:underline">Imprint</a>
            <a href="#" className="hover:text-[#E7E9EA] hover:underline">Accessibility</a>
            <a href="#" className="hover:text-[#E7E9EA] hover:underline">Ads info</a>
            <a href="#" className="hover:text-[#E7E9EA] hover:underline">Blog</a>
          </div>
          <p>© 2026 ImpactBridge Corp.</p>
        </div>
      </footer>
    </div>
  );
}
