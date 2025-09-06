import { z } from "zod";

// Schema for individual specification
export const specificationSchema = z.object({
  name: z
    .string()
    .min(1, "Specification name is required")
    .min(2, "Specification name must be at least 2 characters")
    .max(100, "Specification name must be less than 100 characters")
    .trim(),
  price: z
    .number()
    .min(0, "Price cannot be negative")
    .max(999999, "Price cannot exceed $999,999")
    .default(0),
});

// Schema for section
export const sectionSchema = z.object({
  name: z
    .string()
    .min(1, "Section name is required")
    .min(2, "Section name must be at least 2 characters")
    .max(50, "Section name must be less than 50 characters")
    .trim(),
});

// Schema for section with specifications
export const sectionWithSpecsSchema = z.object({
  section: sectionSchema,
  specifications: z
    .array(specificationSchema)
    .min(1, "At least one specification is required per section")
    .max(20, "Maximum 20 specifications per section"),
});

// Schema for the entire form
export const formBuilderSchema = z.object({
  formFields: z
    .array(sectionWithSpecsSchema)
    .min(1, "At least one section is required")
    .max(10, "Maximum 10 sections allowed"),
});

// Type inference from schemas
export type SpecificationFormData = z.infer<typeof specificationSchema>;
export type SectionFormData = z.infer<typeof sectionSchema>;
export type SectionWithSpecsFormData = z.infer<typeof sectionWithSpecsSchema>;
export type FormBuilderFormData = z.infer<typeof formBuilderSchema>;
