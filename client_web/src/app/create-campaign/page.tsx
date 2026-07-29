"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import CreateCampaignForm from "@/components/create-campaign/CreateCampaignForm";

export default function CreateCampaignPage() {
  const userData = useSelector((state) => state.auth?.userData);

  if (!userData) return null; // or a redirect/loading state, depending on your auth flow
  console.log(userData);
  return (
    <div style={{ minHeight: "100vh", background: "#FDFAF6" }}>
      {/* Minimal nav */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 60px",
          borderBottom: "1px solid #E2D9CC",
          background: "rgba(253,250,246,0.92)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 900, color: "#1A1410" }}>
            D<span style={{ color: "#E8820C" }}>Fund</span>
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #E8820C, #F5A640)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "white",
            }}
          >
            {userData.user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#3D322A" }}>
            {userData.user?.name ?? userData.user?.email}
          </span>
        </div>
      </nav>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#FEF0DC",
              border: "1px solid rgba(232,130,12,0.3)",
              padding: "6px 14px",
              borderRadius: "100px",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#E8820C",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            ✍️ New Campaign
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-1px",
              color: "#1A1410",
              marginBottom: "12px",
            }}
          >
            Start your campaign
          </h1>
          <p style={{ fontSize: "1rem", color: "#8A7B6E", lineHeight: 1.6 }}>
            Tell your story, set your goal, and start raising funds in minutes. Every campaign is reviewed by our
            team before going live.
          </p>
        </div>

        <CreateCampaignForm creatorId={userData._id || userData.id} />
      </div>
    </div>
  );
}