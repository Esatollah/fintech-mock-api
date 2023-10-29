import { z } from "zod";

export const cardSchema = z.object({
  accountId: z.string(),
  countryCode: z.string(),
  created: z.string(),
  expDate: z.string(),
  expMonth: z.number(),
  expYear: z.number(),
  firstNumbers: z.string(),
  id: z.string(),
  lastNumbers: z.string().min(4).max(4),
  live: z.boolean(),
  scheme: z.string(),
  type: z.string(),
  updated: z.string(),
  verificationMethod: z.string(),
  verificationStatus: z.string()
});

export type Card = z.infer<typeof cardSchema>;

