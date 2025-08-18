"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";
import { type NavigationItem } from "./navigation-config";

interface AppLayoutProps {
  children: React.ReactNode;
  navigationItems?: NavigationItem[];
  user?: {
    name: string;
    email: string;
    avatar?: string;
    initials?: string;
  };
  headerConfig?: {
    showSearch?: boolean;
    showNotifications?: boolean;
  };
}

export function AppLayout({ 
  children, 
  navigationItems, 
  user,
  headerConfig = { showSearch: true, showNotifications: true }
}: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar navigationItems={navigationItems} user={user} />
      <main className="flex flex-1 flex-col">
        <AppHeader {...headerConfig} />
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
