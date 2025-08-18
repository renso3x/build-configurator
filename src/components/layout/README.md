# Layout Components

This directory contains the refactored layout components for the application. The monolithic `app-layout.tsx` has been broken down into smaller, more maintainable components.

## Structure

```
src/components/layout/
├── index.ts                  # Barrel exports
├── app-layout.tsx           # Main layout wrapper
├── app-sidebar.tsx          # Sidebar component
├── app-header.tsx           # Header component
├── sidebar-header.tsx       # Sidebar header section
├── sidebar-navigation.tsx   # Sidebar navigation menu
├── user-profile.tsx         # User profile dropdown
├── search-bar.tsx           # Search input component
├── navigation-config.ts     # Navigation configuration
└── example-usage.tsx        # Usage examples
```

## Components

### AppLayout

Main layout wrapper that combines sidebar and header.

```tsx
import { AppLayout } from "@/components/layout";

<AppLayout
  navigationItems={customNavigation}
  user={currentUser}
  headerConfig={{ showSearch: true, showNotifications: true }}
>
  {children}
</AppLayout>;
```

### AppSidebar

Complete sidebar with header, navigation, and user profile.

```tsx
import { AppSidebar } from "@/components/layout";

<AppSidebar navigationItems={items} user={user} />;
```

### AppHeader

Header with sidebar trigger, search, and notifications.

```tsx
import { AppHeader } from "@/components/layout";

<AppHeader showSearch={true} showNotifications={true} />;
```

### Individual Components

- **AppSidebarHeader**: App logo and branding
- **SidebarNavigation**: Navigation menu items
- **UserProfile**: User dropdown in sidebar footer
- **SearchBar**: Reusable search input

## Configuration

### Navigation Items

```tsx
import { NavigationItem } from "@/components/layout";

const items: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  // ... more items
];
```

### User Configuration

```tsx
const user = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatar.png", // optional
  initials: "JD", // optional, auto-generated if not provided
};
```

## Benefits

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be used independently
3. **Customization**: Easy to customize individual parts
4. **Maintainability**: Easier to test and maintain
5. **Type Safety**: Full TypeScript support with proper interfaces
6. **Backward Compatibility**: Existing code continues to work

## Migration

The old `app-layout.tsx` file now re-exports the new components, so existing code will continue to work without changes. For new code, prefer importing from `@/components/layout` for better tree-shaking and clearer dependencies.

```tsx
// Old way (still works)
import { AppLayout } from "@/components/app-layout";

// New way (recommended)
import { AppLayout } from "@/components/layout";
```
