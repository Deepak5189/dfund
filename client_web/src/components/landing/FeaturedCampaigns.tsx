const campaigns = [
  {
    tag: "Medical",
    gradient: "from-[#2D5A8E] to-[#5B9BD5]",
    avatarGradient: "from-[#2D5A8E] to-[#5B9BD5]",
    initials: "JM",
    creator: "James Mitchell",
    title: "Fund Aiden's leukemia treatment at AIIMS",
    raised: "$34,000 raised",
    daysLeft: "12 days left",
    pct: 68,
  },
  {
    tag: "Nonprofit",
    gradient: "from-[#4A6741] to-[#7DB56A]",
    avatarGradient: "from-[#4A6741] to-[#7DB56A]",
    initials: "GH",
    creator: "Green Horizons NGO",
    title: "Planting 10,000 trees in drought-hit villages",
    raised: "$21,000 raised",
    daysLeft: "30 days left",
    pct: 42,
  },
  {
    tag: "Creative",
    gradient: "from-[#8B3A52] to-[#C0567A]",
    avatarGradient: "from-[#8B3A52] to-[#C0567A]",
    initials: "PK",
    creator: "Priya Kapoor",
    title: "Debut short film about life in urban slums",
    raised: "$8,900 raised",
    daysLeft: "5 days left",
    pct: 89,
  },
];

export default function FeaturedCampaigns() {
  return (
    <section className="py-24 px-15 bg-[#FDFAF6]">
      <div className="text-xs font-semibold tracking-[0.1em] uppercase text-[#E8820C] mb-3">
        Featured Campaigns
      </div>
      <h2 className="font-['Playfair_Display'] text-[clamp(2rem,3.5vw,2.8rem)] font-black leading-tight tracking-tight text-[#1A1410] max-w-lg">
        Real causes, real people, real impact
      </h2>

      <div className="mt-12 grid grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <div
            key={c.title}
            className="bg-white rounded-xl border border-[#E2D9CC] overflow-hidden cursor-pointer group hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(26,20,16,0.1)] hover:border-transparent transition-all duration-300"
          >
            {/* Image */}
            <div className={`h-44 w-full relative bg-gradient-to-br ${c.gradient}`}>
              <span className="absolute top-3.5 left-3.5 bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[0.7rem] font-semibold uppercase tracking-widest border border-white/30">
                {c.tag}
              </span>
            </div>

            {/* Body */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2.5">
                <div
                  className={`w-6 h-6 rounded-full bg-gradient-to-br ${c.avatarGradient} flex items-center justify-center text-[0.6rem] font-bold text-white flex-shrink-0`}
                />
                <span className="text-xs text-[#8A7B6E]">{c.creator}</span>
              </div>

              <h3 className="font-['Playfair_Display'] text-base font-bold leading-snug text-[#1A1410] mb-3.5">
                {c.title}
              </h3>

              {/* Progress */}
              <div className="h-1 bg-[#E2D9CC] rounded-full overflow-hidden mb-2.5">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${c.pct}%`,
                    background: "linear-gradient(90deg, #E8820C, #F5A640)",
                  }}
                />
              </div>

              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#1A1410]">{c.raised}</span>
                <span className="text-[#8A7B6E]">{c.daysLeft}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}