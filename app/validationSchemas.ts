import { z } from 'zod';

export const IssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(255),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(65535),
});
export const PatchIssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(255)
    .optional(),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(65535)
    .optional(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
  assignedToUserId: z
    .string()
    .min(1, 'Assigned to user id is required')
    .max(255)
    .optional()
    .nullable(),
});
