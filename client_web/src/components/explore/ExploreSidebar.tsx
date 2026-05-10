"use client";

const categories = [
  { emoji: "🔍", label: "All Campaigns", count: 712 },
  { emoji: "🏥", label: "Medical", count: 284, active: true },
  { emoji: "🌱", label: "Nonprofit", count: 196 },
  { emoji: "🎨", label: "Creative", count: 143 },
  { emoji: "🆘", label: "Emergency", count: 89 },
];

const sortOptions = ["Trending", "Newest First", "Most Funded", "Ending Soon"];

const statusTags = ["Active", "Ending Soon", "Fully Funded"];

export default function ExploreSidebar() {
  return (
    <aside style={{
      width: "260px",
      flexShrink: 0,
      borderRight: "1px solid #E2D9CC",
      padding: "32px 24px",
      position: "sticky",
      top: "65px",
      height: "calc(100vh - 65px)",
      overflowY: "auto",
      background: "#FDFAF6",
    }}>

      {/* Category */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7B6E", marginBottom: "14px" }}>
          Category
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {categories.map((cat) => (
            <div
              key={cat.label}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "9px 12px", borderRadius: "8px", cursor: "pointer",
                background: cat.active ? "#FEF0DC" : "transparent",
                fontWeight: cat.active ? 600 : 400,
                color: cat.active ? "#E8820C" : "#1A1410",
                fontSize: "0.875rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span>{cat.emoji}</span>
                {cat.label}
              </div>
              <span style={{
                fontSize: "0.7rem",
                fontFamily: "monospace",
                background: cat.active ? "rgba(232,130,12,0.15)" : "#F7F3ED",
                color: cat.active ? "#E8820C" : "#8A7B6E",
                padding: "2px 7px", borderRadius: "100px",
              }}>
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7B6E", marginBottom: "14px" }}>
          Sort By
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {sortOptions.map((option, i) => (
            <div
              key={option}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 12px", borderRadius: "8px", cursor: "pointer",
                background: i === 0 ? "#FEF0DC" : "transparent",
                color: i === 0 ? "#E8820C" : "#3D322A",
                fontWeight: i === 0 ? 600 : 400,
                fontSize: "0.875rem",
              }}
            >
              <div style={{
                width: "14px", height: "14px", borderRadius: "50%", flexShrink: 0,
                border: i === 0 ? "none" : "1.5px solid #E2D9CC",
                background: i === 0 ? "#E8820C" : "transparent",
                boxShadow: i === 0 ? "0 0 0 3px rgba(232,130,12,0.2)" : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {i === 0 && <div style={{ width: "5px", height: "5px", background: "white", borderRadius: "50%" }} />}
              </div>
              {option}
            </div>
          ))}
        </div>
      </div>

      {/* Goal Amount */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7B6E", marginBottom: "14px" }}>
          Goal Amount
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#8A7B6E", fontFamily: "monospace", marginBottom: "10px" }}>
          <span>$0</span><span>$50,000</span>
        </div>
        <div style={{ width: "100%", height: "4px", background: "#E2D9CC", borderRadius: "10px", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "65%", background: "#E8820C", borderRadius: "10px" }} />
          <div style={{
            position: "absolute", top: "50%", left: "65%",
            transform: "translate(-50%, -50%)",
            width: "16px", height: "16px", borderRadius: "50%",
            background: "white", border: "2px solid #E8820C",
            boxShadow: "0 2px 8px rgba(232,130,12,0.3)",
          }} />
        </div>
        <div style={{ marginTop: "10px", fontSize: "0.75rem", color: "#1A1410", fontWeight: 500, fontFamily: "monospace" }}>
          Up to $32,500
        </div>
      </div>

      {/* Status */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7B6E", marginBottom: "14px" }}>
          Campaign Status
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {statusTags.map((tag, i) => (
            <div
              key={tag}
              style={{
                padding: "5px 12px", borderRadius: "100px",
                fontSize: "0.75rem", fontWeight: i === 0 ? 600 : 500,
                cursor: "pointer",
                border: `1.5px solid ${i === 0 ? "#E8820C" : "#E2D9CC"}`,
                background: i === 0 ? "#E8820C" : "transparent",
                color: i === 0 ? "#1A1410" : "#3D322A",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      <button style={{
        width: "100%", padding: "10px", borderRadius: "8px",
        border: "1.5px solid #E2D9CC", background: "transparent",
        fontFamily: "inherit", fontSize: "0.82rem",
        color: "#8A7B6E", cursor: "pointer",
      }}>
        Clear All Filters
      </button>
    </aside>
  );
}