const categories = [
  { emoji: "🏥", name: "Medical", count: "284 campaigns" },
  { emoji: "🌱", name: "Nonprofit", count: "196 campaigns" },
  { emoji: "🎨", name: "Creative", count: "143 campaigns" },
  { emoji: "🆘", name: "Emergency", count: "89 campaigns" },
];

export default function Categories() {
  return (
    <section className="py-24 px-15 bg-[#1A1410]">
      <div className="text-xs font-semibold tracking-[0.1em] uppercase text-[#E8820C] mb-3">
        Browse by Category
      </div>
      <h2 className="font-['Playfair_Display'] text-[clamp(2rem,3.5vw,2.8rem)] font-black leading-tight tracking-tight text-[#F7F3ED] max-w-lg">
        Find a cause close to your heart
      </h2>

      <div className="mt-12 grid grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="border border-white/10 rounded-xl px-6 py-7 cursor-pointer group hover:border-[#E8820C] transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[1.8rem] mb-3 block">{cat.emoji}</span>
            <div className="font-['Playfair_Display'] text-base font-bold text-[#F7F3ED] mb-1">
              {cat.name}
            </div>
            <div className="text-xs text-white/40">{cat.count}</div>
          </div>
        ))}
      </div>
    </section>
  );
}