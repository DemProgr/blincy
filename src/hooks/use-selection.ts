import { useState, useEffect, useCallback } from "react";
import type { MenuItem } from "@/lib/menu-data";

export type SelectedItem = {
  item: MenuItem;
  quantity: number;
};

const STORAGE_KEY = "blincy-selection";

export function useSelection() {
  const [selectedItems, setSelectedItems] = useState<Map<number, SelectedItem>>(new Map());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Array<[number, SelectedItem]>;
        setSelectedItems(new Map(parsed));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(selectedItems.entries())));
    } catch {
      // ignore
    }
  }, [selectedItems]);

  const totalCount = Array.from(selectedItems.values()).reduce((sum, s) => sum + s.quantity, 0);
  const totalPrice = Array.from(selectedItems.values()).reduce(
    (sum, s) => sum + s.item.priceNum * s.quantity,
    0,
  );

  const addItem = useCallback((item: MenuItem) => {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      const existing = next.get(item.id);
      if (existing) {
        next.set(item.id, { ...existing, quantity: existing.quantity + 1 });
      } else {
        next.set(item.id, { item, quantity: 1 });
      }
      return next;
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: number) => {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id);
        return;
      }
      setSelectedItems((prev) => {
        const next = new Map(prev);
        const existing = next.get(id);
        if (existing) {
          next.set(id, { ...existing, quantity });
        }
        return next;
      });
    },
    [removeItem],
  );

  const clearSelection = useCallback(() => {
    setSelectedItems(new Map());
    setIsOpen(false);
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const getSelectionForDisplay = useCallback((): SelectedItem[] => {
    return Array.from(selectedItems.values()).sort((a, b) => a.item.id - b.item.id);
  }, [selectedItems]);

  return {
    selectedItems,
    isOpen,
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearSelection,
    toggleOpen,
    close,
    getSelectionForDisplay,
  };
}
