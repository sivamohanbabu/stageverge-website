"use client";

import { useState, type FormEvent } from "react";

type FormState = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"company" | "contactName" | "email" | "challengeTitle" | "challengeDescription", string[]>>;

export default function ChallengeForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("submitting");
    setMessage("");
    setErrors({});

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
        fields?: FieldErrors;
      };

      if (!response.ok) {
        setErrors(result.fields ?? {});
        throw new Error(result.error || "We couldn't send your details. Please try again.");
      }

      form.reset();
      setState("success");
      setMessage("Thanks for sharing your challenge. The StageVerge team will be in touch.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form className="challenge-form" id="challenge-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label>
          Business or organization
          <input name="company" required minLength={2} maxLength={120} autoComplete="organization" />
          {errors.company?.[0] && <span className="field-error">{errors.company[0]}</span>}
        </label>
        <label>
          Your name
          <input name="contactName" required minLength={2} maxLength={120} autoComplete="name" />
          {errors.contactName?.[0] && <span className="field-error">{errors.contactName[0]}</span>}
        </label>
        <label className="form-wide">
          Work email
          <input name="email" type="email" required maxLength={254} autoComplete="email" />
          {errors.email?.[0] && <span className="field-error">{errors.email[0]}</span>}
        </label>
        <label className="form-wide">
          Challenge title
          <input name="challengeTitle" required minLength={5} maxLength={160} />
          {errors.challengeTitle?.[0] && <span className="field-error">{errors.challengeTitle[0]}</span>}
        </label>
        <label className="form-wide">
          What problem would you like to solve?
          <textarea name="challengeDescription" required minLength={20} maxLength={3000} rows={4} />
          {errors.challengeDescription?.[0] && <span className="field-error">{errors.challengeDescription[0]}</span>}
        </label>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <button className="button button-lime" type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Sending…" : "Send your challenge"}
        {state !== "submitting" && <span aria-hidden="true">↗</span>}
      </button>
      <p className="form-privacy">We&apos;ll only use these details to follow up about your challenge.</p>
      <p className={`form-message ${state}`} role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
