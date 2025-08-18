"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { AppSidebarHeader } from "./sidebar-header";
import { SidebarNavigation } from "./sidebar-navigation";
import { UserProfile } from "./user-profile";
import { type NavigationItem } from "./navigation-config";

interface AppSidebarProps {
  navigationItems?: NavigationItem[];
  user?: {
    name: string;
    email: string;
    avatar?: string;
    initials?: string;
  };
}

export function AppSidebar({ navigationItems, user }: AppSidebarProps) {
  return (
    <Sidebar>
      <AppSidebarHeader />
      <SidebarNavigation items={navigationItems} />
      <UserProfile user={user} />
    </Sidebar>
  );
}
