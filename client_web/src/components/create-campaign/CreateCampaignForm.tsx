"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepIndicator from "./StepIndicator";
import BasicInfoStep from "./steps/BasicInfoStep";
import StoryStep from "./steps/StoryStep";
import GoalTimelineStep from "./steps/GoalTimelineStep";
import ReviewStep from "./steps/ReviewStep";
import { initialFormState, STEPS } from "./CreateCampaignConfig";
import * as s from "./FormStyles";
import { createPost } from "@/lib/store/api/authAPI";

export interface Response {
  error: string;
  data: any;
};

function validateStep(step, form) {
  const errors = {};

  if (step === 0) {
    if (!form.title || form.title.trim().length < 10) errors.title = "Title must be at least 10 characters.";
    if (!form.slug) errors.slug = "Slug is required.";
    if (!form.description || form.description.trim().length < 20) errors.description = "Description must be at least 20 characters.";
  }

  if (step === 1) {
    form.storySections.forEach((section, i) => {
      if (!section.content || section.content.trim().length < 10) {
        errors[`storySections.${i}`] = "Section content is too short.";
      }
    });
  }

  if (step === 2) {
    if (!form.goalAmount || Number(form.goalAmount) <= 0) errors.goalAmount = "Enter a valid goal amount.";
    if (!form.deadline) errors.deadline = "Deadline is required.";
    else if (new Date(form.deadline) <= new Date()) errors.deadline = "Deadline must be in the future.";
  }

  return errors;
}

function buildPayload(form, creatorId) {
  return {
    creator: creatorId,
    title: form.title.trim(),
    slug: form.slug.trim(),
    description: form.description.trim(),
    coverImage: form.coverImage.trim() || null,
    category: form.category,
    goalAmount: Number(form.goalAmount),
    currency: form.currency,
    deadline: new Date(form.deadline).toISOString(),
    storySections: form.storySections.map((sec, i) => ({
      heading: sec.heading.trim(),
      content: sec.content.trim(),
      image: sec.image?.trim() || null,
      order: i + 1,
    })),
    updates: form.updates
      .filter((u) => u.title.trim() && u.content.trim())
      .map((u) => ({ title: u.title.trim(), content: u.content.trim() })),
    tags: form.tags
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean),
  };
}

export default function CreateCampaignForm({ creatorId }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const goNext = () => {
    const stepErrors = validateStep(step, form);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) {
      setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const goBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const payload = buildPayload(form, creatorId);
      // console.log(form);
      console.log(payload);
      const res:Response = await createPost(payload);

      console.log(res);

      if (res.error) {
        throw new Error(res.error || "Failed to create campaign.");
      }

      const data = res.data;
      router.push(`/campaign-details/${data.post_ref}`);
    } catch (err:any) {
      setSubmitError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <StepIndicator currentStep={step} />

      {step === 0 && <BasicInfoStep form={form} setForm={setForm} errors={errors} />}
      {step === 1 && <StoryStep form={form} setForm={setForm} errors={errors} />}
      {step === 2 && <GoalTimelineStep form={form} setForm={setForm} errors={errors} />}
      {step === 3 && <ReviewStep form={form} />}

      {submitError && (
        <div style={{ ...s.errorText, marginTop: "16px", textAlign: "center" }}>{submitError}</div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "28px" }}>
        <button
          type="button"
          style={{ ...s.secondaryBtn, visibility: step === 0 ? "hidden" : "visible" }}
          onClick={goBack}
        >
          ← Back
        </button>

        {step < STEPS.length - 1 ? (
          <button type="button" style={s.primaryBtn} onClick={goNext}>
            Continue →
          </button>
        ) : (
          <button type="button" style={s.primaryBtn} onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Campaign"}
          </button>
        )}
      </div>
    </div>
  );
}