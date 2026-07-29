import { CATEGORY_OPTIONS, slugify } from "../CreateCampaignConfig";
import * as s from "../FormStyles";

export default function BasicInfoStep({ form, setForm, errors }) {
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleTitleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: prev.slugTouched ? prev.slug : slugify(value),
    }));
  };

  return (
    <div style={s.card}>
      <div style={s.fieldGroup}>
        <label style={s.label}>Campaign Title</label>
        <input
          style={s.input}
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Help Maya Get Life-Saving Heart Surgery"
          maxLength={150}
        />
        {errors.title && <div style={s.errorText}>{errors.title}</div>}
      </div>

      <div style={s.fieldGroup}>
        <label style={s.label}>URL Slug</label>
        <input
          style={s.input}
          value={form.slug}
          onChange={(e) => setForm((prev) => ({ ...prev, slug: slugify(e.target.value), slugTouched: true }))}
          placeholder="help-maya-heart-surgery"
        />
        <div style={s.helpText}>dfund.com/campaigns/{form.slug || "your-slug"}</div>
        {errors.slug && <div style={s.errorText}>{errors.slug}</div>}
      </div>

      <div style={s.fieldGroup}>
        <label style={s.label}>Short Description</label>
        <textarea
          style={s.textarea}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="A brief summary shown on campaign cards (max 1000 characters)"
          maxLength={1000}
        />
        <div style={s.helpText}>{form.description.length}/1000</div>
        {errors.description && <div style={s.errorText}>{errors.description}</div>}
      </div>

      <div style={s.fieldGroup}>
        <label style={s.label}>Cover Image URL</label>
        <input
          style={s.input}
          value={form.coverImage}
          onChange={(e) => update("coverImage", e.target.value)}
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div style={s.fieldGroup}>
        <label style={s.label}>Category</label>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {CATEGORY_OPTIONS.map((cat) => (
            <div
              key={cat}
              onClick={() => update("category", cat)}
              style={{
                padding: "9px 16px",
                borderRadius: "100px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                border: `1.5px solid ${form.category === cat ? "#E8820C" : "#E2D9CC"}`,
                background: form.category === cat ? "#FEF0DC" : "transparent",
                color: form.category === cat ? "#E8820C" : "#3D322A",
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...s.fieldGroup, marginBottom: 0 }}>
        <label style={s.label}>Tags</label>
        <input
          style={s.input}
          value={form.tags}
          onChange={(e) => update("tags", e.target.value)}
          placeholder="medical, heart, child, aiims, emergency"
        />
        <div style={s.helpText}>Comma-separated. Helps people find your campaign.</div>
      </div>
    </div>
  );
}