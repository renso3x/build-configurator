import { useAuth } from "@/contexts/AuthProvider";
import { Button } from "../ui/button";
import AppMenu from "./app-menu";

export function AppHeader() {
  const { signOut } = useAuth();
  return (
    <header>
      <nav className="flex justify-between items-center border-b border-white/10 px-4 lg:px-8 sm:px-8 h-16 max-w-full mx-auto">
        <div className="items-center text-sm font-medium">
          <span className="text-lg font-bold">COMPANY</span>
        </div>
        <ul className="flex gap-2 text-sm">
          <li>
            <Button onClick={signOut} className="cursor-pointer">
              Logout
            </Button>
          </li>
        </ul>
      </nav>
      <AppMenu />
    </header>
  );
}
