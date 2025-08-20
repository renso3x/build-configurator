"use client";

import { AppHeader } from "./app-header";
import { type NavigationItem } from "./navigation-config";
import { usePathname } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
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
    <section className="min-h-screen bg-slate-50">
      <AppHeader />
      <main className="flex-1  flex-col bg-white shadow-sm rounded-md overflow-hidden w-full mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-8 flex gap-6">
        {children}
      </main>
    </section>
  );
}
