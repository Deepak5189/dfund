"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen pt-36 pb-20 px-15 grid grid-cols-2 gap-16 items-center relative overflow-hidden">
      {/* Background gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 70% 40%, rgba(232,130,12,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 80%, rgba(74,103,65,0.06) 0%, transparent 60%)
          `,
        }}
      />

      {/* LEFT COLUMN */}
      <div className="relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-[#FEF0DC] border border-[#E8820C]/30 px-4 py-1.5 rounded-full text-xs font-semibold text-[#E8820C] uppercase tracking-widest mb-7 animate-fade-up">
          <span className="w-1.5 h-1.5 bg-[#E8820C] rounded-full animate-pulse" />
          Trusted by 12,000+ donors
        </div>

        {/* Title */}
        <h1
          className="font-['Playfair_Display'] text-[clamp(3rem,5vw,4.5rem)] font-black leading-[1.05] tracking-[-1.5px] text-[#1A1410] animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Fund the causes
          <br />
          that <em className="text-[#E8820C]">truly</em>
          <br />
          <span className="relative inline-block">
            matter
            <span
              className="absolute bottom-0.5 left-0 right-0 h-1 bg-[#4A6741] rounded-sm origin-left animate-line-grow"
              style={{ animationDelay: "0.7s" }}
            />
          </span>
          .
        </h1>

        {/* Subtitle */}
        <p
          className="mt-6 text-lg leading-relaxed text-[#3D322A] font-light max-w-[480px] animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          DFund connects real people with real causes — medical emergencies, creative dreams,
          and nonprofit missions. Every campaign is reviewed. Every dollar is tracked.
        </p>

        {/* Actions */}
        <div
          className="flex gap-4 items-center mt-10 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="#"
            className="bg-[#E8820C] text-[#1A1410] px-8 py-4 rounded-lg font-bold text-base hover:bg-[#F5A640] hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(232,130,12,0.3)] hover:shadow-[0_8px_28px_rgba(232,130,12,0.4)]"
          >
            Start a Campaign
          </Link>
          <Link
            href="/explore"
            className="text-[#1A1410] font-semibold text-base inline-flex items-center gap-2 px-2 py-4 border-b-2 border-transparent hover:border-[#1A1410] transition-all group"
          >
            Explore Campaigns
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Trust stats */}
        <div
          className="flex gap-8 mt-14 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div>
            <div className="font-['Playfair_Display'] text-[1.8rem] font-black text-[#1A1410] leading-none">$4.2M</div>
            <div className="text-xs text-[#8A7B6E] font-medium mt-0.5 tracking-wide">Total Raised</div>
          </div>
          <div className="w-px bg-[#E2D9CC]" />
          <div>
            <div className="font-['Playfair_Display'] text-[1.8rem] font-black text-[#1A1410] leading-none">1,840</div>
            <div className="text-xs text-[#8A7B6E] font-medium mt-0.5 tracking-wide">Campaigns Funded</div>
          </div>
          <div className="w-px bg-[#E2D9CC]" />
          <div>
            <div className="font-['Playfair_Display'] text-[1.8rem] font-black text-[#1A1410] leading-none">98%</div>
            <div className="text-xs text-[#8A7B6E] font-medium mt-0.5 tracking-wide">Approval Accuracy</div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — Campaign Card */}
      <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
        {/* Main card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(26,20,16,0.12),0_4px_16px_rgba(26,20,16,0.06)] rotate-[1.5deg] hover:rotate-0 hover:scale-[1.01] transition-transform duration-300">
          {/* Card image */}
          <div
            className="w-full h-56 relative flex items-end p-5"
            style={{ background: "linear-gradient(135deg, #C0442A 0%, #E8820C 50%, #F5A640 100%)" }}
          >
            <span className="relative z-10 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border border-white/30">
              🏥 Medical
            </span>
          </div>

          {/* Card body */}
          <div className="px-6 pt-5 pb-6">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #4A6741, #E8820C)" }}>
                SR
              </div>
              <span className="text-sm font-semibold text-[#3D322A]">Sarah Rahman · Verified Creator</span>
            </div>

            <h3 className="font-['Playfair_Display'] text-xl font-bold leading-snug text-[#1A1410] mb-4">
              Help cover Maya's heart surgery expenses
            </h3>

            {/* Progress */}
            <div className="mb-4">
              <div className="h-1.5 bg-[#E2D9CC] rounded-full overflow-hidden mb-2.5">
                <div
                  className="h-full rounded-full animate-progress-grow"
                  style={{ background: "linear-gradient(90deg, #E8820C, #F5A640)", width: "73%" }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <span className="font-bold text-[#1A1410]">$36,500</span>{" "}
                  <span className="text-[#8A7B6E]">of $50,000</span>
                </div>
                <span className="font-mono text-xs text-[#E8820C] font-medium">73%</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[#E2D9CC]">
              <span className="text-sm text-[#8A7B6E]">
                <strong className="text-[#1A1410]">18 days</strong> left
              </span>
              <button className="bg-[#1A1410] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#E8820C] hover:text-[#1A1410] transition-colors">
                Donate Now
              </button>
            </div>
          </div>
        </div>

        {/* Floating card 1 */}
        <div className="absolute -bottom-5 -left-10 bg-white rounded-xl px-4 py-3 shadow-[0_8px_32px_rgba(26,20,16,0.1)] flex items-center gap-2.5 text-sm font-medium animate-float">
          <div className="w-9 h-9 rounded-lg bg-[#EBF0E8] flex items-center justify-center text-base">✅</div>
          <div>
            <div className="text-xs text-[#8A7B6E]">Admin verified</div>
            <div className="font-bold text-[#1A1410] text-sm">Campaign Approved</div>
          </div>
        </div>

        {/* Floating card 2 */}
        <div
          className="absolute top-8 -right-12 bg-white rounded-xl px-4 py-3 shadow-[0_8px_32px_rgba(26,20,16,0.1)] flex items-center gap-2.5 text-sm font-medium animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="w-9 h-9 rounded-lg bg-[#FEF0DC] flex items-center justify-center text-base">💰</div>
          <div>
            <div className="text-xs text-[#8A7B6E]">New donation</div>
            <div className="font-bold text-[#1A1410] text-sm">$250 just donated</div>
          </div>
        </div>
      </div>
    </section>
  );
}