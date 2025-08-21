import { InputType, Prisma } from "@prisma/client";

// Form Configuration Types
export type FormWithSections = Prisma.FormGetPayload<{
  include: {
    sections: {
      include: {
        specifications: {
          include: {
            items: true;
          };
        };
      };
    };
  };
}>;

export type SectionWithSpecifications = Prisma.SectionGetPayload<{
  include: {
    specifications: {
      include: {
        items: true;
      };
    };
  };
}>;

export type SpecificationWithItems = Prisma.SpecificationGetPayload<{
  include: {
    items: true;
  };
}>;

// Order Types
export type OrderWithDetails = Prisma.OrderGetPayload<{
  include: {
    user: true;
    form: {
      include: {
        sections: {
          include: {
            specifications: {
              include: {
                items: true;
              };
            };
          };
        };
      };
    };
    selections: {
      include: {
        specification: true;
        specificationItem: true;
      };
    };
  };
}>;

export type OrderSelectionWithDetails = Prisma.OrderSelectionGetPayload<{
  include: {
    specification: true;
    specificationItem: true;
  };
}>;

// Form Builder Types for Admin Interface
export type FormBuilder = {
  id?: string;
  name: string;
  description?: string;
  sections: SectionBuilder[];
};

export type SectionBuilder = {
  id?: string;
  name: string;
  description?: string;
  order: number;
  isRequired: boolean;
  specifications: SpecificationBuilder[];
};

export type SpecificationBuilder = {
  id?: string;
  name: string;
  description?: string;
  order: number;
  isRequired: boolean;
  inputType: InputType;
  items: SpecificationItemBuilder[];
};

export type SpecificationItemBuilder = {
  id?: string;
  name: string;
  description?: string;
  price?: number;
  order: number;
  isDefault: boolean;
  isAvailable: boolean;
  sku?: string;
};

// Customer Order Types
export type CustomerOrderForm = {
  formId: string;
  selections: CustomerSelection[];
  customerNotes?: string;
};

export type CustomerSelection = {
  specificationId: string;
  specificationItemId?: string;
  customValue?: string;
  quantity?: number;
};

// Enums (re-export from Prisma)
export { RoleType, InputType, OrderStatus } from "@prisma/client";

// Basic Prisma types
export type UserCreate = Prisma.UserCreateInput;
export type User = Prisma.UserGetPayload;
export type Specification = Prisma.SpecificationGetPayload<{}>;

// Utility Types
export type CreateFormData = Omit<FormBuilder, "id">;
export type UpdateFormData = Partial<FormBuilder> & { id: string };

export type CreateOrderData = {
  userId: string;
  formId: string;
  selections: CustomerSelection[];
  customerNotes?: string;
};

export type UpdateOrderData = Partial<CreateOrderData> & { id: string };
