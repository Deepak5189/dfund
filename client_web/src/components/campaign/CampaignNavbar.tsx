import Link from "next/link";

export default function CampaignNavbar({ title }: { title: string }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[48px] py-[18px] backdrop-blur-md border-b border-border"
      style={{ background: "rgba(253,250,246,0.92)" }}
    >
      <Link href="/" className="font-serif text-[1.4rem] font-black text-ink no-underline">
        D<span className="text-amber">Fund</span>
      </Link>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "#8A7B6E" }}>
        <Link href="/" style={{ color: "#8A7B6E", textDecoration: "none" }}>Home</Link>
        <span style={{ opacity: 0.4 }}>›</span>
        <Link href="/explore" style={{ color: "#8A7B6E", textDecoration: "none" }}>Medical</Link>
        <span style={{ opacity: 0.4 }}>›</span>
        <span style={{ color: "#1A1410", fontWeight: 500 }}>{title.length > 30 ? title.slice(0, 30) + "..." : title}</span>
      </div>

      <div className="flex items-center gap-5">
        <Link href="#" className="text-sm font-medium text-ink-soft hover:text-amber transition-colors no-underline">
          Log in
        </Link>
        <Link href="#" className="bg-ink text-cream px-5 py-2 rounded-md text-sm font-semibold hover:bg-amber hover:text-ink transition-colors no-underline">
          Start a Campaign
        </Link>
      </div>
    </nav>
  );
}