import Link from "next/link";

// const campaigns = [
//   {
//     id: 1,
//     title: "Spinal surgery for Rohan, 34 – accident left him paralysed",
//     raised: "$27,500",
//     daysLeft: 5,
//     percent: 48,
//     gradient: "linear-gradient(135deg,#95456A,#B55A7D)",
//   },
//   {
//     id: 2,
//     title: "Fund Aiden's leukemia treatment — 3 cycles remaining",
//     raised: "$41,000",
//     daysLeft: 12,
//     percent: 80,
//     gradient: "linear-gradient(135deg,#C84C20,#F18A00)",
//   },
//   {
//     id: 3,
//     title: "Cochlear implant for Zara — give her the gift of sound",
//     raised: "$11,400",
//     daysLeft: 31,
//     percent: 35,
//     gradient: "linear-gradient(135deg,#4E7546,#7AAA64)",
//   },
// ];
const campaigns: any = [];

export default function RecommendedCampaigns() {
  return (
    <section style={{ marginTop: "72px" }}>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "2rem",
          color: "#1A1410",
          marginBottom: "28px",
        }}
      >
        Other campaigns you may like
      </h2>

      {campaigns.length?<div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "26px",
        }}
      >
        {campaigns.map((campaign) => (
          <Link
            key={campaign.id}
            href={`campaign-details/${campaign.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "18px",
                overflow: "hidden",
                border: "1px solid #DDD5CA",
                transition: ".25s",
                boxShadow: "0 3px 10px rgba(0,0,0,.03)",
              }}
            >
              {/* Cover */}
              <div
                style={{
                  height: "150px",
                  background: campaign.gradient,
                }}
              />

              {/* Content */}
              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    lineHeight: 1.35,
                    color: "#1A1410",
                    minHeight: "70px",
                  }}
                >
                  {campaign.title}
                </h3>

                {/* Progress */}
                <div
                  style={{
                    height: "4px",
                    background: "#DDD5CA",
                    borderRadius: "999px",
                    overflow: "hidden",
                    marginTop: "18px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: `${campaign.percent}%`,
                      height: "100%",
                      background: "#E48A1D",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: ".9rem",
                  }}
                >
                  <span
                    style={{
                      color: "#1A1410",
                      fontWeight: 700,
                    }}
                  >
                    {campaign.raised}
                  </span>

                  <span
                    style={{
                      color: "#8A7B6E",
                    }}
                  >
                    {campaign.daysLeft} days left
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>:<div className="flex gap-2">
          <span>
            No recommended campaigns for you.
          </span>
          <Link href='/explore' className="text-blue-500">
            Explore All Campaigns
          </Link>
        </div>}
    </section>
  );
}