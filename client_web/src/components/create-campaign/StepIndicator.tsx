import { STEPS } from "./CreateCampaignConfig";

export default function StepIndicator({ currentStep }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "52px" }}>
      {STEPS.map((step, i) => {
        const isActive = i === currentStep;
        const isDone = i < currentStep;
        return (
          <div key={step} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : undefined }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: isActive || isDone ? "#E8820C" : "#E2D9CC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: isActive || isDone ? "#1A1410" : "#8A7B6E",
                }}
              >
                {isDone ? "✓" : i + 1}
              </div>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#1A1410" : "#8A7B6E",
                  whiteSpace: "nowrap",
                }}
              >
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: "1px", background: isDone ? "#E8820C" : "#E2D9CC", margin: "0 8px", marginBottom: "22px" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}