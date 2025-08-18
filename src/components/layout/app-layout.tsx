"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";
import { type NavigationItem } from "./navigation-config";
import { usePathname } from "next/navigation";

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
  headerConfig = { showSearch: true, showNotifications: true },
}: AppLayoutProps) {
  const pathname = usePathname();

  const isAuthRoute = pathname.startsWith("/signin");

  if (isAuthRoute) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar navigationItems={navigationItems} user={user} />
      <main className="flex flex-1 flex-col">
        <AppHeader {...headerConfig} />
        <div className="flex-1 p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
