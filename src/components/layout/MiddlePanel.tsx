"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MiddlePanelItem } from "@/types/navigation";
import { cn } from "@/lib/utils";

interface MiddlePanelProps {
  title: string;
  items: MiddlePanelItem[];
  emptyMessage?: string;
}

export function MiddlePanel({ title, items, emptyMessage = "No items" }: MiddlePanelProps) {
  const pathname = usePathname();

  return (
    <aside className="w-80 border-r border-border bg-background h-screen overflow-y-auto">
      <div className="p-4 border-b border-border sticky top-0 bg-background z-10">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{items.length} items</p>
      </div>

      <div className="p-2">
        {items.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <ul className="space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className={cn(
                      "block px-3 py-3 rounded-md transition-colors",
                      isActive
                        ? "bg-accent border border-border"
                        : "hover:bg-accent/50"
                    )}
                  >
                    <div className="font-medium text-sm">{item.title}</div>
                    {item.subtitle && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.subtitle}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
