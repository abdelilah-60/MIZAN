import { z } from "zod";

export const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().optional(),
  farmName: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});

export const userSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().optional(),
});

export const farmSchema = z.object({
  name: z.string().min(2, "Farm name must be at least 2 characters"),
  userId: z.string().uuid("Invalid user ID format"),
});

export const fieldSchema = z.object({
  name: z.string().min(2, "Field name must be at least 2 characters"),
  farmId: z.string().uuid("Invalid farm ID format"),
  cropType: z.string().min(1, "Crop type is required"),
  area: z.number().positive("Area must be a positive number"),
  geoPolygon: z.any(), // GeoJSON validation can be more strict if needed, but 'any' satisfies the requirement
  equipmentConfig: z.record(z.string(), z.any()).optional(),
  soilMetadata: z.record(z.string(), z.any()).optional(),
  plantingDate: z.string().nullish(),
  agronomicData: z.record(z.string(), z.any()).optional(),
});

export type UserInput = z.infer<typeof userSchema>;
export type FarmInput = z.infer<typeof farmSchema>;
export type FieldInput = z.infer<typeof fieldSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
