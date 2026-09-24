"use client";

import { useState, useMemo, useCallback } from "react";
import { ChevronDown, X, Filter, Sparkles, Plus, Minus, Check } from "lucide-react";
import { allMenuSections, allMenuItems, type MenuItem, type MenuTag } from "@/lib/menu-data";
import { useSelection } from "@/hooks/use-selection";
import { Reveal } from "@/components/Reveal";

type FilterState = {
  tags: MenuTag[];
  search: string;
};

const FILTER_CHIPS: { tag: MenuTag; label: string }[] = [
  { tag: "hearty", label: "Сытные" },
  { tag: "sweet", label: "Сладкие" },
  { tag: "vegetarian", label: "Без мяса" },
  { tag: "spicy", label: "Острые" },
  { tag: "under-10", label: "До 10 BYN" },
  { tag: "under-15", label: "До 15 BYN" },
  { tag: "popular", label: "Популярные" },
];

export function MenuView() {
  const [filters, setFilters] = useState<FilterState>({ tags: [], search: "" });
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
      if (filters.tags.length > 0) {
        const hasTag = filters.tags.some((tag) => item.tags.includes(tag));
        if (!hasTag) return false;
      }
      return true;
    });
  }, [filters]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};
    filteredItems.forEach((item) => {
      const section = allMenuSections.find((s) => s.id === item.category);
      const key = section?.title || item.category;
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    return groups;
  }, [filteredItems]);

  const toggleTag = useCallback((tag: MenuTag) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ tags: [], search: "" });
  }, []);

  const handleAddItem = useCallback(
    (item: MenuItem) => {
      addItem(item);
    },
    [addItem],
  );

  const isSelected = (id: number) => selectedItems.has(id);
  const getQuantity = (id: number) => selectedItems.get(id)?.quantity || 0;

  const hasActiveFilters = filters.tags.length > 0 || filters.search.length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-16 z-40 bg-ink/95 backdrop-blur-md border-b border-cream/10 px-5 py-3 sm:top-14">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40 size-4" />
            <input
              type="search"
              placeholder="Поиск по названию..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2.5 bg-cream/5 border border-cream/20 rounded-lg text-cream placeholder-cream/40 text-sm focus:outline-none focus:border-accent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTER_CHIPS.map(({ tag, label }) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 text-[0.65rem] tracking-[0.1em] uppercase rounded-full border transition-all ${
                  filters.tags.includes(tag)
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-cream/20 text-cream/70 hover:border-cream/40 hover:bg-cream/5"
                }`}
              >
                {label}
              </button>
            ))}
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
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 pb-32">
        {Object.entries(groupedItems).map(([sectionTitle, items], sectionIndex) => (
          <Reveal key={sectionTitle} delay={sectionIndex * 50}>
            <h3 className="font-display text-xl leading-none mb-4 pb-2 border-b border-cream/10">
              {sectionTitle}
            </h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  isExpanded={expandedId === item.id}
                  isSelected={isSelected(item.id)}
                  quantity={getQuantity(item.id)}
                  onToggleExpand={() =>
                    setExpandedId((prev) => (prev === item.id ? null : item.id))
                  }
                  onAdd={handleAddItem}
                  onRemove={removeItem}
                  onUpdateQty={updateQuantity}
                />
              ))}
            </ul>
          </Reveal>
        ))}

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-cream/50">
            <p className="text-sm">Ничего не найдено. Попробуйте сменить фильтры.</p>
          </div>
        )}
      </div>

      {totalCount > 0 ? (
        <SelectionBar
          totalCount={totalCount}
          totalPrice={totalPrice}
          onOpen={() => {}}
          items={getSelectionForDisplay()}
          onClose={close}
        />
      ) : null}
    </div>
  );
}

function MenuItemCard({
  item,
  isExpanded,
  isSelected,
  quantity,
  onToggleExpand,
  onAdd,
  onRemove,
  onUpdateQty,
}: {
  item: MenuItem;
  isExpanded: boolean;
  isSelected: boolean;
  quantity: number;
  onToggleExpand: () => void;
  onAdd: (item: MenuItem) => void;
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, qty: number) => void;
}) {
  const shortDesc = item.name.split(",").slice(0, 3).join(", ");

  return (
    <li className="group relative bg-cream/3 border border-cream/10 rounded-lg overflow-hidden transition-all">
      <button
        type="button"
        onClick={onToggleExpand}
        className="w-full p-4 flex items-start gap-3 text-left"
        aria-expanded={isExpanded}
      >
        <span className="shrink-0 font-display text-xl tabular-nums text-accent font-bold leading-none">
          {item.id}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-ink leading-snug pr-8">{shortDesc}</p>
          {isExpanded && item.desc && (
            <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink/60">{item.desc}</p>
          )}
          {isExpanded && item.volume && (
            <p className="mt-1 text-[0.7rem] tracking-widest uppercase text-ink/40">
              {item.volume}
            </p>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="font-display text-lg tabular-nums text-ink">{item.price} BYN</span>
          {isSelected ? (
            <QuantityControl
              quantity={quantity}
              onIncrement={() => onUpdateQty(item.id, quantity + 1)}
              onDecrement={() => onUpdateQty(item.id, quantity - 1)}
            />
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAdd(item);
              }}
              className="btn-primary !px-4 !py-2 text-sm"
            >
              <Plus className="size-4" />
            </button>
          )}
          <ChevronDown
            className={`size-4 text-ink/40 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-cream/10 px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-wrap gap-2 mt-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[0.6rem] tracking-[0.1em] uppercase bg-cream/10 border border-cream/20 rounded text-ink/60"
              >
                {tagLabel(tag)}
              </span>
            ))}
          </div>
        </div>
      )}
    </li>
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

function SelectionBar({
  totalCount,
  totalPrice,
  onOpen,
  items,
  onClose,
}: {
  totalCount: number;
  totalPrice: number;
  onOpen: () => void;
  items: { item: MenuItem; quantity: number }[];
  onClose: () => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-300 bg-ink border-t border-cream/10">
      <div className="mx-auto max-w-6xl px-5 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="font-display text-lg text-cream">
              Мой выбор — {totalCount} {pluralize(totalCount, "позиция", "позиции", "позиций")}
            </span>
            <span className="text-cream/60 text-sm">·</span>
            <span className="font-display text-lg text-accent">
              {totalPrice.toFixed(2).replace(".", ",")} BYN
            </span>
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="btn-primary !px-6 !py-2.5 w-full sm:w-auto"
          >
            Показать на кассе
          </button>
        </div>
      </div>
    </div>
  );
}

function DrinkSuggestionSheet({
  blinId,
  drinks,
  onAdd,
  onClose,
}: {
  blinId: number;
  drinks: MenuItem[];
  onAdd: (item: MenuItem) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} />
      <div
        className="relative w-full max-w-md mx-auto bg-ink border-t border-cream/10 rounded-t-2xl p-6 animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl text-cream">К этому часто берут…</h3>
          <button type="button" onClick={onClose} className="text-cream/50 hover:text-cream p-1">
            <X className="size-5" />
          </button>
        </div>
        <p className="text-sm text-cream/60 mb-4">
          Выберите напиток, который отлично подойдёт к вашему блину:
        </p>
        <div className="space-y-3">
          {drinks.slice(0, 3).map((drink) => (
            <button
              key={drink.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAdd(drink);
                onClose();
              }}
              className="w-full flex items-center justify-between gap-4 p-3 bg-cream/3 border border-cream/10 rounded-lg text-left hover:bg-cream/5 transition-colors"
            >
              <div>
                <p className="font-medium text-cream">{drink.name}</p>
                {drink.volume && <p className="text-[0.75rem] text-cream/50">{drink.volume}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg text-accent">{drink.price} BYN</span>
                <Plus className="size-4 text-cream/50" />
              </div>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full text-center text-sm text-cream/50 hover:text-cream"
        >
          Не сейчас
        </button>
      </div>
    </div>
  );
}

function pluralize(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

function tagLabel(tag: MenuTag): string {
  const labels: Record<MenuTag, string> = {
    hearty: "Сытный",
    sweet: "Сладкий",
    vegetarian: "Без мяса",
    "with-meat": "С мясом",
    spicy: "Острый",
    fish: "С рыбой",
    popular: "Популярный",
    "under-10": "До 10 BYN",
    "under-15": "До 15 BYN",
    "under-20": "До 20 BYN",
  };
  return labels[tag] || tag;
}
