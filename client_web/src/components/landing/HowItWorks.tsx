const steps = [
  {
    num: "01 — Create",
    icon: "✍️",
    title: "Tell your story",
    desc: "Fill out your campaign details — your goal, your story, and supporting media. Our guided form makes it simple and thorough.",
  },
  {
    num: "02 — Get Verified",
    icon: "🔍",
    title: "Admin reviews your campaign",
    desc: "Our team reviews every campaign before it goes live to ensure authenticity and protect donors. Typically within 24 hours.",
  },
  {
    num: "03 — Raise Funds",
    icon: "🚀",
    title: "Share and start collecting",
    desc: "Once approved, your campaign goes live. Share it across social media and watch donations come in via secure Stripe payments.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-15 bg-[#F7F3ED]">
      <div className="text-xs font-semibold tracking-[0.1em] uppercase text-[#E8820C] mb-3">
        How it works
      </div>
      <h2 className="font-['Playfair_Display'] text-[clamp(2rem,3.5vw,2.8rem)] font-black leading-tight tracking-tight text-[#1A1410] max-w-lg">
        Three steps to fund what you believe in
      </h2>

      <div className="mt-14 grid grid-cols-3 gap-0.5 border border-[#E2D9CC] rounded-2xl overflow-hidden">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-white px-9 py-10 group hover:bg-[#FEF0DC] transition-colors"
          >
            <div className="font-mono text-xs font-medium text-[#8A7B6E] tracking-widest mb-5">
              {step.num}
            </div>
            <div className="w-13 h-13 rounded-xl bg-[#F7F3ED] border border-[#E2D9CC] flex items-center justify-center text-2xl mb-5 group-hover:bg-white transition-colors">
              {step.icon}
            </div>
            <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A1410] mb-2.5">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-[#3D322A]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}