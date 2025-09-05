"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionField, SpecificationField } from "@/lib/types";
import { Plus } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { createFormBuilder } from "@/actions/form-builder";

export type FormFields = {
  section: SectionField;
  specifications: SpecificationField[];
};

export default function FormBuilder() {
  const [formFields, setFormFields] = useState<FormFields[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const addNewSection = () => {
    setFormFields([
      ...formFields,
      {
        section: {
          name: "",
        },
        specifications: [],
      },
    ]);
  };

  const addNewSpecification = (sectionId: number) => {
    setFormFields((prev) => {
      if (!prev) return prev;
      return prev.map((field, index) =>
        index === sectionId
          ? {
              ...field,
              specifications: [...field.specifications, { name: "", price: 0 }],
            }
          : field
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form data
    if (formFields.length === 0) {
      setSubmitMessage("Please add at least one section");
      return;
    }

    // Check if all sections have names
    const invalidSections = formFields.filter(field => !field.section.name.trim());
    if (invalidSections.length > 0) {
      setSubmitMessage("Please provide names for all sections");
      return;
    }

    // Check if all specifications have names
    for (let i = 0; i < formFields.length; i++) {
      const field = formFields[i];
      const invalidSpecs = field.specifications.filter(spec => !spec.name.trim());
      if (invalidSpecs.length > 0) {
        setSubmitMessage(`Please provide names for all specifications in "${field.section.name}"`);
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const result = await createFormBuilder(formFields);
      
      if (result.success) {
        setSubmitMessage(result.message);
        // Reset form on success
        setFormFields([]);
      } else {
        setSubmitMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setSubmitMessage("An unexpected error occurred");
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldIndex: number,
    fieldType: "section" | "specification" | "price",
    specIndex?: number
  ) => {
    const value = e.target.value;

    setFormFields((prev) => {
      return prev.map((field, index) => {
        if (index !== fieldIndex) return field;

        if (fieldType === "section") {
          return {
            ...field,
            section: {
              ...field.section,
              name: value,
            },
          };
        }

        if (fieldType === "specification" && specIndex !== undefined) {
          return {
            ...field,
            specifications: field.specifications.map((spec, sIndex) =>
              sIndex === specIndex ? { ...spec, name: value } : spec
            ),
          };
        }

        if (fieldType === "price" && specIndex !== undefined) {
          return {
            ...field,
            specifications: field.specifications.map((spec, sIndex) =>
              sIndex === specIndex ? { ...spec, price: Number(value) } : spec
            ),
          };
        }

        return field;
      });
    });
  };

  return (
    <form className="flex flex-col gap-4 w-[600px]" onSubmit={handleSubmit}>
      <section className="flex flex-row justify-between items-center ">
        <h2>Form Builder</h2>
        <Button onClick={addNewSection} type="button">
          <Plus className="mr-2" />
          Add Section
        </Button>
      </section>

      {formFields?.map((fields, fieldIndex) => (
        <section
          key={fieldIndex}
          className="flex flex-col gap-4 pb-4 border-b border-b-gray-300"
        >
          <section className="flex flex-row gap-4">
            <Input
              placeholder="Section"
              type="text"
              value={fields.section.name}
              onChange={(e) => handleChange(e, fieldIndex, "section")}
            />
          </section>

          <section className="flex flex-col gap-4">
            {fields.specifications.map((spec, specIndex) => (
              <div className="flex flex-row gap-4" key={specIndex}>
                <Input
                  type="text"
                  placeholder="Specification"
                  onChange={(e) =>
                    handleChange(e, fieldIndex, "specification", specIndex)
                  }
                />
                <Input
                  type="text"
                  placeholder="Price"
                  onChange={(e) =>
                    handleChange(e, fieldIndex, "price", specIndex)
                  }
                />
              </div>
            ))}
          </section>

          <Button onClick={() => addNewSpecification(fieldIndex)} type="button">
            <Plus className="mr-2" />
            Add Specification
          </Button>
        </section>
      ))}

      {/* Submit Message */}
      {submitMessage && (
        <div
          className={`p-4 rounded-md text-sm ${
            submitMessage.includes("Success") || submitMessage.includes("Successfully")
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {submitMessage}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting || formFields.length === 0}>
        {isSubmitting ? "Saving..." : "Save Form"}
      </Button>
    </form>
  );
}
