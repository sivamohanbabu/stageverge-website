import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { challengeSchema } from "../lib/challenge.ts";

const validSubmission = {
  company: "StageVerge Labs",
  contactName: "Alex Morgan",
  email: "alex@example.com",
  challengeTitle: "Improve customer onboarding",
  challengeDescription: "We want to reduce the manual steps in our customer onboarding process."
};

describe("challengeSchema", () => {
  it("accepts valid details and trims surrounding whitespace", () => {
    const result = challengeSchema.safeParse({
      ...validSubmission,
      company: "  StageVerge Labs  "
    });

    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.data.company, "StageVerge Labs");
    }
  });

  it("rejects malformed email and too-short challenge details", () => {
    const result = challengeSchema.safeParse({
      ...validSubmission,
      email: "not-an-email",
      challengeDescription: "Too short"
    });

    assert.equal(result.success, false);
    if (!result.success) {
      const issueFields = result.error.issues.map((issue) => issue.path[0]);
      assert.ok(issueFields.includes("email"));
      assert.ok(issueFields.includes("challengeDescription"));
    }
  });

  it("rejects overlong input", () => {
    const result = challengeSchema.safeParse({
      ...validSubmission,
      challengeDescription: "x".repeat(3001)
    });

    assert.equal(result.success, false);
  });
});
