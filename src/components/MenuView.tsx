"use client";

import { useState, useMemo, useCallback } from "react";
import { Filter, X, ChevronDown, Plus, Sparkles } from "lucide-react";
import { allMenuItems, type MenuItem } from "@/lib/menu-data";
import { useSelection } from "@/hooks/use-selection";
import { QuantityControl } from "@/components/QuantityControl";
import { CartSheet } from "@/components/CartSheet";
import { QuizPicker } from "@/components/QuizPicker";

type FilterState = {
  search: string;
  chips: string[];
};

const PAGE_SIZE = 15;

type ChipDef = {
  key: string;
  label: string;
  test: (item: MenuItem) => boolean;
};

const FILTER_CHIPS: ChipDef[] = [
  {
    key: "savory",
    label: "Сытные",
    test: (item) => item.category === "savory" || item.category === "spinach",
  },
  { key: "sweet", label: "Сладкие", test: (item) => item.tags.includes("sweet") },
  {
    key: "vegetarian",
    label: "Вегетарианские",
    test: (item) => item.tags.includes("vegetarian"),
  },
  { key: "fish", label: "С рыбой", test: (item) => item.tags.includes("fish") },
  { key: "meat", label: "С мясом", test: (item) => item.tags.includes("with-meat") },
  { key: "spicy", label: "Острые", test: (item) => item.tags.includes("spicy") },
  {
    key: "popular",
    label: "Хиты",
    test: (item) => item.popular === true || item.tags.includes("popular"),
  },
  { key: "syrniki", label: "Сырники", test: (item) => item.category === "syrniki" },
  { key: "soup", label: "Суп", test: (item) => item.category === "soups" },
  { key: "coffee", label: "Кофе", test: (item) => item.category === "coffee" },
  {
    key: "drinks",
    label: "Напитки",
    test: (item) => item.category === "house-drinks" || item.category === "drinks",
  },
  { key: "under-10", label: "до 10 BYN", test: (item) => item.priceNum <= 10 },
  { key: "under-15", label: "до 15 BYN", test: (item) => item.priceNum <= 15 },
];

const CHIP_MAP = new Map(FILTER_CHIPS.map((chip) => [chip.key, chip]));

const normalize = (value: string) =>
  value.toLowerCase().replace(/ё/g, "е").replace(/[ії]/g, "и").replace(/\s+/g, " ").trim();

const toWords = (value: string) => normalize(value).split(" ").filter(Boolean);

const matchesSearch = (item: MenuItem, words: string[]) => {
  if (words.length === 0) return true;
  const haystack = normalize(`${item.name} ${item.desc ?? ""} ${item.volume ?? ""}`);
  return words.every((word) => haystack.includes(word));
};

export function MenuView() {
  const [filters, setFilters] = useState<FilterState>({ search: "", chips: [] });
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [cartOpen, setCartOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const {
    selectedItems,
    addItem,
    removeItem,
    updateQuantity,
    clearSelection,
    totalCount,
    totalPrice,
    getSelectionForDisplay,
  } = useSelection();

  const filteredItems = useMemo(() => {
    const words = toWords(filters.search);
    const tests = filters.chips
      .map((key) => CHIP_MAP.get(key)?.test)
      .filter((test): test is (item: MenuItem) => boolean => Boolean(test));
    return allMenuItems.filter(
      (item) => matchesSearch(item, words) && tests.every((test) => test(item)),
    );
  }, [filters]);

  const hasActiveFilters = filters.search.length > 0 || filters.chips.length > 0;

  const clearFilters = useCallback(() => {
    setFilters({ search: "", chips: [] });
    setVisibleCount(PAGE_SIZE);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
    setVisibleCount(PAGE_SIZE);
  }, []);

  const toggleChip = useCallback((key: string) => {
    setFilters((prev) => ({
      ...prev,
      chips: prev.chips.includes(key)
        ? prev.chips.filter((chip) => chip !== key)
        : [...prev.chips, key],
    }));
    setVisibleCount(PAGE_SIZE);
  }, []);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const remainingCount = filteredItems.length - visibleItems.length;

  const showMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  const handleAddItem = useCallback(
    (item: MenuItem) => {
      addItem(item);
    },
    [addItem],
  );

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openQuiz = useCallback(() => setQuizOpen(true), []);
  const closeQuiz = useCallback(() => setQuizOpen(false), []);
  const showCartFromQuiz = useCallback(() => {
    setQuizOpen(false);
    setCartOpen(true);
  }, []);

  const isSelected = (id: number) => selectedItems.has(id);
  const getQuantity = (id: number) => selectedItems.get(id)?.quantity || 0;

  return (
    <div className="flex flex-col min-h-0">
      <div className="bg-ink/95 backdrop-blur-md border-b border-cream/10 px-5 py-3">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40 size-4" />
            <input
              type="search"
              placeholder="Поиск по блинам..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-cream/5 border border-cream/20 rounded-lg text-cream placeholder-cream/40 text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
            {FILTER_CHIPS.map((chip) => {
              const active = filters.chips.includes(chip.key);
              return (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() => toggleChip(chip.key)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-[0.68rem] tracking-[0.08em] uppercase transition ${
                    active
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-cream/20 text-cream/55 hover:border-cream/50 hover:text-cream"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-[0.65rem] tracking-[0.1em] uppercase text-cream/40">
                Найдено: {filteredItems.length}
              </span>
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[0.65rem] tracking-[0.1em] uppercase text-cream/50 hover:text-cream"
              >
                <X className="size-3.5" />
                Сбросить
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 pb-44">
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-ink/50">
            <p className="text-sm">Ничего не найдено. Попробуйте сменить поиск или фильтры.</p>
          </div>
        )}

        {filteredItems.length > 0 && (
          <p className="mb-4 text-xs text-ink/50">
            Показано {visibleItems.length} из {filteredItems.length}
          </p>
        )}

        <div className="space-y-4">
          {visibleItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-cream/3 border border-cream/10 rounded-lg overflow-hidden transition-all animate-in fade-in slide-in-from-top-2 duration-200"
              style={{ animationDelay: `${(index % PAGE_SIZE) * 30}ms` }}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => setExpandedId((prev) => (prev === item.id ? null : item.id))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedId((prev) => (prev === item.id ? null : item.id));
                  }
                }}
                className="w-full cursor-pointer p-4 flex items-start gap-3 text-left"
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
                    <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink/60">{item.desc}</p>
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
              </div>

              {expandedId === item.id && (
                <div className="border-t border-cream/10 px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-sm text-ink/60">ID: {item.id}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {remainingCount > 0 && (
          <button type="button" onClick={showMore} className="btn-primary mt-6 w-full !px-6 !py-3">
            Показать ещё ({remainingCount})
          </button>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50">
        {totalCount > 0 ? (
          <div className="pointer-events-auto border-t border-cream/10 bg-ink animate-in slide-in-from-bottom-4 duration-300">
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
                  onClick={openCart}
                  className="btn-primary !px-6 !py-2.5 w-full sm:w-auto"
                >
                  Показать на кассе
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div
          className={`pointer-events-none flex justify-end px-4 pb-4 pt-3 ${
            totalCount > 0 ? "bg-ink" : ""
          }`}
        >
          <button
            type="button"
            onClick={openQuiz}
            className="btn-primary pointer-events-auto shadow-soft !px-5 !py-2.5"
          >
            <Sparkles className="size-4" />
            Подобрать блин
          </button>
        </div>
      </div>

      <CartSheet
        open={cartOpen}
        onClose={closeCart}
        items={getSelectionForDisplay()}
        totalCount={totalCount}
        totalPrice={totalPrice}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        onClear={clearSelection}
      />

      <QuizPicker
        open={quizOpen}
        onClose={closeQuiz}
        onShowCart={showCartFromQuiz}
        onAdd={handleAddItem}
        updateQuantity={updateQuantity}
        selectedItems={selectedItems}
        totalCount={totalCount}
      />
    </div>
  );
}
