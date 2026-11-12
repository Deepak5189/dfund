"use client";
import { useState } from "react";
import { Campaign } from "../explore/CampaignCard";
import { CheckoutSessionPayload, getCheckoutSession } from "@/lib/store/api/paymentAPI";

const amounts = [10, 25, 50, 100, 250, 500];


const findDaysLeft = (deadline: Date) => {
  return Math.ceil(
    (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
};

const makeInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "G";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const formatTimeAgo = (date: string | Date): string => {
  const timestamp = new Date(date).getTime();

  if (!Number.isFinite(timestamp)) return "";

  const elapsed = Math.max(0, Date.now() - timestamp);
  const minutes = Math.floor(elapsed / 60_000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  return new Date(date).toLocaleDateString();
};

const formatCurrency = (
  amount: string | number,
  currency: string,
): string => {
  const value = Number(amount);

  if (!Number.isFinite(value)) return "";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency || "USD"} ${value.toFixed(2)}`;
  }
};

export default function DonateSidebar({ campaign }: { campaign: Campaign }) {

  const raised = Number(campaign.raised_amount) || 0;
  const goal = Number(campaign.goal_amount) || 0;

  const percentFunded =
    goal > 0 ? Math.round((raised / goal) * 100) : 0;

  const progressWidth = Math.min(100, Math.max(0, percentFunded));

  // const [selected, setSelected] = useState(50);
  const [selected, setSelected] = useState(50);
  const [customAmount, setCustomAmount] = useState("");


  const donationAmount =
    customAmount.trim() !== ""
      ? Number(customAmount)
      : selected;

  const isValidAmount =
    Number.isFinite(donationAmount) &&
    donationAmount >= 1 &&
    Math.round(donationAmount * 100) === donationAmount * 100;

  
  const handleCheckout = async ()=>{
    // add payment logic here
    try{
      const payload: CheckoutSessionPayload = {
        amount: donationAmount,
        currency: "USD",
      }

      const res = await getCheckoutSession(payload);

      if(res.error){
        console.error(`Unexpected Error: ${res.error}`);
      }
      const session = res.data.json();

      if(session.url){
        window.location.href = session.url;
      }else{
        console.error(`Didn't get the session url`);
      }
    }catch(error){
      console.error("Payment checkout failed: "+error);      
    }
  }



  return (
    <div style={{ position: "sticky", top: "85px", height: "fit-content" }}>
      {/* Donate card */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          border: "1px solid #E2D9CC",
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(26,20,16,0.08)",
        }}
      >
        {/* Top: progress */}
        <div style={{ padding: "28px 28px 0" }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem",
              fontWeight: 900,
              color: "#1A1410",
              lineHeight: 1,
            }}
          >
            {campaign.raised_amount}
          </div>
          <div
            style={{
              fontSize: "0.82rem",
              color: "#8A7B6E",
              marginTop: "4px",
              marginBottom: "20px",
            }}
          >
            raised of {campaign.goal_amount} goal
          </div>

          <div
            style={{
              height: "10px",
              background: "#E2D9CC",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressWidth}%`,
                background: "linear-gradient(90deg, #E8820C, #F5A640)",
                borderRadius: "10px",
              }}
            />
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              borderTop: "1px solid #E2D9CC",
              marginBottom: "24px",
            }}
          >
            {[
              {
                num: `${percentFunded}%`,
                label: "Funded",
                amber: true,
              },
              {
                num: campaign.donors_count.toString(),
                label: "Donors",
                amber: false,
              },
              {
                num: `${findDaysLeft(new Date(campaign.deadline))}`,
                label: "Days Left",
                amber: false,
              },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  textAlign: "center",
                  padding: "14px 8px",
                  borderRight: i < 2 ? "1px solid #E2D9CC" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.2rem",
                    fontWeight: 900,
                    color: stat.amber ? "#E8820C" : "#1A1410",
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#8A7B6E",
                    marginTop: "2px",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mid: amount selector */}
        <div style={{ padding: "0 28px 28px" }}>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#8A7B6E",
              marginBottom: "10px",
            }}
          >
            Choose an amount
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setSelected(amt);
                  setCustomAmount("");
                }}
                style={{
                  padding: "10px 8px",
                  borderRadius: "8px",
                  textAlign: "center",
                  border: `1.5px solid ${selected === amt ? "#E8820C" : "#E2D9CC"}`,
                  background: selected === amt ? "#E8820C" : "#F7F3ED",
                  fontFamily: "inherit",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: selected === amt ? "#1A1410" : "#1A1410",
                  cursor: "pointer",
                  boxShadow:
                    selected === amt
                      ? "0 4px 16px rgba(232,130,12,0.25)"
                      : "none",
                }}
              >
                ${amt}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                fontWeight: 600,
                color: "#8A7B6E",
                fontSize: "0.9rem",
              }}
            >
              $
            </span>
            <input
              type="number"
              min="1"
              step="0.01"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter custom amount"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 14px 11px 28px",
                border: "1.5px solid #E2D9CC",
                borderRadius: "8px",
                fontFamily: "inherit",
                fontSize: "0.9rem",
                color: "#1A1410",
                background: "#F7F3ED",
                outline: "none",
              }}
            />
          </div>
          <button
            disabled={!isValidAmount}
            onClick={() => {
              // Connect this to your donation checkout flow.
              console.log("Donation amount:", donationAmount);
              handleCheckout()
            }}
            style={{
              // Keep your existing button styles.
              width: "100%",
              padding: "15px",
              background: isValidAmount ? "#E8820C" : "#D8C8B5",
              color: "#1A1410",
              border: "none",
              borderRadius: "10px",
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              cursor: isValidAmount ? "pointer" : "not-allowed",
            }}
          >
            Donate ${donationAmount.toLocaleString("en-US")} →
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontSize: "0.75rem",
              color: "#8A7B6E",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secure payment via Stripe. No account needed.
          </div>
        </div>

        {/* Share row */}
        <div
          style={{
            borderTop: "1px solid #E2D9CC",
            padding: "18px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1A1410" }}
          >
            Share this campaign
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            {/* add user's social media links */}
            {["𝕏", "💬", "f", "🔗"].map((icon) => (
              <div
                key={icon}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  border: "1.5px solid #E2D9CC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  background: "#F7F3ED",
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent donors */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          border: "1px solid #E2D9CC",
          marginTop: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "18px 22px",
            borderBottom: "1px solid #E2D9CC",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1A1410" }}
          >
            Recent Donors
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              color: "#8A7B6E",
              fontFamily: "monospace",
            }}
          >
            {campaign.donors_count} total
          </span>
        </div>

        <div>
          {/* {campaign.donations?.map((d) => (
            <div
              key={d.donor.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 22px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: d.donor.profile_pic || "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                `${makeInitials(d.donor.name)}`
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#1A1410",
                  }}
                >
                  {d.donor.name}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#8A7B6E" }}>
                  `${findDaysLeft(d.createdAt)}`
                </div>
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "#4A6741",
                }}
              >
                {d.amount}
              </div>
            </div>
          ))} */}
          {(campaign.donations ?? []).map((d) => {
            const donorName = d.is_anonymous
              ? "Anonymous"
              : d.donor?.name || d.guest_name || "Guest donor";

            const initials =
              donorName === "Anonymous"
                ? "A"
                : makeInitials(donorName) || "G";

            return (
              <div
                key={d.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 22px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: "#4A6741",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {initials}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#1A1410",
                    }}
                  >
                    {donorName}
                  </div>

                  <div style={{ fontSize: "0.7rem", color: "#8A7B6E" }}>
                    {formatTimeAgo(d.createdAt)}
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: "#4A6741",
                  }}
                >
                  {formatCurrency(d.amount, campaign.currency)}
                </div>
              </div>
            );
          })}
        </div>

        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#F7F3ED",
            border: "none",
            borderTop: "1px solid #E2D9CC",
            fontFamily: "inherit",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#8A7B6E",
            cursor: "pointer",
          }}
        >
          See all {campaign.donors_count} donors →
        </button>
      </div>
    </div>
  );
}
