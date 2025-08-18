import { AppLayout } from "@/components/layout";
import { NavigationItem } from "@/components/layout";
import { FileText, BarChart, Cog } from "lucide-react";

// Example of custom navigation items
const customNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart,
  },
  {
    title: "Documents",
    url: "/documents",
    icon: FileText,
  },
  {
    title: "Configuration",
    url: "/config",
    icon: Cog,
  },
];

// Example of custom user data
const currentUser = {
  name: "Jane Smith",
  email: "jane.smith@company.com",
  avatar: "/avatars/jane.png",
  initials: "JS"
};

// Example of custom header configuration
const headerConfig = {
  showSearch: true,
  showNotifications: false,
};

export default function CustomLayoutExample() {
  return (
    <AppLayout
      navigationItems={customNavigation}
      user={currentUser}
      headerConfig={headerConfig}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Custom Layout Example</h1>
        <p className="text-muted-foreground">
          This page demonstrates how to use the refactored layout components with custom configuration.
        </p>
        
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold mb-2">Custom Navigation</h2>
            <p className="text-sm text-muted-foreground">
              The sidebar now uses custom navigation items with different icons and routes.
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold mb-2">Custom User Profile</h2>
            <p className="text-sm text-muted-foreground">
              The user profile in the sidebar footer displays custom user information.
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold mb-2">Custom Header</h2>
            <p className="text-sm text-muted-foreground">
              The header configuration shows search but hides notifications.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
