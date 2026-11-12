import * as s from "../FormStyles";

export default function ReviewStep({ form }) {
  const row = (label, value) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #F0EAE0" }}>
      <span style={{ fontSize: "0.8rem", color: "#8A7B6E" }}>{label}</span>
      <span style={{ fontSize: "0.85rem", color: "#1A1410", fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>
        {value || "—"}
      </span>
    </div>
  );

  return (
    <div style={s.card}>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "#1A1410", marginBottom: "8px" }}>
        {form.title || "Untitled Campaign"}
      </h3>
      <p style={{ fontSize: "0.85rem", color: "#8A7B6E", marginBottom: "20px", lineHeight: 1.6 }}>{form.description}</p>

      {row("Category", form.category)}
      {row("Goal Amount", form.goalAmount ? `${form.currency} ${Number(form.goalAmount).toLocaleString()}` : "")}
      {row("Deadline", form.deadline)}
      {row("Story Sections", `${form.storySections.length} section(s)`)}
      {row("Initial Updates", `${form.updates.length} update(s)`)}
      {row("Tags", form.tags)}

      <div style={{ marginTop: "20px", padding: "14px 16px", background: "#FEF0DC", borderRadius: "8px", fontSize: "0.8rem", color: "#8A7B6E" }}>
        Your campaign will be saved as a <strong style={{ color: "#E8820C" }}>Draft</strong> and reviewed by our team before going live.
      </div>
    </div>
  );
}