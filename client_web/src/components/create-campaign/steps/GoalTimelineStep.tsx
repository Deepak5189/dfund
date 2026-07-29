import { CURRENCY_OPTIONS } from "../CreateCampaignConfig";
import * as s from "../FormStyles";

export default function GoalTimelineStep({ form, setForm, errors }) {
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div style={s.card}>
      <div style={{ display: "flex", gap: "16px" }}>
        <div style={{ ...s.fieldGroup, flex: 2 }}>
          <label style={s.label}>Goal Amount</label>
          <input
            style={s.input}
            type="number"
            min="1"
            value={form.goalAmount}
            onChange={(e) => update("goalAmount", e.target.value)}
            placeholder="4100000"
          />
          {errors.goalAmount && <div style={s.errorText}>{errors.goalAmount}</div>}
        </div>

        <div style={{ ...s.fieldGroup, flex: 1 }}>
          <label style={s.label}>Currency</label>
          <select
            style={s.input}
            value={form.currency}
            onChange={(e) => update("currency", e.target.value)}
          >
            {CURRENCY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ ...s.fieldGroup, marginBottom: 0 }}>
        <label style={s.label}>Campaign Deadline</label>
        <input
          style={s.input}
          type="date"
          value={form.deadline}
          min={new Date(Date.now() + 86400000).toISOString().slice(0, 10)}
          onChange={(e) => update("deadline", e.target.value)}
        />
        <div style={s.helpText}>Funds must be raised before this date.</div>
        {errors.deadline && <div style={s.errorText}>{errors.deadline}</div>}
      </div>
    </div>
  );
}