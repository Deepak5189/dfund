"use client";

import { useSelector } from "react-redux";
// import { CampaignComment } from "../explore/CampaignData";
import Link from "next/link";
import { useState } from "react";
import { CommentSchema } from "../explore/CampaignCard";
import { Response } from "../create-campaign/CreateCampaignForm";
import { postComment } from "@/lib/store/api/commentAPI";
import CampaignCommentCard from "./CampaignCommentCard";

const comments = [
  {
    id: 1,
    name: "Rahul Kumar",
    initials: "RK",
    gradient: "linear-gradient(135deg, #C0442A, #E8820C)",
    time: "2 hours ago",
    content:
      "Wishing Maya a speedy recovery. Happy to support this campaign. Stay strong!",
    likes: 14,
  },
  {
    id: 2,
    name: "Anjali Nair",
    initials: "AN",
    gradient: "linear-gradient(135deg, #4A6741, #7DB56A)",
    time: "Yesterday",
    content:
      "Every little contribution counts. I hope this campaign reaches its goal very soon ❤️",
    likes: 8,
  },
  {
    id: 3,
    name: "Dr. Dev Verma",
    initials: "DV",
    gradient: "linear-gradient(135deg, #7B5EA7, #B09FD4)",
    time: "2 days ago",
    content:
      "Praying for a successful surgery. Thank you to everyone who is helping.",
    likes: 21,
  },
];

export interface CommentPayload {
  campaign: string;
  content: string;
  parentComment: string | null;
  isEdited?: boolean;
  isHidden?: boolean;
}

// export default function CampaignComments() {
export default function CampaignComments({
  comments,
  campaignId,
}: {
  comments: [CommentSchema];
  campaignId: string;
}) {
  const [visibleComments, setVisibleComments] = useState<number>(20);
  const [commentList, setCommentList] =
    useState<Array<CommentSchema>>(comments);
  const [commentText, setCommentText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const userData = useSelector((state) => state.auth?.userData);

  const updateVisibleComments = () => {
    const newVisibleLength = Math.min(visibleComments + 20, commentList.length);
    setVisibleComments(newVisibleLength);
  };

  const submitComment = async()=>{
    if(!commentText.trim()) return;
    setIsSubmitting(true);
    try{
      const payload: CommentPayload = {
        campaign: campaignId,
        content: commentText.trim(),
        parentComment: null,
      };
      const res:Response = await postComment(payload);

      if(!res.error){
        setCommentList(prev=>[res.data, ...prev]);
      }
      setCommentText("");
    }catch(error){
      throw new Error(`Unexpected error while posting a comment: ${error}`);
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section style={{ marginTop: "64px" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.8rem",
            fontWeight: 900,
            color: "#1A1410",
            marginBottom: "24px",
          }}
        >
          Comments ({commentList.length})
        </h2>

        {/* Write Comment */}
        {!userData && (
          <section
            style={{
              marginTop: "64px",
              display: "flex",
              gap: "4px",
              alignItems: "center",
            }}
          >
            Please{" "}
            <span>
              <Link href="/login" className="text-blue-500">
                Login Here{" "}
              </Link>
            </span>{" "}
            to comment on this post.
          </section>
        )}
        {userData && (
          <div
            style={{
              background: "white",
              border: "1px solid #E2D9CC",
              borderRadius: "16px",
              padding: "10px",
              marginBottom: "28px",
              boxShadow: "0 8px 30px rgba(26,20,16,0.05)",
              display: "flex",
              gap: "20px",
            }}
          >
            {/* this is for adding user's initials */}
            {/* <div>{}</div> */}
            <textarea
              rows={1}
              placeholder="Share a few encouraging words..."
              style={{
                width: "100%",
                resize: "vertical",
                padding: "14px",
                border: "1.5px solid #E2D9CC",
                borderRadius: "10px",
                outline: "none",
                fontFamily: "inherit",
                fontSize: "0.95rem",
                color: "#1A1410",
                background: "#FDFBF8",
              }}
              name="comment"
              value={commentText}
              onChange={(e)=>setCommentText(e.target.value)}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <button
                style={{
                  padding: "12px 24px",
                  background: "#E8820C",
                  color: "#1A1410",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                disabled={isSubmitting}
                onClick={submitComment}
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        )}

        {/* Comments */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {commentList.length>0 && commentList?.slice(0, visibleComments).map((comment, i) => (
            // <div
            //   key={i}
            //   style={{
            //     background: "white",
            //     border: "1px solid #E2D9CC",
            //     borderRadius: "16px",
            //     padding: "22px",
            //     boxShadow: "0 6px 24px rgba(26,20,16,0.05)",
            //   }}
            // >
            //   {/* Header */}
            //   <div
            //     style={{
            //       display: "flex",
            //       alignItems: "center",
            //       gap: "14px",
            //       marginBottom: "14px",
            //     }}
            //   >
            //     <div
            //       style={{
            //         width: "46px",
            //         height: "46px",
            //         borderRadius: "50%",
            //         background: comment?.gradient || "none",
            //         display: "flex",
            //         alignItems: "center",
            //         justifyContent: "center",
            //         color: "black",
            //         fontWeight: 700,
            //         fontSize: "0.9rem",
            //         flexShrink: 0,
            //       }}
            //     >
            //       {comment?.initials || "AB"}
            //     </div>

            //     <div>
            //       <div
            //         style={{
            //           fontWeight: 700,
            //           color: "#1A1410",
            //           fontSize: "0.95rem",
            //         }}
            //       >
            //         {comment.name}
            //       </div>

            //       <div
            //         style={{
            //           color: "#8A7B6E",
            //           fontSize: "0.75rem",
            //           marginTop: "2px",
            //         }}
            //       >
            //         {comment.time}
            //       </div>
            //     </div>
            //   </div>

            //   {/* Body */}
            //   <p
            //     style={{
            //       color: "#4E463F",
            //       lineHeight: 1.75,
            //       fontSize: "0.95rem",
            //       marginBottom: "18px",
            //     }}
            //   >
            //     {comment.content}
            //   </p>

            //   {/* Footer */}
            //   <div
            //     style={{
            //       display: "flex",
            //       gap: "18px",
            //       fontSize: "0.82rem",
            //       color: "#8A7B6E",
            //     }}
            //   >
            //     <button
            //       style={{
            //         background: "none",
            //         border: "none",
            //         cursor: "pointer",
            //         color: "#8A7B6E",
            //         padding: 0,
            //       }}
            //     >
            //       👍 {comment.likes}
            //     </button>

            //     <button
            //       style={{
            //         background: "none",
            //         border: "none",
            //         cursor: "pointer",
            //         color: "#8A7B6E",
            //         padding: 0,
            //       }}
            //     >
            //       Reply
            //     </button>
            //   </div>
            // </div>
            <CampaignCommentCard key={i} comment={comment}/>
          ))}
          {!commentList.length && <div>No comments yet</div>}
        </div>

        {/* Load More */}
        {commentList.length > 20 && visibleComments < commentList.length && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "32px",
            }}
          >
            <button
              style={{
                padding: "12px 24px",
                border: "1px solid #E2D9CC",
                borderRadius: "10px",
                background: "#F7F3ED",
                color: "#8A7B6E",
                cursor: "pointer",
                fontWeight: 600,
              }}
              onClick={updateVisibleComments}
            >
              Load More Comments
            </button>
          </div>
        )}
      </section>
    </>
  );
}
