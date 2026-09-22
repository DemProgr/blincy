"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type MapId = "yandex" | "2gis" | "google";

interface MapSelectorProps {
  urls: Record<MapId, string>;
  variant?: "primary" | "ghost";
  className?: string;
}

const OPTIONS: { id: MapId; label: string }[] = [
  { id: "yandex", label: "Яндекс Карты" },
  { id: "2gis", label: "2GIS" },
  { id: "google", label: "Google Карты" },
];

export function MapSelector({ urls, variant = "primary", className }: MapSelectorProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-flex">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(variant === "primary" ? "btn-primary" : "btn-ghost", className)}
      >
        Построить маршрут
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute top-[calc(100%+8px)] left-0 z-50 min-w-52 overflow-hidden rounded-xl border border-border bg-card py-1 text-left shadow-soft"
        >
          {OPTIONS.map((opt) => (
            <a
              key={opt.id}
              role="menuitem"
              href={urls[opt.id]}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm normal-case tracking-normal text-card-foreground transition hover:bg-muted"
            >
              {opt.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
