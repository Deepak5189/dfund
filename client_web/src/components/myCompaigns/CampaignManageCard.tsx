"use client";

import Link from "next/link";

const statusStyles = {
  Active: { bg: "#E9F7EC", color: "#1F8A3B" },
  Completed: { bg: "#EDEBFB", color: "#5B4CC4" },
  Draft: { bg: "#F7F3ED", color: "#8A7B6E" },
};

export default function CampaignManageCard({ campaign }) {
  const pct = campaign.goal ? Math.min(100, Math.round((campaign.raised / campaign.goal) * 100)) : 0;
  const statusStyle = statusStyles[campaign.status] || statusStyles.Draft;

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        background: "white",
        border: "1px solid #E2D9CC",
        borderRadius: "14px",
        padding: "16px",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: "160px",
          height: "110px",
          borderRadius: "10px",
          flexShrink: 0,
          background: campaign.gradient,
        }}
      />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: "100px",
              background: statusStyle.bg,
              color: statusStyle.color,
            }}
          >
            {campaign.status}
          </span>
          <span style={{ fontSize: "0.7rem", color: "#8A7B6E", fontFamily: "monospace" }}>
            {campaign.category}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#1A1410",
            marginBottom: "10px",
          }}
        >
          {campaign.title}
        </h3>

        {/* Progress */}
        <div style={{ marginBottom: "8px" }}>
          <div
            style={{
              height: "6px",
              borderRadius: "10px",
              background: "#F0EAE0",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: "#E8820C",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "0.78rem",
            color: "#3D322A",
          }}
        >
          <span style={{ fontWeight: 600 }}>
            ${campaign.raised.toLocaleString()}{" "}
            <span style={{ color: "#8A7B6E", fontWeight: 400 }}>
              raised of ${campaign.goal.toLocaleString()} ({pct}%)
            </span>
          </span>
          <span style={{ color: "#8A7B6E" }}>{campaign.donors} donors</span>
          {campaign.daysLeft !== null && (
            <span style={{ color: "#8A7B6E" }}>{campaign.daysLeft} days left</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Link
          href={`/campaigns/${campaign.id}`}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1.5px solid #E2D9CC",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#1A1410",
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          View
        </Link>
        <Link
          href={`/campaigns/${campaign.id}/edit`}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1.5px solid #1A1410",
            background: "#1A1410",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "white",
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          Edit
        </Link>
      </div>
    </div>
  );
}