"use client";

import { logoutAction } from "@/lib/store/actions/authActions";
import { AppDispatch } from "@/lib/store/store";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const userData = useSelector((state)=>state.auth?.userData);

  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = () => {
    dispatch(logoutAction());
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-15 py-5 bg-warm-white/85 backdrop-blur-md border-b border-[#E2D9CC]">
      <Link href="/" className="font-serif text-2xl font-black text-ink tracking-tight">
        D<span className="text-amber">Fund</span>
      </Link>

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

        {userData ? (
          <>
            <span className="text-sm font-medium text-ink-soft">
              {userData.user?.name || userData.user?.email}
            </span>
            <button
              onClick={() => handleLogout()}
              className="text-sm font-medium text-ink-soft hover:text-amber transition-colors cursor-pointer bg-none border-none"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium text-ink-soft hover:text-amber transition-colors">
              Log in
            </Link>
            <Link
              href="/create-campaign"
              className="bg-ink text-warm-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-amber hover:text-ink transition-colors"
            >
              Start a Campaign
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}