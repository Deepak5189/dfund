"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function ExploreNavbar() {
  const { data: session } = useSession();
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[48px] py-[18px] backdrop-blur-md border-b border-border"
      style={{ background: "rgba(253,250,246,0.92)" }}
    >
      {/* Logo */}
      <Link href="/" className="font-serif text-[1.4rem] font-black text-ink no-underline">
        D<span className="text-amber">Fund</span>
      </Link>

      {/* Search bar */}
      <div style={{
        flex: 1, maxWidth: "440px", margin: "0 48px",
        display: "flex", alignItems: "center",
        background: "#F7F3ED", border: "1.5px solid #E2D9CC",
        borderRadius: "10px", padding: "0 16px", gap: "10px",
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4, flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search campaigns, causes, creators…"
          // defaultValue="medical"
          style={{
            border: "none", background: "transparent", outline: "none",
            fontFamily: "inherit", fontSize: "0.875rem",
            color: "#1A1410", width: "100%", padding: "11px 0",
          }}
        />
      </div>

      {/* Right links */}
      <div className="flex items-center gap-6">
        <Link href="#" className="text-sm font-medium text-ink-soft hover:text-amber transition-colors no-underline">
          How it Works
        </Link>

        {session ? (
          <>
            <Link href="/my-campaigns" className="bg-ink text-cream px-5 py-2 rounded-md text-sm font-semibold hover:bg-amber hover:text-ink transition-colors no-underline">
              My Campaigns
            </Link>
            <Link href="/explore" className="text-sm font-medium text-ink-soft hover:text-amber transition-colors no-underline">
              {session.user?.name || session.user?.email}
            </Link>
            <button
              onClick={() => signOut()}
              className="text-sm font-medium text-ink-soft hover:text-amber transition-colors cursor-pointer bg-none border-none"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium text-ink-soft hover:text-amber transition-colors no-underline">
              Log in
            </Link>
            <Link href="/create-campaign" className="bg-ink text-cream px-5 py-2 rounded-md text-sm font-semibold hover:bg-amber hover:text-ink transition-colors no-underline">
              Start a Campaign
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}