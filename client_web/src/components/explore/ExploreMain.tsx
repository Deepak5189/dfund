"use client";
import { useEffect, useState } from "react";
import CampaignCard, { Campaign } from "./CampaignCard";
import { fetchAllCampaigns } from "@/lib/store/api/postAPI";
import { Response } from "../create-campaign/CreateCampaignForm";

// const campaigns: Array<Campaign>=[];

export default function ExploreMain() {

  const [campaigns, setCampaigns] = useState<Array<Campaign>>([]);

  useEffect(()=>{
    const fetchCampaigns = async ()=>{
      try{
        const res: Response = await fetchAllCampaigns();
        if(res.error){
          setCampaigns([]);
          return;
        }
        setCampaigns(res.data);
        console.log(res.data);
      }catch(error){
        throw new Error(`Got this error in exploreMain component: ${error}`);
      }
    }
    fetchCampaigns();
  }, [])

  return (
    <main style={{ flex: 1, padding: "32px 40px", minWidth: 0 }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.6rem", fontWeight: 900,
            color: "#1A1410", letterSpacing: "-0.3px",
          }}>
            Medical Campaigns
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#8A7B6E", marginTop: "3px" }}>
            Showing 284 campaigns · Sorted by Trending
          </p>
        </div>

        {/* View toggle */}
        <div style={{
          display: "flex", gap: "4px",
          background: "#F7F3ED", border: "1px solid #E2D9CC",
          borderRadius: "8px", padding: "4px",
        }}>
          {["⊞", "☰"].map((icon, i) => (
            <button key={icon} style={{
              width: "34px", height: "34px", borderRadius: "6px",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.9rem",
              background: i === 0 ? "white" : "transparent",
              color: i === 0 ? "#1A1410" : "#8A7B6E",
              boxShadow: i === 0 ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}>
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Active filter chips */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {["🏥 Medical", "Trending", "Active"].map((chip) => (
          <div key={chip} style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "#FEF0DC", border: "1px solid rgba(232,130,12,0.3)",
            color: "#E8820C", padding: "5px 12px", borderRadius: "100px",
            fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
          }}>
            {chip} <span style={{ opacity: 0.7 }}>×</span>
          </div>
        ))}
        <span style={{ marginLeft: "auto", fontSize: "0.8rem", color: "#8A7B6E", fontFamily: "monospace" }}>
          {campaigns.length} results
        </span>
      </div>

      {/* Campaign Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "22px" }}>
        {campaigns?.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "52px", paddingBottom: "60px" }}>
        <PaginationBtn label="←" />
        <PaginationBtn label="1" active />
        <PaginationBtn label="2" />
        <PaginationBtn label="3" />
        <span style={{ color: "#8A7B6E", fontSize: "0.85rem" }}>…</span>
        <PaginationBtn label="24" />
        <PaginationBtn label="→" />
      </div>
    </main>
  );
}

function PaginationBtn({ label, active }: { label: string; active?: boolean }) {
  return (
    <button style={{
      width: "38px", height: "38px", borderRadius: "8px",
      border: `1.5px solid ${active ? "#1A1410" : "#E2D9CC"}`,
      background: active ? "#1A1410" : "white",
      fontFamily: "inherit", fontSize: "0.85rem",
      color: active ? "white" : "#3D322A",
      fontWeight: active ? 600 : 400,
      cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {label}
    </button>
  );
}