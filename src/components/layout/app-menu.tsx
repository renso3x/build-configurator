import React from "react";

export default function AppMenu() {
  return (
    <nav className="w-full bg-sky-600 text-white shadow-sm mx-auto  px-4 sm:px-6">
      <section className="flex h-16 items-center justify-between">
        <ul className="flex gap-4 items-center">
          {["dashboard", "setup", "reports"].map((key) => {
            return (
              <li key={key}>
                <a
                  href={"/"}
                  className={`inline-block rounded-t-md p-2 text-sm font-semibold text-sky-50/95 hover:text-white `}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </nav>
  );
}
