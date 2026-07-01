"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,           // handle redirect manually
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    // Redirect back to where the user came from (e.g. /create-campaign)
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#FDFAF6", padding: "24px",
    }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "#1A1410" }}>
              D<span style={{ color: "#E8820C" }}>Fund</span>
            </span>
          </Link>
          <p style={{ fontSize: "0.9rem", color: "#8A7B6E", marginTop: "8px" }}>
            Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "white", borderRadius: "16px",
          border: "1px solid #E2D9CC", padding: "36px",
          boxShadow: "0 8px 40px rgba(26,20,16,0.07)",
        }}>

          {/* Redirect notice */}
          {searchParams.get("callbackUrl")?.includes("create-campaign") && (
            <div style={{
              background: "#FEF0DC", border: "1px solid rgba(232,130,12,0.3)",
              borderRadius: "8px", padding: "12px 16px",
              fontSize: "0.82rem", color: "#3D322A", marginBottom: "24px",
            }}>
              🔒 Please sign in to start a campaign.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#1A1410", marginBottom: "6px" }}>
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: "100%", padding: "11px 14px",
                  border: "1.5px solid #E2D9CC", borderRadius: "8px",
                  fontFamily: "inherit", fontSize: "0.9rem",
                  color: "#1A1410", background: "#F7F3ED", outline: "none",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "8px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#1A1410", marginBottom: "6px" }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%", padding: "11px 14px",
                  border: "1.5px solid #E2D9CC", borderRadius: "8px",
                  fontFamily: "inherit", fontSize: "0.9rem",
                  color: "#1A1410", background: "#F7F3ED", outline: "none",
                }}
              />
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: "right", marginBottom: "24px" }}>
              <Link href="/forgot-password" style={{ fontSize: "0.78rem", color: "#8A7B6E", textDecoration: "none" }}>
                Forgot password?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: "rgba(192,68,42,0.08)", border: "1px solid rgba(192,68,42,0.3)",
                borderRadius: "8px", padding: "10px 14px",
                fontSize: "0.82rem", color: "#C0442A", marginBottom: "16px",
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "13px",
                background: loading ? "#8A7B6E" : "#E8820C",
                color: "#1A1410", border: "none", borderRadius: "10px",
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 20px rgba(232,130,12,0.25)",
              }}
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "#E2D9CC" }} />
            <span style={{ fontSize: "0.75rem", color: "#8A7B6E" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "#E2D9CC" }} />
          </div>

          {/* Sign up link */}
          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#8A7B6E" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: "#E8820C", fontWeight: 600, textDecoration: "none" }}>
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}