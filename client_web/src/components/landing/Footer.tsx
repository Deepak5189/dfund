import Link from "next/link";

const footerLinks = {
  Platform: ["Explore Campaigns", "Start a Campaign", "How it Works", "Pricing & Fees"],
  Company: ["About Us", "Blog", "Careers", "Contact"],
  Legal: ["Terms of Service", "Privacy Policy", "Cookie Policy", "Security"],
};

export default function Footer() {
  return (
    <footer className="bg-[#1A1410] pt-16 pb-8 px-15">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-16 pb-12 border-b border-white/10">
        {/* Brand */}
        <div>
          <div className="font-['Playfair_Display'] text-2xl font-black text-[#F7F3ED]">
            D<span className="text-[#E8820C]">Fund</span>
          </div>
          <p className="text-sm text-white/45 leading-relaxed mt-3.5 max-w-[280px]">
            A social fundraising platform built on trust, transparency, and community.
            Every campaign is reviewed by humans before going live.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="text-xs font-semibold tracking-[0.08em] uppercase text-white/40 mb-4">
              {heading}
            </h4>
            {links.map((link) => (
              <Link
                key={link}
                href="#"
                className="block text-sm text-white/65 hover:text-[#E8820C] transition-colors mb-2.5"
              >
                {link}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-7 text-xs text-white/30">
        <span>© 2025 DFund. All rights reserved.</span>
        <span>Made with care for causes that matter.</span>
      </div>
    </footer>
  );
}