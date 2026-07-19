"use client";

import Link from "next/link";
import { myCampaigns } from "../explore/CampaignData";
import CampaignManageCard from "./CampaignManageCard";

export default function MyCampaignsMain() {
  const totalRaised = myCampaigns.reduce((sum, c) => sum + c.raised, 0);
  const activeCount = myCampaigns.filter((c) => c.status === "Active").length;
  const totalDonors = myCampaigns.reduce((sum, c) => sum + c.donors, 0);

  const stats = [
    { label: "Total Raised", value: `$${totalRaised.toLocaleString()}` },
    { label: "Active Campaigns", value: activeCount },
    { label: "Total Donors", value: totalDonors.toLocaleString() },
    { label: "All Campaigns", value: myCampaigns.length },
  ];

  return (
    <main style={{ maxWidth: "1180px", margin: "0 auto", padding: "40px 40px 80px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.8rem",
              fontWeight: 900,
              color: "#1A1410",
              letterSpacing: "-0.3px",
            }}
          >
            My Campaigns
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#8A7B6E", marginTop: "4px" }}>
            Manage and track all the campaigns you've created
          </p>
        </div>
        <Link
          href="/create-campaign"
          style={{
            background: "#1A1410",
            color: "#FDFAF6",
            padding: "11px 22px",
            borderRadius: "8px",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          + Start New Campaign
        </Link>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "36px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "white",
              border: "1px solid #E2D9CC",
              borderRadius: "12px",
              padding: "18px 20px",
            }}
          >
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#8A7B6E",
                marginBottom: "8px",
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#1A1410",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Campaign list */}
      {myCampaigns.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            color: "#8A7B6E",
            border: "1.5px dashed #E2D9CC",
            borderRadius: "12px",
          }}
        >
          <p style={{ fontSize: "0.95rem", marginBottom: "16px" }}>
            You haven't created any campaigns yet.
          </p>
          <Link
            href="/create-campaign"
            style={{
              color: "#E8820C",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Start your first campaign →
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {myCampaigns.map((campaign) => (
            <CampaignManageCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </main>
  );
}