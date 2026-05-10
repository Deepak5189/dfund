import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 px-15 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,130,12,0.06) 0%, transparent 70%)",
        }}
      />
      <h2 className="relative font-['Playfair_Display'] text-[clamp(2.5rem,5vw,4rem)] font-black leading-[1.05] tracking-[-1px] text-[#1A1410] max-w-2xl mx-auto mb-5">
        Ready to make a <em className="text-[#E8820C]">difference</em>?
      </h2>
      <p className="relative text-[#8A7B6E] text-base mb-10">
        Start your campaign today — it takes less than 10 minutes.
      </p>
      <div className="relative flex gap-4 justify-center items-center">
        <Link
          href="#"
          className="bg-[#E8820C] text-[#1A1410] px-8 py-4 rounded-lg font-bold text-base hover:bg-[#F5A640] hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(232,130,12,0.3)]"
        >
          Start a Campaign
        </Link>
        <Link
          href="#"
          className="text-[#1A1410] font-semibold text-base inline-flex items-center gap-2 px-2 py-4 border-b-2 border-transparent hover:border-[#1A1410] transition-all group"
        >
          Explore Campaigns
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </section>
  );
}