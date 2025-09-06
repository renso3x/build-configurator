"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormBuilderContext } from "@/contexts/form-builder-context-provider";
import { type FormBuilderFormData } from "@/lib/validations";
import { Plus } from "lucide-react";
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
} from "react-hook-form";

export default function FormBuilder() {
  const {
    submitMessage,
    isSubmitting,
    errors,
    control,
    handleSubmit,
    sectionFields,
    addNewSection,
    removeSection,
    onSubmit,
  } = useFormBuilderContext();

  return (
    <form
      className="flex flex-col gap-4 w-[600px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="flex flex-row justify-between items-center">
        <h2>Form Builder</h2>
        <Button onClick={addNewSection} type="button">
          <Plus className="mr-2" />
          Add Section
        </Button>
      </section>

      {/* Global form errors */}
      {errors.formFields && typeof errors.formFields.message === "string" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{errors.formFields.message}</p>
        </div>
      )}

      {sectionFields.map((sectionField, sectionIndex) => (
        <section
          key={sectionField.id}
          className="flex flex-col gap-4 pb-4 border-b border-b-gray-300"
        >
          <section className="flex flex-row gap-4">
            <div className="flex-1">
              <Controller
                name={`formFields.${sectionIndex}.section.name`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Section" type="text" />
                )}
              />
              {errors.formFields?.[sectionIndex]?.section?.name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.formFields[sectionIndex].section.name.message}
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeSection(sectionIndex)}
            >
              Remove
            </Button>
          </section>

          <SpecificationFields
            sectionIndex={sectionIndex}
            control={control}
            errors={errors}
          />
        </section>
      ))}

      {/* Submit Message */}
      {submitMessage && (
        <div
          className={`p-4 rounded-md text-sm ${
            submitMessage.includes("Success") ||
            submitMessage.includes("Successfully")
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {submitMessage}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || sectionFields.length === 0}
      >
        {isSubmitting ? "Saving..." : "Save Form"}
      </Button>
    </form>
  );
}

// Separate component for specifications
function SpecificationFields({
  sectionIndex,
  control,
  errors,
}: {
  sectionIndex: number;
  control: Control<FormBuilderFormData>;
  errors: FieldErrors<FormBuilderFormData>;
}) {
  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control,
    name: `formFields.${sectionIndex}.specifications`,
  });

  const addNewSpecification = () => {
    appendSpec({ name: "", price: 0 });
  };

  return (
    <section className="flex flex-col gap-4">
      {specFields.map((specField, specIndex) => (
        <div className="flex flex-row gap-4" key={specField.id}>
          <div className="flex-1">
            <Controller
              name={`formFields.${sectionIndex}.specifications.${specIndex}.name`}
              control={control}
              render={({ field }) => (
                <Input {...field} type="text" placeholder="Specification" />
              )}
            />
            {errors.formFields?.[sectionIndex]?.specifications?.[specIndex]
              ?.name && (
              <p className="text-xs text-red-600 mt-1">
                {
                  errors.formFields[sectionIndex].specifications[specIndex].name
                    .message
                }
              </p>
            )}
          </div>
          <div className="w-32">
            <Controller
              name={`formFields.${sectionIndex}.specifications.${specIndex}.price`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(isNaN(value) ? 0 : value);
                  }}
                />
              )}
            />
            {errors.formFields?.[sectionIndex]?.specifications?.[specIndex]
              ?.price && (
              <p className="text-xs text-red-600 mt-1">
                {
                  errors.formFields[sectionIndex].specifications[specIndex]
                    .price.message
                }
              </p>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeSpec(specIndex)}
            disabled={specFields.length <= 1}
          >
            Remove
          </Button>
        </div>
      ))}

      {/* Specifications Error */}
      {errors.formFields?.[sectionIndex]?.specifications &&
        typeof errors.formFields[sectionIndex].specifications.message ===
          "string" && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">
              {errors.formFields[sectionIndex].specifications.message}
            </p>
          </div>
        )}

      <Button onClick={addNewSpecification} type="button">
        <Plus className="mr-2" />
        Add Specification
      </Button>
    </section>
  );
}
