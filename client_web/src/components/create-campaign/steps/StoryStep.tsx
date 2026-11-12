import { emptyStorySection, emptyUpdate } from "../CreateCampaignConfig";
import * as s from "../FormStyles";

export default function StoryStep({ form, setForm, errors }) {
  const updateSection = (index, key, value) => {
    setForm((prev) => {
      const sections = [...prev.storySections];
      sections[index] = { ...sections[index], [key]: value };
      return { ...prev, storySections: sections };
    });
  };

  const addSection = () => {
    setForm((prev) => ({
      ...prev,
      storySections: [...prev.storySections, emptyStorySection(prev.storySections.length + 1)],
    }));
  };

  const removeSection = (index) => {
    setForm((prev) => ({
      ...prev,
      storySections: prev.storySections
        .filter((_, i) => i !== index)
        .map((sec, i) => ({ ...sec, order: i + 1 })),
    }));
  };

  const updateUpdate = (index, key, value) => {
    setForm((prev) => {
      const updates = [...prev.updates];
      updates[index] = { ...updates[index], [key]: value };
      return { ...prev, updates };
    });
  };

  const addUpdate = () => {
    setForm((prev) => ({ ...prev, updates: [...prev.updates, emptyUpdate()] }));
  };

  const removeUpdate = (index) => {
    setForm((prev) => ({ ...prev, updates: prev.updates.filter((_, i) => i !== index) }));
  };

  return (
    <div style={s.card}>
      <div style={{ marginBottom: "16px" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#1A1410" }}>
          Story Sections
        </h3>
        <p style={s.helpText}>Break your story into sections — background, how funds will be used, etc.</p>
      </div>

      {form.storySections.map((section, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #E2D9CC",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "16px",
            background: "#FDFAF6",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#8A7B6E", textTransform: "uppercase" }}>
              Section {i + 1}
            </span>
            {form.storySections.length > 1 && (
              <button type="button" style={s.removeBtn} onClick={() => removeSection(i)}>
                Remove
              </button>
            )}
          </div>

          <div style={s.fieldGroup}>
            <label style={s.label}>Heading</label>
            <input
              style={s.input}
              value={section.heading}
              onChange={(e) => updateSection(i, "heading", e.target.value)}
              placeholder="About Maya"
              maxLength={150}
            />
          </div>

          <div style={s.fieldGroup}>
            <label style={s.label}>Content</label>
            <textarea
              style={s.textarea}
              value={section.content}
              onChange={(e) => updateSection(i, "content", e.target.value)}
              placeholder="Tell this part of the story..."
              maxLength={5000}
            />
          </div>

          <div style={{ marginBottom: 0 }}>
            <label style={s.label}>Section Image URL (optional)</label>
            <input
              style={s.input}
              value={section.image}
              onChange={(e) => updateSection(i, "image", e.target.value)}
              placeholder="https://..."
            />
          </div>

          {errors[`storySections.${i}`] && <div style={s.errorText}>{errors[`storySections.${i}`]}</div>}
        </div>
      ))}

      <button type="button" style={s.ghostBtn} onClick={addSection}>
        + Add Story Section
      </button>

      <div style={{ marginTop: "36px", marginBottom: "16px" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#1A1410" }}>
          Initial Updates <span style={{ fontWeight: 400, fontSize: "0.8rem", color: "#8A7B6E" }}>(optional)</span>
        </h3>
        <p style={s.helpText}>You can also add updates later once your campaign is live.</p>
      </div>

      {form.updates.map((update, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #E2D9CC",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "16px",
            background: "#FDFAF6",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#8A7B6E", textTransform: "uppercase" }}>
              Update {i + 1}
            </span>
            <button type="button" style={s.removeBtn} onClick={() => removeUpdate(i)}>
              Remove
            </button>
          </div>
          <div style={s.fieldGroup}>
            <label style={s.label}>Title</label>
            <input
              style={s.input}
              value={update.title}
              onChange={(e) => updateUpdate(i, "title", e.target.value)}
              placeholder="Campaign launched"
              maxLength={150}
            />
          </div>
          <div style={{ marginBottom: 0 }}>
            <label style={s.label}>Content</label>
            <textarea
              style={s.textarea}
              value={update.content}
              onChange={(e) => updateUpdate(i, "content", e.target.value)}
              placeholder="Thank you to everyone supporting..."
              maxLength={5000}
            />
          </div>
        </div>
      ))}

      <button type="button" style={s.ghostBtn} onClick={addUpdate}>
        + Add Update
      </button>
    </div>
  );
}