
"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

import type { CommentSchema } from "../explore/CampaignCard";
import type { Response } from "../create-campaign/CreateCampaignForm";
import { postComment } from "@/lib/store/api/commentAPI";
import CampaignCommentCard from "./CampaignCommentCard";

export interface CommentPayload {
  campaignId: string;
  content: string;
  parentCommentId: string | null;
  isEdited?: boolean;
  isHidden?: boolean;
}

export default function CampaignComments({
  comments,
  campaignId,
}: {
  comments: CommentSchema[];
  campaignId: string;
}) {
  const [visibleComments, setVisibleComments] = useState(20);
  const [commentList, setCommentList] = useState<CommentSchema[]>(
    comments ?? []
  );
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const userData = useSelector(
    (state: { auth?: { userData?: unknown } }) => state.auth?.userData
  );

  // Keep local state synchronized when the campaign data changes.
  useEffect(() => {
    const updateState = async ()=>{
      
      setCommentList(comments ?? []);
      setVisibleComments(20);
    }
    updateState();
  }, [comments, campaignId]);

  const submitComment = async () => {
    const content = commentText.trim();

    if (!content || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload: CommentPayload = {
        campaignId,
        content,
        parentCommentId: null,
      };
      console.log(payload);

      const res: Response = await postComment(payload);

      if (res.error) {
        setSubmitError("Unable to post your comment. Please try again. Error: "+ res.error);
        return;
      }

      if (res.data) {
        setCommentList((previous) => [res.data, ...previous]);
        setCommentText("");
      } else {
        setSubmitError("The server did not return the posted comment.");
      }
    } catch {
      setSubmitError("Something went wrong while posting your comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleCommentList = commentList
    .filter((comment) => !comment.is_hidden)
    .slice(0, visibleComments);

  return (
    <section className="campaign-comments">
      <div className="campaign-comments-heading">
        <h2>Comments</h2>
        <span>{commentList.filter((comment) => !comment.is_hidden).length}</span>
      </div>

      {/* Comment form */}
      {userData ? (
        <form
          className="campaign-comment-form"
          onSubmit={(event) => {
            event.preventDefault();
            void submitComment();
          }}
        >
          <textarea
            rows={3}
            maxLength={2000}
            placeholder="Share a few encouraging words..."
            aria-label="Write a comment"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            disabled={isSubmitting}
            required
          />

          <div className="campaign-comment-form-footer">
            <span>{commentText.length}/2000</span>

            <button
              type="submit"
              disabled={!commentText.trim() || isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>

          {submitError && (
            <p className="campaign-comment-error" role="alert">
              {submitError}
            </p>
          )}
        </form>
      ) : (
        <div className="campaign-comment-login">
          <p>
            Want to share some encouragement?{" "}
            <Link href="/login">Log in to comment</Link>.
          </p>
        </div>
      )}

      {/* Comment list */}
      <div className="campaign-comment-list">
        {visibleCommentList.map((comment) => (
          <CampaignCommentCard
            key={comment.id}
            comment={comment}
          />
        ))}

        {commentList.length === 0 && (
          <div className="campaign-comments-empty">
            <p>No comments yet.</p>
            <span>Be the first to share a few encouraging words.</span>
          </div>
        )}

        {commentList.length > 0 && visibleCommentList.length === 0 && (
          <div className="campaign-comments-empty">
            No visible comments.
          </div>
        )}
      </div>

      {/* Load more */}
      {commentList.filter((comment) => !comment.is_hidden).length >
        visibleComments && (
        <div className="campaign-comments-load-more">
          <button
            type="button"
            onClick={() =>
              setVisibleComments((previous) => previous + 20)
            }
          >
            Load More Comments
          </button>
        </div>
      )}

      <style jsx>{`
        .campaign-comments {
          width: 100%;
          min-width: 0;
          margin-top: 8px;
          color: #1a1410;
        }

        .campaign-comments-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .campaign-comments-heading h2 {
          margin: 0;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 25px;
          line-height: 1.2;
          font-weight: 900;
        }

        .campaign-comments-heading > span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
          height: 24px;
          padding: 0 7px;
          box-sizing: border-box;
          border-radius: 100px;
          background: #f1e8dc;
          color: #8a7b6e;
          font-size: 11px;
          font-weight: 600;
        }

        .campaign-comment-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
          padding: 14px;
          background: #fff;
          border: 1px solid #e2d9cc;
          border-radius: 12px;
          box-shadow: 0 4px 18px rgba(26, 20, 16, 0.035);
        }

        .campaign-comment-form textarea {
          box-sizing: border-box;
          width: 100%;
          min-height: 84px;
          padding: 12px;
          resize: vertical;
          border: 1px solid #e2d9cc;
          border-radius: 8px;
          outline: none;
          background: #fdfbf8;
          color: #1a1410;
          font: inherit;
          font-size: 13px;
          line-height: 1.6;
        }

        .campaign-comment-form textarea:focus {
          border-color: #e8820c;
          box-shadow: 0 0 0 2px rgba(232, 130, 12, 0.1);
        }

        .campaign-comment-form-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .campaign-comment-form-footer > span {
          color: #8a7b6e;
          font-size: 10px;
        }

        .campaign-comment-form-footer button {
          padding: 9px 15px;
          border: none;
          border-radius: 7px;
          background: #e8820c;
          color: #1a1410;
          font: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .campaign-comment-form-footer button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .campaign-comment-error {
          margin: 0;
          color: #b42318;
          font-size: 12px;
        }

        .campaign-comment-login {
          margin-bottom: 24px;
          padding: 15px;
          border: 1px solid #e2d9cc;
          border-radius: 10px;
          background: #fff;
          color: #6e6257;
          font-size: 13px;
        }

        .campaign-comment-login p {
          margin: 0;
        }

        .campaign-comment-login a {
          color: #b96308;
          font-weight: 600;
          text-decoration: none;
        }

        .campaign-comment-login a:hover {
          text-decoration: underline;
        }

        .campaign-comment-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .campaign-comments-empty {
          padding: 24px 16px;
          border: 1px solid #e2d9cc;
          border-radius: 10px;
          background: #fff;
          color: #8a7b6e;
          text-align: center;
          font-size: 12px;
        }

        .campaign-comments-empty p {
          margin: 0 0 5px;
          color: #1a1410;
          font-size: 14px;
          font-weight: 600;
        }

        .campaign-comments-empty span {
          font-size: 11px;
        }

        .campaign-comments-load-more {
          display: flex;
          justify-content: center;
          margin-top: 22px;
        }

        .campaign-comments-load-more button {
          padding: 10px 18px;
          border: 1px solid #e2d9cc;
          border-radius: 8px;
          background: #f7f3ed;
          color: #6e6257;
          font: inherit;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .campaign-comments-load-more button:hover {
          border-color: #e8820c;
          color: #1a1410;
        }

        @media (max-width: 480px) {
          .campaign-comments-heading h2 {
            font-size: 22px;
          }

          .campaign-comment-form {
            padding: 10px;
          }
        }
      `}</style>
    </section>
  );
}
