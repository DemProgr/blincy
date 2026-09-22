import type { MenuSection } from "@/lib/menu-data";
import { Reveal } from "@/components/Reveal";

export function MenuBlock({ section, dark = false }: { section: MenuSection; dark?: boolean }) {
  return (
    <Reveal
      className={`rounded-lg border p-6 sm:p-8 ${
        dark ? "border-cream/15 bg-cream/[0.04]" : "border-border bg-card shadow-soft"
      }`}
    >
      <header className="mb-6 flex items-baseline justify-between gap-4 border-b border-current/15 pb-3">
        <h3 className="font-display text-2xl leading-none sm:text-3xl">{section.title}</h3>
        {section.note ? (
          <span className="shrink-0 text-[0.65rem] tracking-[0.2em] uppercase opacity-60">
            {section.note}
          </span>
        ) : null}
      </header>
      <ul className="space-y-5">
        {section.items.map((item) => (
          <li key={item.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <div className="min-w-0">
              <p className="text-[0.95rem] leading-snug font-semibold tracking-tight">
                {item.name}
              </p>
              {item.desc ? (
                <p className="mt-1 text-[0.78rem] leading-relaxed opacity-60">{item.desc}</p>
              ) : null}
            </div>
            <div className="shrink-0 text-right">
              {item.volume ? (
                <span className="mr-3 text-[0.7rem] tracking-widest opacity-50">{item.volume}</span>
              ) : null}
              <span className="font-display text-xl tabular-nums">{item.price}</span>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
