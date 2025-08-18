import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchBar } from "./search-bar";

interface AppHeaderProps {
  showSearch?: boolean;
  showNotifications?: boolean;
}

export function AppHeader({ 
  showSearch = true, 
  showNotifications = true 
}: AppHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-1 items-center gap-2 px-3">
        {showSearch && (
          <div className="flex-1">
            <SearchBar />
          </div>
        )}
        {showNotifications && (
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  );
}
