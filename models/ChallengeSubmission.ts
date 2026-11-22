import mongoose, { Schema } from "mongoose";
import type { ChallengeSubmission as ChallengeSubmissionData } from "@/lib/challenge";

const challengeSubmissionSchema = new Schema<ChallengeSubmissionData>(
  {
    company: { type: String, required: true, maxlength: 120 },
    contactName: { type: String, required: true, maxlength: 120 },
    email: { type: String, required: true, maxlength: 254, lowercase: true },
    challengeTitle: { type: String, required: true, maxlength: 160 },
    challengeDescription: { type: String, required: true, maxlength: 3000 }
  },
  { timestamps: true, versionKey: false }
);

export const ChallengeSubmissionModel =
  mongoose.models.ChallengeSubmission ||
  mongoose.model<ChallengeSubmissionData>("ChallengeSubmission", challengeSubmissionSchema);
