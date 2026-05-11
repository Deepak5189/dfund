"use client";
import { useState } from "react";
import { Campaign, campaigns } from "../explore/CampaignData";

const tabs = ["Story", "Updates", "Comments"];

export default function CampaignStory({ campaign }: { campaign: Campaign }) {
  const [activeTab, setActiveTab] = useState("Story");

  const relatedCampaigns = (() => {
    // Filter out the current campaign and get up to 4 others
    const filtered = campaigns.filter(c => c.id !== campaign.id);
    // Shuffle deterministically based on campaign ID to avoid hydration mismatch
    const seededShuffle = filtered.sort((a, b) => (a.id + campaign.id) - (b.id + campaign.id));
    return seededShuffle.slice(0, 4);
  })();

  return (
    <div>
      {/* Creator bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 24px", background: "white", borderRadius: "12px",
        border: "1px solid #E2D9CC", marginBottom: "32px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: "46px", height: "46px", borderRadius: "50%",
            background: "linear-gradient(135deg, #2D5A8E, #5B9BD5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.85rem", fontWeight: 700, color: "white",
            border: "2px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            flexShrink: 0,
          }}>{campaign?.creatorProfile?.initials}</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#1A1410" }}>{campaign.creatorProfile.name}</div>
            <div style={{ fontSize: "0.78rem", color: "#8A7B6E", marginTop: "1px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>Campaign Creator</span>
              <span style={{ background: "#EBF0E8", color: "#4A6741", padding: "1px 8px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: 600 }}>{campaign?.creatorProfile?.verified ? "✓ Verified" : "Unverified"}</span>
              <span>·</span>
              <span>Started {campaign?.creatorProfile?.startedDate}</span>
            </div>
          </div>
        </div>
        <button style={{
          padding: "8px 18px", borderRadius: "7px",
          border: "1.5px solid #E2D9CC", background: "white",
          fontFamily: "inherit", fontSize: "0.82rem", fontWeight: 600,
          color: "#1A1410", cursor: "pointer",
        }}>
          + Follow
        </button>
      </div>

      Tabs
      <div style={{ display: "flex", borderBottom: "2px solid #E2D9CC", marginBottom: "32px" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "12px 24px", fontSize: "0.875rem",
              fontWeight: activeTab === tab ? 600 : 500,
              color: activeTab === tab ? "#E8820C" : "#8A7B6E",
              background: "none", border: "none",
              borderBottom: `2px solid ${activeTab === tab ? "#E8820C" : "transparent"}`,
              marginBottom: "-2px", cursor: "pointer",
              fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            {tab}
            {tab === "Updates" && (
              <span style={{ background: "#E8820C", color: "white", padding: "1px 7px", borderRadius: "100px", fontSize: "0.68rem", fontWeight: 700 }}>{campaign.updates.length}</span>
            )}
            {tab === "Comments" && (
              <span style={{ background: "#F7F3ED", color: "#8A7B6E", padding: "1px 7px", borderRadius: "100px", fontSize: "0.68rem" }}>{campaign.comments.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Story content */}
      {activeTab === "Story" && (
        <div>
          {campaign.storySections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: "28px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#1A1410", marginBottom: "16px" }}>
                {section.heading}
              </h2>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#3D322A", marginBottom: "16px", fontWeight: 300 }}>
                {section.body}
              </p>

              {section.highlight && <div style={{
                background: "#FEF0DC", borderLeft: "3px solid #E8820C",
                borderRadius: "0 8px 8px 0", padding: "16px 20px",
                margin: "24px 0", fontSize: "0.9rem", lineHeight: 1.7, color: "#3D322A",
              }}>
                <strong style={{ color: "#1A1410" }}>{section.highlight}</strong>
              </div>}
            </div>
          ))}
        </div>
      )}

      {/* Comments */}
      <div style={{ marginTop: "48px" }}>
        {/* Comment input */}
        <div style={{
          display: "flex", gap: "12px", padding: "16px",
          background: "white", borderRadius: "12px", border: "1px solid #E2D9CC",
          marginBottom: "8px",
        }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #E8820C, #F5A640)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.7rem", fontWeight: 700, color: "white",
          }}>YO</div>
          <textarea
            rows={2}
            placeholder="Leave an encouraging message for Sarah and Maya…"
            style={{
              flex: 1, border: "1.5px solid #E2D9CC", borderRadius: "8px",
              padding: "10px 14px", fontFamily: "inherit", fontSize: "0.875rem",
              color: "#1A1410", outline: "none", resize: "none", background: "#F7F3ED",
            }}
          />
          <button style={{
            alignSelf: "flex-end", background: "#1A1410", color: "white",
            padding: "9px 18px", borderRadius: "7px", border: "none",
            fontFamily: "inherit", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
          }}>
            Post
          </button>
        </div>

        {/* Comment list */}
        {campaign.comments.map((c) => (
          <div key={c.name} style={{
            display: "flex", gap: "12px", padding: "16px 0",
            borderBottom: "1px solid #E2D9CC",
          }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
              background: c.avatarGradient, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: "white",
            }}>
              {c.initials}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1A1410" }}>{c.name}</span>
                {c.donatedAmount && (
                  <span style={{ fontSize: "0.68rem", background: "#EBF0E8", color: "#4A6741", padding: "1px 7px", borderRadius: "4px", fontWeight: 600 }}>
                    Donated {c.donatedAmount}
                  </span>
                )}
                <span style={{ fontSize: "0.72rem", color: "#8A7B6E" }}>{c.timeAgo}</span>
              </div>
              <div style={{ fontSize: "0.85rem", color: "#3D322A", lineHeight: 1.6 }}>{c.text}</div>
              <div style={{ display: "flex", gap: "14px", marginTop: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#8A7B6E", cursor: "pointer" }}>❤️ {c.likes}</span>
                <span style={{ fontSize: "0.75rem", color: "#8A7B6E", cursor: "pointer" }}>↩ Reply</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Related campaigns */}
      <div style={{ marginTop: "52px", paddingTop: "40px", borderTop: "1px solid #E2D9CC" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 900, color: "#1A1410", marginBottom: "24px" }}>
          Other campaigns you may like
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(relatedCampaigns.length, 4)}, 1fr)`, gap: "20px" }}>
          {relatedCampaigns.map((c) => (
            <a key={c.id} style={{
              background: "white", borderRadius: "12px",
              border: "1px solid #E2D9CC", overflow: "hidden", cursor: "pointer",
              transition: "all 0.25s",
            }} href={`/campaign-details/${c.id}`}>
              <div style={{ height: "120px", background: c.gradient }} />
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.88rem", fontWeight: 700, color: "#1A1410", lineHeight: 1.3, marginBottom: "10px" }}>
                  {c.title}
                </div>
                <div style={{ height: "3px", background: "#E2D9CC", borderRadius: "10px", overflow: "hidden", marginBottom: "6px" }}>
                  <div style={{ height: "100%", width: `${c.pct}%`, background: "linear-gradient(90deg, #E8820C, #F5A640)", borderRadius: "10px" }} />
                </div>
                <div style={{ fontSize: "0.72rem", color: "#8A7B6E", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 600, color: "#1A1410" }}>{c.raised}</span>
                  <span>{c.daysLeft} days left</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}