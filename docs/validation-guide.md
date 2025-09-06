# Zod + React Hook Form Validation Guide

This guide shows how to implement robust form validation using Zod schemas with React Hook Form for the caravan configurator.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install zod react-hook-form @hookform/resolvers
```

### 2. Basic Setup

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define your schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price cannot be negative"),
});

// Use in component
const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: { name: "", price: 0 },
  mode: "onChange", // Real-time validation
});
```

## 📋 Schema Examples

### Simple Field Validation

```tsx
// Individual field schemas
const sectionNameSchema = z
  .string()
  .min(1, "Section name is required")
  .min(2, "Must be at least 2 characters")
  .max(50, "Cannot exceed 50 characters")
  .regex(/^[a-zA-Z0-9\s\-_()]+$/, "Invalid characters")
  .trim();

const priceSchema = z
  .number()
  .min(0, "Cannot be negative")
  .max(999999, "Cannot exceed $999,999")
  .multipleOf(0.01, "Must be valid currency amount");
```

### Complex Nested Validation

```tsx
// Nested object with arrays
const formBuilderSchema = z.object({
  formFields: z
    .array(
      z.object({
        section: z.object({
          name: z.string().min(1, "Required"),
        }),
        specifications: z
          .array(
            z.object({
              name: z.string().min(1, "Required"),
              price: z.number().min(0, "Cannot be negative"),
            })
          )
          .min(1, "At least one specification required"),
      })
    )
    .min(1, "At least one section required")
    .refine(
      (sections) => {
        // Custom validation: unique section names
        const names = sections.map((s) => s.section.name.toLowerCase());
        return new Set(names).size === names.length;
      },
      { message: "Section names must be unique" }
    ),
});
```

## 🎯 Implementation Approaches

### Approach 1: Basic Form with Validation

```tsx
"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  sectionName: z.string().min(1, "Required").max(50, "Too long"),
  specifications: z
    .array(
      z.object({
        name: z.string().min(1, "Required"),
        price: z.number().min(0, "Cannot be negative"),
      })
    )
    .min(1, "At least one spec required"),
});

export default function BasicValidatedForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      sectionName: "",
      specifications: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = (data) => {
    console.log("Valid data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="sectionName"
        control={control}
        render={({ field }) => (
          <div>
            <input {...field} placeholder="Section Name" />
            {errors.sectionName && (
              <p className="error">{errors.sectionName.message}</p>
            )}
          </div>
        )}
      />
      {/* More fields... */}
    </form>
  );
}
```

### Approach 2: Advanced with Field Arrays

```tsx
import { useForm, useFieldArray, Controller } from "react-hook-form";

export default function AdvancedForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formBuilderSchema),
    mode: "onChange", // Real-time validation
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "formFields",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <Controller
            name={`formFields.${index}.section.name`}
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.formFields?.[index]?.section?.name && (
            <p>{errors.formFields[index].section.name.message}</p>
          )}
        </div>
      ))}
    </form>
  );
}
```

### Approach 3: Custom Validation Hooks

```tsx
// Custom hook for reusable validation
export const useFormValidation = () => {
  const schema = z.object({
    formFields: z
      .array(sectionWithSpecsSchema)
      .min(1, "At least one section required"),
  });

  return useForm({
    resolver: zodResolver(schema),
    defaultValues: { formFields: [] },
    mode: "onChange",
  });
};

// Usage in component
export default function MyForm() {
  const form = useFormValidation();
  // Use form.control, form.handleSubmit, etc.
}
```

## 🔧 Validation Features

### Real-time Validation

```tsx
const form = useForm({
  resolver: zodResolver(schema),
  mode: "onChange", // Validates on every change
  // Other options:
  // mode: "onBlur" - Validates when field loses focus
  // mode: "onSubmit" - Validates only on submit
  // mode: "onTouched" - Validates after first interaction
});
```

### Custom Error Messages

```tsx
const schema = z.object({
  name: z
    .string()
    .min(1, "This field is required")
    .min(2, "Must be at least 2 characters")
    .max(50, "Cannot exceed 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  price: z
    .number()
    .min(0, "Price cannot be negative")
    .max(999999, "Price is too high"),
});
```

### Conditional Validation

```tsx
const schema = z
  .object({
    type: z.enum(["basic", "premium"]),
    price: z.number(),
  })
  .refine(
    (data) => {
      if (data.type === "premium" && data.price < 100) {
        return false; // Premium items must cost at least $100
      }
      return true;
    },
    {
      message: "Premium items must cost at least $100",
      path: ["price"], // Which field to show error on
    }
  );
```

### Async Validation

```tsx
const schema = z
  .object({
    name: z.string().min(1, "Required"),
  })
  .refine(
    async (data) => {
      // Check if name is unique (API call)
      const response = await fetch(`/api/check-name/${data.name}`);
      const { isUnique } = await response.json();
      return isUnique;
    },
    {
      message: "This name is already taken",
      path: ["name"],
    }
  );
```

## 🎨 UI Integration

### Error Display

```tsx
// Basic error display
{
  errors.fieldName && (
    <p className="text-red-500 text-sm">{errors.fieldName.message}</p>
  );
}

// Enhanced error display with icons
{
  errors.fieldName && (
    <div className="flex items-center gap-1 text-red-500 text-sm">
      <AlertCircle className="h-4 w-4" />
      <span>{errors.fieldName.message}</span>
    </div>
  );
}

// Form-level errors
{
  errors.root && (
    <Alert variant="destructive">
      <AlertDescription>{errors.root.message}</AlertDescription>
    </Alert>
  );
}
```

### Form State Indicators

```tsx
const { formState: { isValid, isSubmitting, errors, touchedFields } } = useForm();

// Submit button state
<Button
  type="submit"
  disabled={!isValid || isSubmitting}
  className={isValid ? "bg-green-600" : "bg-gray-400"}
>
  {isSubmitting ? "Saving..." : "Save Form"}
</Button>

// Field validation indicators
<div className="relative">
  <Input {...field} className={errors.name ? "border-red-500" : ""} />
  {touchedFields.name && !errors.name && (
    <CheckCircle className="absolute right-2 top-2 h-4 w-4 text-green-500" />
  )}
</div>
```

## 🚀 Performance Optimization

### Debounced Validation

```tsx
import { useDebouncedCallback } from "use-debounce";

const debouncedValidation = useDebouncedCallback(
  (fieldName: string) => {
    trigger(fieldName); // Trigger validation
  },
  300 // 300ms delay
);

// Use in field onChange
<input
  {...field}
  onChange={(e) => {
    field.onChange(e);
    debouncedValidation(field.name);
  }}
/>;
```

### Memoized Schemas

```tsx
import { useMemo } from "react";

const schema = useMemo(() => {
  return z.object({
    // Heavy validation logic
  });
}, [dependencies]);
```

## 📚 Available Components

1. **FormBuilderWithValidation** - Basic validation with clean UI
2. **AdvancedFormBuilder** - Full-featured with real-time validation
3. **Validation utilities** - Helper functions and schemas

## 🔍 Testing

```tsx
// Test your schemas
const testData = {
  sectionName: "Test Section",
  specifications: [{ name: "Test Spec", price: 100 }],
};

const result = schema.safeParse(testData);
if (result.success) {
  console.log("Valid:", result.data);
} else {
  console.log("Errors:", result.error.format());
}
```

This comprehensive validation system provides:

- ✅ Type safety with TypeScript
- ✅ Real-time validation feedback
- ✅ Custom error messages
- ✅ Complex nested form support
- ✅ Performance optimizations
- ✅ Excellent developer experience
