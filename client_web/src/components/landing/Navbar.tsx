"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-15 py-5 bg-warm-white/85 backdrop-blur-md border-b border-[#E2D9CC]">
      <div className="font-serif text-2xl font-black text-ink tracking-tight">
        D<span className="text-amber">Fund</span>
      </div>

      <div className="flex items-center gap-9">
        <Link href="/explore" className="text-sm font-medium text-ink-soft hover:text-amber transition-colors">
          Explore
        </Link>
        <Link href="#how-it-works" className="text-sm font-medium text-ink-soft hover:text-amber transition-colors">
          How it Works
        </Link>
        <Link href="#" className="text-sm font-medium text-ink-soft hover:text-amber transition-colors">
          For Nonprofits
        </Link>
        <Link href="#" className="text-sm font-medium text-ink-soft hover:text-amber transition-colors">
          Log in
        </Link>
        <Link
          href="#"
          className="bg-ink text-warm-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-amber hover:text-ink transition-colors"
        >
          Start a Campaign
        </Link>
      </div>
    </nav>
  );
}