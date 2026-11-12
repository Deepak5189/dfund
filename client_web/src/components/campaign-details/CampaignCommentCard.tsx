import React from "react";
import { CommentSchema } from "../explore/CampaignCard";

const CampaignCommentCard = ({ comment}: { comment: CommentSchema}) => {
  return (
    <div
      key={comment._id}
      style={{
        background: "white",
        border: "1px solid #E2D9CC",
        borderRadius: "16px",
        padding: "22px",
        boxShadow: "0 6px 24px rgba(26,20,16,0.05)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background: comment.author?.profilePic || "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: "0.9rem",
            flexShrink: 0,
          }}
        >
          {comment?.initials || "AB"}
        </div>

        <div>
          <div
            style={{
              fontWeight: 700,
              color: "#1A1410",
              fontSize: "0.95rem",
            }}
          >
            {comment.name}
          </div>

          <div
            style={{
              color: "#8A7B6E",
              fontSize: "0.75rem",
              marginTop: "2px",
            }}
          >
            {comment.time}
          </div>
        </div>
      </div>

      {/* Body */}
      <p
        style={{
          color: "#4E463F",
          lineHeight: 1.75,
          fontSize: "0.95rem",
          marginBottom: "18px",
        }}
      >
        {comment.content}
      </p>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          gap: "18px",
          fontSize: "0.82rem",
          color: "#8A7B6E",
        }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#8A7B6E",
            padding: 0,
          }}
        >
          👍 {comment.likes}
        </button>

        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#8A7B6E",
            padding: 0,
          }}
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default CampaignCommentCard;
