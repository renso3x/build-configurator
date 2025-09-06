"use server";

import { type SectionWithSpecsFormData } from "@/lib/validations";
import { prisma } from "@/db/prisma";

export const createFormBuilder = async (
  formFields: SectionWithSpecsFormData[]
) => {
  try {
    const results = [];

    for (const field of formFields) {
      const createdSection = await prisma.section.create({
        data: {
          name: field.section.name,
        },
      });

      const specifications = [];
      for (const spec of field.specifications) {
        const createdSpec = await prisma.specification.create({
          data: {
            name: spec.name,
            price: spec.price,
            sectionId: createdSection.id,
          },
        });
        specifications.push(createdSpec);
      }

      results.push({
        section: createdSection,
        specifications: specifications,
      });
    }

    return {
      success: true,
      data: results,
      message: `Successfully created ${results.length} sections with their specifications`,
    };
  } catch (error) {
    console.error("Error creating form builder data:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      message: "Failed to create form data",
    };
  }
};

export const getAllFormFields = async () => {
  return await prisma.section.findMany({
    include: {
      specifications: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const getAllSectionsWithSpecs = async () => {
  try {
    const sections = await prisma.section.findMany({
      include: {
        specifications: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      success: true,
      data: sections,
    };
  } catch (error) {
    console.error("Error fetching sections:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
