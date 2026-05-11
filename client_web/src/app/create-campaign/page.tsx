import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function CreateCampaignPage() {
  // Server-side session check (middleware already blocks unauthenticated
  // users, but this is a safety net and gives us the user object)
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/create-campaign");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FDFAF6" }}>

      {/* Minimal nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 60px", borderBottom: "1px solid #E2D9CC",
        background: "rgba(253,250,246,0.92)", backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 900, color: "#1A1410" }}>
            D<span style={{ color: "#E8820C" }}>Fund</span>
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: "linear-gradient(135deg, #E8820C, #F5A640)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.72rem", fontWeight: 700, color: "white",
          }}>
            {session.user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#3D322A" }}>
            {session.user?.name ?? session.user?.email}
          </span>
        </div>
      </nav>

      {/* Page shell — form content goes here */}
      <div style={{
        maxWidth: "760px", margin: "0 auto",
        padding: "60px 24px 80px",
      }}>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#FEF0DC", border: "1px solid rgba(232,130,12,0.3)",
            padding: "6px 14px", borderRadius: "100px",
            fontSize: "0.72rem", fontWeight: 600, color: "#E8820C",
            letterSpacing: "0.05em", textTransform: "uppercase",
            marginBottom: "20px",
          }}>
            ✍️ New Campaign
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 900, lineHeight: 1.1,
            letterSpacing: "-1px", color: "#1A1410",
            marginBottom: "12px",
          }}>
            Start your campaign
          </h1>
          <p style={{ fontSize: "1rem", color: "#8A7B6E", lineHeight: 1.6 }}>
            Tell your story, set your goal, and start raising funds in minutes.
            Every campaign is reviewed by our team before going live.
          </p>
        </div>

        {/* Steps indicator */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0",
          marginBottom: "52px",
        }}>
          {["Basic Info", "Your Story", "Goal & Timeline", "Review"].map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center", flex: i < 3 ? 1 : undefined }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: i === 0 ? "#E8820C" : "#E2D9CC",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.78rem", fontWeight: 700,
                  color: i === 0 ? "#1A1410" : "#8A7B6E",
                }}>
                  {i + 1}
                </div>
                <span style={{
                  fontSize: "0.7rem", fontWeight: i === 0 ? 600 : 400,
                  color: i === 0 ? "#1A1410" : "#8A7B6E",
                  whiteSpace: "nowrap",
                }}>
                  {step}
                </span>
              </div>
              {i < 3 && (
                <div style={{ flex: 1, height: "1px", background: "#E2D9CC", margin: "0 8px", marginBottom: "22px" }} />
              )}
            </div>
          ))}
        </div>

        {/* Form shell placeholder */}
        <div style={{
          background: "white", borderRadius: "16px",
          border: "1px solid #E2D9CC", padding: "48px",
          boxShadow: "0 4px 24px rgba(26,20,16,0.05)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>🚧</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.4rem", fontWeight: 700, color: "#1A1410", marginBottom: "10px",
          }}>
            Form coming soon
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#8A7B6E", maxWidth: "360px", margin: "0 auto" }}>
            You&apos;re authenticated as <strong style={{ color: "#1A1410" }}>{session.user?.email}</strong>.
            The multi-step form will be built here next.
          </p>
        </div>
      </div>
    </div>
  );
}