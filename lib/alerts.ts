import { z } from "zod";

export const channelValues = ["whatsapp", "sms", "email", "call"] as const;

export const alertSchema = z
  .object({
    fullName: z.string().trim().min(1),
    provisionalLicense: z.string().trim().min(1),
    existingBookingReference: z.string().trim().optional(),
    theoryPassReference: z.string().trim().optional(),
    preferredLocation: z.string().trim().min(1),
    preferredDateFrom: z.string().trim().min(1),
    preferredDateTo: z.string().trim().min(1),
    preferredTimeFrom: z.string().trim().min(1),
    preferredTimeTo: z.string().trim().min(1),
    phoneNumber: z.string().trim().min(1),
    email: z.string().trim().email(),
    channels: z.array(z.enum(channelValues)).min(1),
  })
  .superRefine((value, context) => {
    if (!value.existingBookingReference && !value.theoryPassReference) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["existingBookingReference"],
        message:
          "Provide either existing booking reference or theory pass reference.",
      });
    }
  });

export type AlertInput = z.infer<typeof alertSchema>;

export function parseIsoDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }
  return date;
}

export function addCadence(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}
