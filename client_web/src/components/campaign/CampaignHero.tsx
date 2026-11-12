// import { Campaign } from "../explore/CampaignCard";

// export default function CampaignHero({ campaign }: { campaign: Campaign }) {
//   const link_labels = ["𝕏", "💬", "f", "🔗"]

//   return (
//     <div style={{
//       marginTop: "65px",
//       height: "480px",
//       background: `${campaign?.gradient || "none"}`,
//       position: "relative",
//       overflow: "hidden",
//       display: "flex",
//       alignItems: "flex-end",
//     }}>
//       {/* Overlay */}
//       <div style={{
//         position: "absolute", inset: 0,
//         background: `
//           radial-gradient(ellipse 50% 80% at 30% 60%, rgba(91,155,213,0.4) 0%, transparent 60%),
//           linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)
//         `,
//       }} />

//       <div style={{
//         position: "relative", zIndex: 2,
//         padding: "0 60px 40px",
//         display: "flex", alignItems: "flex-end",
//         justifyContent: "space-between",
//         width: "100%",
//       }}>
//         {/* Left: tags + title */}
//         <div style={{ flex: 1 }}>
//           <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
//               {campaign.tags?.map((tag, i)=>(
//                   <span key={i} style={{
//                   background: "rgba(255,255,255,0.18)",
//                   backdropFilter: "blur(10px)",
//                   color: "white", padding: "4px 12px", borderRadius: "100px",
//                   fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em",
//                   textTransform: "uppercase",
//                   border: `1px solid ${"rgba(255,255,255,0.3)"}`,
//                 }}>
//                   {tag}
//                 </span>
//               ))}
//               {/* {campaign.urgent && <span style={{
//                 background: campaign.urgent ? "rgba(192,68,42,0.8)" : "rgba(255,255,255,0.18)",
//                 backdropFilter: "blur(10px)",
//                 color: "white", padding: "4px 12px", borderRadius: "100px",
//                 fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em",
//                 textTransform: "uppercase",
//                 border: `1px solid ${campaign.urgent ? "rgba(192,68,42,0.5)" : "rgba(255,255,255,0.3)"}`,
//               }}>
//                 {campaign.urgent && "Urgent"}
//               </span>} */}
//           </div>
//           <h1 style={{
//             fontFamily: "'Playfair Display', serif",
//             fontSize: "2.2rem", fontWeight: 900, color: "white",
//             lineHeight: 1.15, letterSpacing: "-0.5px",
//             maxWidth: "680px", textShadow: "0 2px 20px rgba(0,0,0,0.3)",
//           }}>
//             {campaign.title}
//           </h1>
//         </div>

//         {/* Share buttons: Will work on them later */}
//         {/* <div style={{ display: "flex", gap: "8px", marginLeft: "40px", flexShrink: 0 }}>
//           {campaign.links?.map((link: string, i: number) => (
//             <button key={i} style={{
//               width: "40px", height: "40px", borderRadius: "10px",
//               background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)",
//               border: "1px solid rgba(255,255,255,0.3)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               cursor: "pointer", color: "white", fontSize: "0.9rem",
//             }}>
//               <a href={link} target="_blank" aria-disabled={link === ""}>
//                 {link_labels[i]}
//               </a>
//             </button>
//           ))}
//         </div> */}
//       </div>
//     </div>
//   );
// }


import type { CSSProperties } from "react";
import type { Campaign } from "../explore/CampaignCard";

export default function CampaignHero({
  campaign,
}: {
  campaign: Campaign;
}) {
  const category = campaign.category || "General";

  const coverImage = campaign.cover_image?.trim();

  const heroStyle: CSSProperties = {
    marginTop: "48px",
    height: "312px",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    isolation: "isolate",
    backgroundColor: "#24486B",
    backgroundImage: [
      "linear-gradient(to top, rgba(8, 22, 36, 0.88) 0%, rgba(8, 22, 36, 0.12) 75%)",
      "radial-gradient(ellipse 65% 100% at 80% 45%, rgba(91, 155, 213, 0.48) 0%, transparent 75%)",
      coverImage
        ? `url("${coverImage.replace(/["\\]/g, "")}")`
        : "linear-gradient(120deg, #24486B 0%, #376B98 100%)",
    ].join(", "),
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const badgeStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "4px 10px",
    borderRadius: "100px",
    background: "rgba(255,255,255,0.17)",
    border: "1px solid rgba(255,255,255,0.28)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  };

  return (
    <section
      className="campaign-hero"
      style={heroStyle}
      aria-labelledby="campaign-hero-title"
    >
      <div className="campaign-hero-content">
        <div className="campaign-hero-main">
          {/* Campaign badges */}
          <div className="campaign-hero-badges">
            <span style={badgeStyle}>
              {category}
            </span>

            {campaign.tags?.map((tag) => (
              <span key={tag} style={badgeStyle}>
                {tag}
              </span>
            ))}

            {campaign.is_verified && (
              <span style={badgeStyle}>
                ✓ Admin Verified
              </span>
            )}
          </div>

          {/* Campaign title */}
          <h1
            id="campaign-hero-title"
            className="campaign-hero-title"
          >
            {campaign.title}
          </h1>
        </div>

        {/* Share controls */}
        <div className="campaign-hero-actions">
          <button type="button" aria-label="More campaign actions">
            ↗
          </button>
          <button type="button" aria-label="Share campaign">
            ↪
          </button>
          <button type="button" aria-label="Share on Facebook">
            f
          </button>
          <button type="button" aria-label="Copy campaign link">
            ↗
          </button>
        </div>
      </div>
    </section>
  );
}
