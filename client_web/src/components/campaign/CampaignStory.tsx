"use client";
import { useState } from "react";
import { Campaign } from "../explore/CampaignCard";

const tabs = ["Story", "Updates", "Comments"];

const comments = [
  {
    initials: "RK",
    gradient: "linear-gradient(135deg, #4A6741, #7DB56A)",
    name: "Rahul Kuma",
    donated: "$100",
    time: "2 hours ago",
    text: "Praying for little Maya's speedy recovery. Donated a small amount — hope it helps. Stay strong, Sarah! 🙏",
    likes: 12,
  },
  {
    initials: "AN",
    gradient: "linear-gradient(135deg, #7B5EA7, #B09FD4)",
    name: "Anjali Nair",
    donated: null,
    time: "5 hours ago",
    text: "Shared this with my family and office group. Children deserve every chance at a healthy life. Wishing Maya a swift and full recovery.",
    likes: 8,
  },
  {
    initials: "DV",
    gradient: "linear-gradient(135deg, #1A6B6B, #3AAFA9)",
    name: "Dr. Dev Verma",
    donated: "$250",
    time: "1 day ago",
    text: "As a cardiologist I can confirm the costs mentioned are accurate for this procedure at AIIMS. This is a legitimate and urgent need. Happy to help.",
    likes: 34,
  },
];

const relatedCampaigns = [
  { gradient: "linear-gradient(135deg, #8B3A52, #C0567A)", title: "Spinal surgery for Rohan, 34 — accident left him paralysed", raised: "$27,500", daysLeft: "5 days left", pct: 55 },
  { gradient: "linear-gradient(135deg, #C0442A, #E8820C)", title: "Fund Aiden's leukemia treatment — 3 cycles remaining", raised: "$41,000", daysLeft: "12 days left", pct: 82 },
  { gradient: "linear-gradient(135deg, #4A6741, #7DB56A)", title: "Cochlear implant for Zara — give her the gift of sound", raised: "$11,400", daysLeft: "31 days left", pct: 38 },
];

export default function CampaignStory({ campaign }: { campaign: Campaign }) {
  const [activeTab, setActiveTab] = useState("Story");

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
          }}>{campaign.initials}</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#1A1410" }}>{campaign.creator}</div>
            <div style={{ fontSize: "0.78rem", color: "#8A7B6E", marginTop: "1px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>Campaign Creator</span>
              <span style={{ background: "#EBF0E8", color: "#4A6741", padding: "1px 8px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: 600 }}>✓ Verified</span>
              <span>·</span>
              <span>Started Apr 12, 2025</span>
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

      {/* Tabs */}
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
              <span style={{ background: "#E8820C", color: "white", padding: "1px 7px", borderRadius: "100px", fontSize: "0.68rem", fontWeight: 700 }}>3</span>
            )}
            {tab === "Comments" && (
              <span style={{ background: "#F7F3ED", color: "#8A7B6E", padding: "1px 7px", borderRadius: "100px", fontSize: "0.68rem" }}>47</span>
            )}
          </button>
        ))}
      </div>

      {/* Story content */}
      {activeTab === "Story" && (
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#1A1410", marginBottom: "16px" }}>
            About Maya
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#3D322A", marginBottom: "16px", fontWeight: 300 }}>
            Maya is a bright, 7-year-old girl who loves painting and wants to become a doctor someday. Last October, she was diagnosed with a congenital ventricular septal defect — a hole in the wall between the two lower chambers of her heart. What began as mild breathlessness has progressed to the point where she can no longer attend school or play with her friends without losing breath.
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#3D322A", marginBottom: "16px", fontWeight: 300 }}>
            Her cardiologist at AIIMS Delhi, Dr. Ravi Sharma, has confirmed that open-heart surgery is the only viable treatment option and must be done within the next 60 days to prevent irreversible damage. The surgery has been scheduled for May 15th, pending funding.
          </p>

          <div style={{
            background: "#FEF0DC", borderLeft: "3px solid #E8820C",
            borderRadius: "0 8px 8px 0", padding: "16px 20px",
            margin: "24px 0", fontSize: "0.9rem", lineHeight: 1.7, color: "#3D322A",
          }}>
            <strong style={{ color: "#1A1410" }}>The total cost of surgery and post-operative care is ₹41,00,000 (~$50,000 USD).</strong> Sarah's family has already contributed ₹8 lakhs from their savings and are seeking help to cover the remaining amount. Every donation — no matter how small — brings Maya one step closer to a healthy, full life.
          </div>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#1A1410", margin: "28px 0 16px" }}>
            How the funds will be used
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#3D322A", marginBottom: "16px", fontWeight: 300 }}>
            100% of donations go directly to Maya's medical care. The funds will be used as follows: surgical procedure and OT charges at AIIMS (₹28L), anaesthesia and ICU care for 5–7 days (₹7L), post-surgery medication and follow-ups over 6 months (₹4L), and family travel and accommodation during the hospital stay (₹2L).
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#3D322A", marginBottom: "16px", fontWeight: 300 }}>
            All hospital bills and expense records will be shared as campaign updates throughout the process. Sarah has provided her Aadhaar, PAN, and hospital documents to DFund for verification.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#1A1410", margin: "28px 0 16px" }}>
            A message from Sarah
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#3D322A", fontWeight: 300 }}>
            "As a mother, watching Maya struggle to breathe while playing is the hardest thing I have ever endured. We have exhausted every option we had. I am reaching out to this community with all the hope I have left. If you can help — even ₹500 — you are giving my daughter a chance at life. Thank you from the bottom of my heart."
          </p>
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
        {comments.map((c) => (
          <div key={c.name} style={{
            display: "flex", gap: "12px", padding: "16px 0",
            borderBottom: "1px solid #E2D9CC",
          }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
              background: c.gradient, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: "white",
            }}>
              {c.initials}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1A1410" }}>{c.name}</span>
                {c.donated && (
                  <span style={{ fontSize: "0.68rem", background: "#EBF0E8", color: "#4A6741", padding: "1px 7px", borderRadius: "4px", fontWeight: 600 }}>
                    Donated {c.donated}
                  </span>
                )}
                <span style={{ fontSize: "0.72rem", color: "#8A7B6E" }}>{c.time}</span>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {relatedCampaigns.map((c) => (
            <div key={c.title} style={{
              background: "white", borderRadius: "12px",
              border: "1px solid #E2D9CC", overflow: "hidden", cursor: "pointer",
              transition: "all 0.25s",
            }}>
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
                  <span>{c.daysLeft}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}