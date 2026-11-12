
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export interface Creator {
  name: string;
  profile_pic?: string;
}

export interface CommentSchema {
  _id: string;
  content: string;
  isEdited: boolean;
  createdAt: Date;
  author: Creator;
}

export interface DonationSchema {
  _id: string;
  amount: number;
  donor: Creator;
  isAnonymous: boolean;
  createdAt: Date;
}

export interface CampaignStory {
  _id: string;
  content: string;
  createdAt: Date;
  heading: string;
  image?: string;
  order: number;
  updatedAt: Date;
}

export interface CampaignUpdates {
  _id: string;
}

export interface Campaign {
  category: string;
  comments_count: number;
  cover_image: string;
  created_at: Date | string;
  creator: Creator;
  creator_id: string;
  currency: string;
  deadline: Date | string;
  description: string;
  donors_count: number;
  goal_amount: number | string;
  id: string;
  is_featured: boolean;
  is_verified: boolean;
  raised_amount: number | string;
  slug: string;
  status: string;
  tags: string[];
  title: string;
  updated_at: Date | string;

  story_sections?: CampaignStory[];
  updates?: CampaignUpdates[];
  percent_funded?: number;
  comments?: CommentSchema[];
  donations?: DonationSchema[];
}

export default function CampaignCard({
  campaign,
}: {
  campaign: Campaign;
}) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const raised = Number(campaign.raised_amount) || 0;
  const goal = Number(campaign.goal_amount) || 0;

  const percentFunded =
    goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;

  const deadlineDate = new Date(campaign.deadline);
  const daysLeft = Number.isNaN(deadlineDate.getTime())
    ? 0
    : Math.max(
        0,
        Math.ceil(
          (deadlineDate.getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      );

  const currency = campaign.currency || "USD";

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);

  const category = campaign.category || "General";
  const creatorName = campaign.creator?.name || "Anonymous";
  const initials = creatorName.slice(0, 2).toUpperCase();

  const coverImage = campaign.cover_image;

  return (
    <article
      onClick={() =>
        router.push(`/campaign-details/${campaign.id}`)
      }
      style={{
        width: "100%",
        maxWidth: "474px",
        minWidth: 0,
        background: "#FFFFFF",
        border: "1px solid #E2D9CC",
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "pointer",
        color: "#1A1410",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxSizing: "border-box",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow =
          "0 12px 32px rgba(26,20,16,0.09)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Cover */}
      <div
        style={{
          height: "215px",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          padding: "16px",
          boxSizing: "border-box",
          backgroundColor: "#A84B1C",
          backgroundImage: coverImage
            ? `linear-gradient(to top, rgba(65, 27, 10, 0.45), transparent 70%), url("${coverImage}")`
            : "linear-gradient(145deg, #C5482C 0%, #E8750D 58%, #A4540B 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Category badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            position: "relative",
            zIndex: 1,
            padding: "5px 13px",
            borderRadius: "100px",
            border: "1px solid rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.19)",
            color: "#FFFFFF",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            backdropFilter: "blur(8px)",
          }}
        >
          <span aria-hidden="true">▣</span>
          {category}
        </span>

        {/* Bookmark */}
        <button
          type="button"
          aria-label={isSaved ? "Remove bookmark" : "Bookmark campaign"}
          aria-pressed={isSaved}
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved((previous) => !previous);
          }}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "11px",
            border: "1px solid rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.2)",
            color: "#FF4F81",
            fontSize: "19px",
            cursor: "pointer",
          }}
        >
          {isSaved ? "♥" : "🔖"}
        </button>
      </div>

      {/* Campaign details */}
      <div
        style={{
          padding: "22px 25px 24px",
        }}
      >
        {/* Creator and verification */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                flexShrink: 0,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #E8750D, #C5482C)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 700,
              }}
            >
              {initials}
            </div>

            <span
              style={{
                color: "#8A7B6E",
                fontSize: "13px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {creatorName}
            </span>
          </div>

          {campaign.is_verified && (
            <span
              style={{
                flexShrink: 0,
                padding: "3px 8px",
                borderRadius: "5px",
                background: "#EBF0E8",
                color: "#4A6741",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              ✓ Verified
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "19px",
            fontWeight: 700,
            lineHeight: 1.35,
            color: "#1A1410",
            margin: "0 0 17px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {campaign.title}
        </h3>

        {/* Funding progress */}
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              height: "7px",
              width: "100%",
              background: "#E2D9CC",
              borderRadius: "100px",
              overflow: "hidden",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: `${percentFunded}%`,
                height: "100%",
                background:
                  "linear-gradient(90deg, #E8750D, #F5A640)",
                borderRadius: "100px",
                transition: "width 0.3s ease",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
            }}
          >
            <strong style={{ fontWeight: 700, whiteSpace: "nowrap" }}>
              {formatAmount(raised)} raised
            </strong>

            <span
              style={{
                color: "#8A7B6E",
                textAlign: "right",
                whiteSpace: "nowrap",
              }}
            >
              of {formatAmount(goal)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            paddingTop: "15px",
            borderTop: "1px solid #E2D9CC",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "17px",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "#8A7B6E",
              }}
            >
              <span aria-hidden="true">👥</span>
              <strong style={{ color: "#1A1410", fontSize: "14px" }}>
                {campaign.donors_count ?? 0}
              </strong>
            </span>

            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "#8A7B6E",
                whiteSpace: "nowrap",
              }}
            >
              <span aria-hidden="true">◷</span>
              <strong style={{ color: "#1A1410", fontSize: "14px" }}>
                {daysLeft}d
              </strong>
              left
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/campaign-details/${campaign.id}`);
            }}
            style={{
              flexShrink: 0,
              padding: "9px 18px",
              borderRadius: "9px",
              background: "#1A1410",
              color: "#FFFFFF",
              border: "none",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Donate
          </button>
        </div>
      </div>
    </article>
  );
}
