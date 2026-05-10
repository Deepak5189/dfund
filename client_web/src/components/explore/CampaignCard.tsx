"use client";

import { useRouter } from "next/navigation";

export interface Campaign {
  id: number;
  tag: string;
  urgent?: boolean;
  gradient: string;
  avatarGradient: string;
  initials: string;
  creator: string;
  title: string;
  description?: string;
  raised: string;
  goal: string;
  pct: number;
  donors: number;
  daysLeft: number; 
  featured?: boolean;
  saved?: boolean;
  links?: Array<string>;
}

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const { featured } = campaign;

  const router = useRouter();

  return (
    <div style={{
      background: "white",
      borderRadius: "14px",
      border: "1px solid #E2D9CC",
      overflow: "hidden",
      cursor: "pointer",
      transition: "all 0.25s",
      ...(featured && {
        gridColumn: "span 3",
        display: "grid",
        gridTemplateColumns: "380px 1fr",
      }),
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 16px 48px rgba(26,20,16,0.1)";
        el.style.borderColor = "transparent";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
        el.style.borderColor = "#E2D9CC";
      }}
      onClick={() => {
        router.push('/campaign-details/' + campaign.id);
      }}
    >
      {/* Image */}
      <div style={{
        height: featured ? "100%" : "172px",
        minHeight: featured ? "220px" : undefined,
        width: "100%",
        background: campaign.gradient,
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        padding: "12px",
      }}>
        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)",
        }} />

        {/* Tags */}
        <div style={{ display: "flex", gap: "6px", position: "relative", zIndex: 1 }}>
          <span style={{
            background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
            color: "white", padding: "3px 10px", borderRadius: "100px",
            fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.04em",
            textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.3)",
          }}>
            {campaign.tag}
          </span>
          {campaign.urgent && (
            <span style={{
              background: "rgba(192,68,42,0.85)", color: "white",
              padding: "3px 10px", borderRadius: "100px",
              fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.04em",
              textTransform: "uppercase", border: "1px solid rgba(192,68,42,0.5)",
            }}>
              Urgent
            </span>
          )}
        </div>

        {/* Bookmark */}
        <div style={{
          position: "absolute", top: "12px", right: "12px", zIndex: 2,
          width: "32px", height: "32px", borderRadius: "8px",
          background: campaign.saved ? "#E8820C" : "rgba(255,255,255,0.2)",
          backdropFilter: "blur(8px)",
          border: `1px solid ${campaign.saved ? "#E8820C" : "rgba(255,255,255,0.3)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "0.85rem",
        }}>
          🔖
        </div>
      </div>

      {/* Body */}
      <div style={{
        padding: featured ? "28px 32px" : "18px 20px 20px",
        display: featured ? "flex" : "block",
        flexDirection: featured ? "column" : undefined,
        justifyContent: featured ? "center" : undefined,
      }}>
        {featured && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "#FEF0DC", border: "1px solid rgba(232,130,12,0.3)",
            color: "#E8820C", padding: "4px 10px", borderRadius: "100px",
            fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.04em",
            textTransform: "uppercase", marginBottom: "14px", alignSelf: "flex-start",
          }}>
            ⭐ Featured Campaign
          </div>
        )}

        {/* Creator row */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: featured ? "flex-start" : "space-between",
          gap: featured ? "8px" : undefined,
          marginBottom: featured ? "12px" : "8px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div style={{
              width: "22px", height: "22px", borderRadius: "50%",
              background: campaign.avatarGradient,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.55rem", fontWeight: 700, color: "white", flexShrink: 0,
            }}>
              {campaign.initials}
            </div>
            <span style={{ fontSize: "0.72rem", color: "#8A7B6E" }}>{campaign.creator}</span>
          </div>
          <span style={{
            fontSize: "0.65rem", color: "#4A6741",
            background: "#EBF0E8", padding: "1px 6px",
            borderRadius: "4px", fontWeight: 600,
          }}>
            ✓ Verified
          </span>
        </div>

        {/* Title */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: featured ? "1.3rem" : "0.98rem",
          fontWeight: 700, lineHeight: 1.35, color: "#1A1410",
          marginBottom: featured ? "10px" : "14px",
        }}>
          {campaign.title}
        </div>

        {/* Description (featured only) */}
        {featured && campaign.description && (
          <div style={{
            fontSize: "0.85rem", color: "#3D322A", lineHeight: 1.65,
            marginBottom: "20px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          } as React.CSSProperties}>
            {campaign.description}
          </div>
        )}

        {/* Progress */}
        <div style={{ marginBottom: "12px" }}>
          <div style={{ height: "5px", background: "#E2D9CC", borderRadius: "10px", overflow: "hidden", marginBottom: "8px" }}>
            <div style={{
              height: "100%", width: `${campaign.pct}%`,
              background: "linear-gradient(90deg, #E8820C, #F5A640)",
              borderRadius: "10px",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
            <span style={{ fontWeight: 700, color: "#1A1410" }}>{campaign.raised} raised</span>
            <span style={{ color: "#8A7B6E" }}>of {campaign.goal}{featured ? ` · ${campaign.pct}%` : ""}</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: "12px", borderTop: "1px solid #E2D9CC",
        }}>
          <div style={{ display: "flex", gap: "14px" }}>
            <span style={{ fontSize: "0.72rem", color: "#8A7B6E", display: "flex", alignItems: "center", gap: "4px" }}>
              👥 <strong style={{ color: "#1A1410", fontSize: "0.78rem" }}>{campaign.donors}</strong>
              {featured ? " donors" : ""}
            </span>
            <span style={{ fontSize: "0.72rem", color: "#8A7B6E", display: "flex", alignItems: "center", gap: "4px" }}>
              🕐 <strong style={{ color: "#1A1410", fontSize: "0.78rem" }}>{campaign.daysLeft}{featured ? "" : "d"}</strong>
              {featured ? " days left" : " left"}
            </span>
          </div>
          <button style={{
            background: "#1A1410", color: "white",
            padding: "6px 14px", borderRadius: "6px",
            fontSize: "0.75rem", fontWeight: 600,
            border: "none", cursor: "pointer",
          }}>
            {featured ? "Donate Now →" : "Donate"}
          </button>
        </div>
      </div>
    </div>
  );
}