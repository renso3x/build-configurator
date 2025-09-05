import { Section, Specification } from "@prisma/client";

export type SectionField = Omit<
  Section,
  "id" | "specifications" | "createdAt" | "updatedAt"
>;

export type SpecificationField = Omit<
  Specification,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>;
