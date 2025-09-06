"use client";
import { createFormBuilder } from "@/actions/form-builder";
import { FormBuilderFormData, formBuilderSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Section } from "@prisma/client";
import { useState, createContext, useContext } from "react";
import {
  useForm,
  useFieldArray,
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormTrigger,
  FieldArrayWithId,
} from "react-hook-form";

type FormBuilderContextProviderProps = {
  formFields: Section[];
  children: React.ReactNode;
};

type TFormBuilderContext = {
  formFields: Section[];

  // Form data and state
  submitMessage: string | null;
  isSubmitting: boolean;
  errors: FieldErrors<FormBuilderFormData>;

  // Form control functions
  control: Control<FormBuilderFormData>;
  handleSubmit: UseFormHandleSubmit<FormBuilderFormData>;

  // Section management
  sectionFields: FieldArrayWithId<FormBuilderFormData, "formFields", "id">[];
  addNewSection: () => void;
  removeSection: (index: number) => void;

  // Form submission
  onSubmit: (data: FormBuilderFormData) => Promise<void>;
};

export const FormBuilderContext = createContext<TFormBuilderContext | null>(
  null
);

export default function FormBuilderContextProvider({
  formFields,
  children,
}: FormBuilderContextProviderProps) {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const {
    trigger,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormBuilderFormData>({
    resolver: zodResolver(formBuilderSchema),
    defaultValues: {
      formFields: [],
    },
    mode: "onSubmit",
  });

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "formFields",
  });

  const addNewSection = () => {
    appendSection({
      section: { name: "" },
      specifications: [{ name: "", price: 0 }],
    });
  };

  const onSubmit = async (data: FormBuilderFormData) => {
    const result = await trigger();
    if (!result) return;

    try {
      const result = await createFormBuilder(data.formFields);

      if (result.success) {
        setSubmitMessage(result.message);
      } else {
        setSubmitMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setSubmitMessage("An unexpected error occurred");
      console.error("Submit error:", error);
    }
  };

  return (
    <FormBuilderContext.Provider
      value={{
        // Form data and state
        formFields,
        submitMessage,
        isSubmitting,
        errors,

        // Form control functions
        control,
        handleSubmit,

        // Section management
        sectionFields,
        addNewSection,
        removeSection,

        // Form submission
        onSubmit,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
}

export const useFormBuilderContext = () => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error(
      "useFormBuilderContext must be used within a FormBuilderContextProvider"
    );
  }
  return context;
};
