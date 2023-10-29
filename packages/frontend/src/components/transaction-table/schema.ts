import { z } from "zod";

export const transactionSchema = z.object({
  date: z.string(),
  scheme: z.string(),
  card: z.string().min(4).max(4),
  status: z.string(),
  amount: z.number(),

  accountId: z.string(),
  authCode: z.string().nullable(),
  currency: z.string(),
  id: z.string(),
  cardId: z.string(),
  created: z.string(),
  cleared: z.boolean(),
  merchantCategoryCode: z.string(),
  updated: z.string(),
});

export type Transaction = z.infer<typeof transactionSchema>;

