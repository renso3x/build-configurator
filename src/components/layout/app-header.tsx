import AppMenu from "./app-menu";

export function AppHeader() {
  return (
    <header>
      <nav className="mx-auto max-w-full bg-black text-white flex-1 flex justify-between px-4 lg:px-8 sm:px-4 h-16 gap-4 items-center">
        <div className="items-center text-sm font-medium">
          <span className="text-lg font-bold">COMPANY</span>
        </div>
        <div className="items-center text-sm">
          <a className="text-slate-300 hover:text-white">Logout</a>
        </div>
      </nav>

      <AppMenu />
    </header>
  );
}
