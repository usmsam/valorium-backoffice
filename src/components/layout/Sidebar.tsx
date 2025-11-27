"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationSections } from "@/lib/navigation-data";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-background h-screen overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold">VALORIUM Admin</h1>
      </div>

      <nav className="p-4 space-y-6">
        {navigationSections.map((section) => (
          <div key={section.id}>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {section.title}
            </h2>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname.startsWith(item.path);
                return (
                  <li key={item.id}>
                    <Link
                      href={item.path}
                      className={cn(
                        "block px-3 py-2 rounded-md text-sm transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
