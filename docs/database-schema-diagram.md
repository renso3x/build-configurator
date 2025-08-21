# Caravan Order Form Database Schema

## Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ Order : "places"
    Form ||--o{ Section : "contains"
    Form ||--o{ Order : "generates"
    Section ||--o{ Specification : "contains"
    Specification ||--o{ SpecificationItem : "contains"
    Specification ||--o{ OrderSelection : "selected_in"
    SpecificationItem ||--o{ OrderSelection : "selected_as"
    Order ||--o{ OrderSelection : "contains"

    User {
        string id PK
        string firstName
        string lastName
        string email UK
        datetime createdAt
        datetime updatedAt
    }

    Form {
        string id PK
        string name
        string description
        boolean isActive
        string version
        datetime createdAt
        datetime updatedAt
    }

    Section {
        string id PK
        string formId FK
        string name
        string description
        int order
        boolean isRequired
        datetime createdAt
        datetime updatedAt
    }

    Specification {
        string id PK
        string sectionId FK
        string name
        string description
        int order
        boolean isRequired
        InputType inputType
        datetime createdAt
        datetime updatedAt
    }

    SpecificationItem {
        string id PK
        string specificationId FK
        string name
        string description
        decimal price
        int order
        boolean isDefault
        boolean isAvailable
        string sku
        datetime createdAt
        datetime updatedAt
    }

    Order {
        string id PK
        string userId FK
        string formId FK
        string orderNumber UK
        OrderStatus status
        decimal totalPrice
        string customerNotes
        string internalNotes
        datetime submittedAt
        datetime createdAt
        datetime updatedAt
    }

    OrderSelection {
        string id PK
        string orderId FK
        string specificationId FK
        string specificationItemId FK
        string customValue
        int quantity
        decimal unitPrice
        decimal totalPrice
        datetime createdAt
        datetime updatedAt
    }

    Role {
        string id PK
        RoleType type
    }
```

## Hierarchical Structure Flow

```
📋 Form (Caravan Order Form)
├── 🏗️ Section 1 (e.g., "Exterior Features")
│   ├── ⚙️ Specification 1.1 (e.g., "Body Color")
│   │   ├── 🎨 Item: White
│   │   ├── 🎨 Item: Silver
│   │   └── 🎨 Item: Black
│   ├── ⚙️ Specification 1.2 (e.g., "Awning Type")
│   │   ├── 🏠 Item: Roll-out Awning
│   │   ├── 🏠 Item: Fixed Awning
│   │   └── 🏠 Item: No Awning
│   └── ⚙️ Specification 1.3 (e.g., "Custom Graphics")
│       └── 📝 Text Input Field
├── 🏗️ Section 2 (e.g., "Interior Features")
│   ├── ⚙️ Specification 2.1 (e.g., "Bed Configuration")
│   │   ├── 🛏️ Item: Double Bed
│   │   ├── 🛏️ Item: Twin Beds
│   │   └── 🛏️ Item: Bunk Beds
│   └── ⚙️ Specification 2.2 (e.g., "Kitchen Layout")
│       ├── 🍳 Item: Galley Kitchen
│       ├── 🍳 Item: L-Shaped Kitchen
│       └── 🍳 Item: Compact Kitchen
└── 🏗️ Section 3 (e.g., "Technical Specifications")
    ├── ⚙️ Specification 3.1 (e.g., "Solar Panel")
    │   ├── ⚡ Item: 100W Panel
    │   ├── ⚡ Item: 200W Panel
    │   └── ⚡ Item: No Solar
    └── ⚙️ Specification 3.2 (e.g., "Battery Capacity")
        ├── 🔋 Item: 100Ah Lithium
        ├── 🔋 Item: 200Ah Lithium
        └── 🔋 Item: 300Ah Lithium
```

## Enums

### InputType
- `SINGLE_SELECT` - Radio buttons (select one)
- `MULTIPLE_SELECT` - Checkboxes (select multiple)
- `TEXT_INPUT` - Single line text
- `TEXT_AREA` - Multi-line text
- `NUMBER_INPUT` - Numeric input
- `DATE_INPUT` - Date picker
- `FILE_UPLOAD` - File attachment

### OrderStatus
- `DRAFT` - Customer configuring
- `SUBMITTED` - Customer submitted
- `UNDER_REVIEW` - Staff reviewing
- `APPROVED` - Order approved
- `IN_PRODUCTION` - Being manufactured
- `COMPLETED` - Order finished
- `CANCELLED` - Order cancelled

### RoleType
- `STAFF` - Regular staff member
- `ADMIN` - Administrator

## Data Flow Example

### 1. Form Creation (Admin)
```
Admin creates Form "Hornet Family Caravan 2025"
├── Section: "Exterior" (order: 1)
│   ├── Spec: "Body Color" (SINGLE_SELECT, required)
│   │   ├── Item: "Pearl White" ($0)
│   │   ├── Item: "Metallic Silver" ($500)
│   │   └── Item: "Midnight Black" ($800)
│   └── Spec: "Custom Decals" (TEXT_AREA, optional)
└── Section: "Interior" (order: 2)
    └── Spec: "Bed Type" (SINGLE_SELECT, required)
        ├── Item: "Queen Bed" ($0)
        └── Item: "Twin Beds" ($300)
```

### 2. Customer Order Process
```
Customer selects:
├── Body Color: "Metallic Silver" → OrderSelection
├── Custom Decals: "Family name on side" → OrderSelection
└── Bed Type: "Queen Bed" → OrderSelection

Order Total: $500 (Silver color) + $0 (Queen bed) = $500
```

## Key Features

1. **Flexible Form Builder**: Admins can create any form structure
2. **Dynamic Pricing**: Each item can have its own price
3. **Multiple Input Types**: Support for various input methods
4. **Order Tracking**: Complete order lifecycle management
5. **Validation**: Required fields and business logic
6. **Audit Trail**: Creation and update timestamps
7. **Scalable**: Can handle multiple caravan models/forms

## Use Cases

### For JotForm-like Functionality:
- **Form Builder UI**: Drag-and-drop sections and specifications
- **Dynamic Rendering**: Forms render based on database structure
- **Conditional Logic**: Show/hide specs based on previous selections
- **Real-time Pricing**: Calculate totals as user selects options
- **Order Management**: Track orders through production pipeline
