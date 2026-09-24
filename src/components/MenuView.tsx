"use client";

import { useState, useMemo, useCallback } from "react";
import { Filter, X, ChevronDown, Plus, Minus, Check } from "lucide-react";
import { allMenuItems, type MenuItem } from "@/lib/menu-data";
import { useSelection } from "@/hooks/use-selection";
import { Reveal } from "@/components/Reveal";

type FilterState = {
  search: string;
};

export function MenuView() {
  const [filters, setFilters] = useState<FilterState>({ search: "" });
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const {
    selectedItems,
    addItem,
    removeItem,
    updateQuantity,
    totalCount,
    totalPrice,
    getSelectionForDisplay,
    close,
  } = useSelection();

  const filteredItems = useMemo(() => {
    return allMenuItems.filter((item) => {
      if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const hasActiveFilters = filters.search.length > 0;

  const clearFilters = useCallback(() => {
    setFilters({ search: "" });
  }, []);

  const handleAddItem = useCallback(
    (item: MenuItem) => {
      addItem(item);
    },
    [addItem],
  );

  const isSelected = (id: number) => selectedItems.has(id);
  const getQuantity = (id: number) => selectedItems.get(id)?.quantity || 0;

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-16 z-40 bg-ink/95 backdrop-blur-md border-b border-cream/10 px-5 py-3 sm:top-14">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40 size-4" />
            <input
              type="search"
              placeholder="Поиск по блинам..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2.5 bg-cream/5 border border-cream/20 rounded-lg text-cream placeholder-cream/40 text-sm focus:outline-none focus:border-accent"
            />
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="px-3 py-1.5 text-[0.65rem] tracking-[0.1em] uppercase text-cream/50 hover:text-cream"
            >
              Сбросить
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 pb-32">
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-cream/50">
            <p className="text-sm">Ничего не найдено. Попробуйте сменить поиск.</p>
          </div>
        )}

        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Reveal key={item.id} delay={item.id * 50}>
              <div className="group relative bg-cream/3 border border-cream/10 rounded-lg overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={(() => setExpandedId((prev) => (prev === item.id ? null : item.id)))()}
                  className="w-full p-4 flex items-start gap-3 text-left"
                  aria-expanded={expandedId === item.id}
                >
                  <span className="shrink-0 font-display text-xl tabular-nums text-accent font-bold leading-none">
                    {item.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-leading-snug pr-8">
                      {item.name.split(",").slice(0, 3).join(", ")}
                    </p>
                    {item.desc && (
                      <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink/60">
                        {item.desc}
                      </p>
                    )}
                    {item.volume && (
                      <p className="mt-1 text-[0.7rem] tracking-widest uppercase text-ink/40">
                        {item.volume}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="font-display text-lg tabular-nums text-ink">
                      {item.price} BYN
                    </span>
                    {isSelected(item.id) ? (
                      <QuantityControl
                        quantity={getQuantity(item.id)}
                        onIncrement={() => updateQuantity(item.id, getQuantity(item.id) + 1)}
                        onDecrement={() => updateQuantity(item.id, getQuantity(item.id) - 1)}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddItem(item);
                        }}
                        className="btn-primary !px-4 !py-2 text-sm"
                      >
                        <Plus className="size-4" />
                      </button>
                    )}
                    <ChevronDown
                      className={`size-4 text-ink/40 transition-transform ${expandedId === item.id ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {expandedId === item.id && (
                  <div className="border-t border-cream/10 px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className="text-sm text-ink/60">ID: {item.id}</p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {totalCount > 0 ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-300 bg-ink border-t border-cream/10">
          <div className="mx-auto max-w-6xl px-5 py-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-4">
                <span className="font-display text-lg text-cream">
                  Мой выбор — {totalCount} позиций
                </span>
                <span className="text-cream/60 text-sm">·</span>
                <span className="font-display text-lg text-accent">
                  {totalPrice.toFixed(2).replace(".", ",")} BYN
                </span>
              </div>
              <button
                type="button"
                onClick={() => {}}
                className="btn-primary !px-6 !py-2.5 w-full sm:w-auto"
              >
                Показать на кассе
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
}: {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className="flex items-center gap-1 bg-cream/10 border border-cream/20 rounded-lg px-2 py-1">
      <button
        type="button"
        onClick={onDecrement}
        className="text-ink/60 hover:text-ink p-0.5 -m-0.5"
        aria-label="Уменьшить"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="font-display text-sm tabular-nums text-ink w-6 text-center">{quantity}</span>
      <button
        type="button"
        onClick={onIncrement}
        className="text-ink/60 hover:text-ink p-0.5 -m-0.5"
        aria-label="Увеличить"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
