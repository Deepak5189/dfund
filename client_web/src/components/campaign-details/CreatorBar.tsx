// import { Campaign } from "../explore/CampaignCard";

// export default function CreatorBar({ campaign }: {campaign: Campaign}) {
//   return (
//     <div className="flex justify-between items-center p-5 bg-white border border-border rounded-xl mb-8 animate-fade-up">
      
//       <div className="flex items-center gap-3">
//         <div
//           className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold"
//           style={{ background: campaign.creator.profile_pic}}
//         >
//           {campaign.initials}
//         </div>

//         <div>
//           <div className="font-semibold text-sm">{campaign.creator}</div>
//           <div className="text-xs text-muted flex gap-2 items-center">
//             <span>Campaign Creator</span>
//             <span className="bg-sage-light text-sage px-2 rounded text-[10px] font-semibold">
//               ✓ Verified
//             </span>
//           </div>
//         </div>
//       </div>

//       <button className="px-4 py-2 border border-border rounded-md text-sm hover:border-amber hover:text-amber">
//         + Follow
//       </button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Campaign } from "../explore/CampaignCard";

export default function CreatorBar({
  campaign,
}: {
  campaign: Campaign;
}) {
  const [isFollowing, setIsFollowing] = useState(false);

  const creatorName = campaign.creator?.name || "Campaign Creator";

  const initials = creatorName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const startedAt = campaign.created_at
    ? new Date(campaign.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <section className="flex items-center justify-between gap-4 p-5 sm:px-8 bg-white border border-border rounded-xl mb-8 animate-fade-up">
      {/* Creator details */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Avatar */}
        <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-br from-[#2D5A8E] to-[#5B9BD5] shadow-sm ring-2 ring-white">
          {campaign.creator?.profile_pic ? (
            <img
              src={campaign.creator.profile_pic}
              alt={`${creatorName}'s profile`}
              className="w-full h-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        {/* Name and metadata */}
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-[#1A1410] truncate">
            {creatorName}
          </h3>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#8A7B6E]">
            <span>Campaign Creator</span>

            {campaign.is_verified && (
              <>
                <span className="inline-flex items-center gap-1 rounded bg-[#E9F0E6] px-2 py-0.5 text-xs font-semibold text-[#42613C]">
                  <span aria-hidden="true">✓</span>
                  Verified
                </span>

                {startedAt && <span aria-hidden="true">·</span>}
              </>
            )}

            {startedAt && <span>Started {startedAt}</span>}
          </div>
        </div>
      </div>

      {/* Follow button */}
      <button
        type="button"
        onClick={() => setIsFollowing((prev) => !prev)}
        aria-pressed={isFollowing}
        className={`shrink-0 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors ${
          isFollowing
            ? "border-[#CBDCC5] bg-[#E9F0E6] text-[#42613C]"
            : "border-border text-[#1A1410] hover:border-amber hover:text-amber"
        }`}
      >
        {isFollowing ? "✓ Following" : "+ Follow"}
      </button>
    </section>
  );
}