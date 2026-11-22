import { z } from "zod";

export const challengeSchema = z.object({
  company: z.string().trim().min(2, "Enter your business or organization name.").max(120),
  contactName: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  challengeTitle: z.string().trim().min(5, "Add a short title for your challenge.").max(160),
  challengeDescription: z
    .string()
    .trim()
    .min(20, "Add a little more detail about the challenge.")
    .max(3000, "Keep the challenge description under 3,000 characters.")
});

export type ChallengeSubmission = z.infer<typeof challengeSchema>;
