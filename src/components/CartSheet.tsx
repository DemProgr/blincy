import { X, Trash2 } from "lucide-react";
import type { SelectedItem } from "@/hooks/use-selection";
import { useModalEffects } from "@/hooks/use-modal";
import { QuantityControl } from "@/components/QuantityControl";

type CartSheetProps = {
  open: boolean;
  onClose: () => void;
  items: SelectedItem[];
  totalCount: number;
  totalPrice: number;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  onClear: () => void;
};

export function CartSheet({
  open,
  onClose,
  items,
  totalCount,
  totalPrice,
  updateQuantity,
  removeItem,
  onClear,
}: CartSheetProps) {
  useModalEffects(open, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative flex max-h-[88svh] w-full max-w-lg animate-in slide-in-from-bottom duration-300 flex-col overflow-hidden rounded-t-2xl border border-border bg-cream text-ink shadow-soft sm:rounded-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <p className="eyebrow">Назовите номера на кассе</p>
            <h3 className="font-display mt-1.5 text-2xl leading-none">Корзина</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть корзину"
            className="rounded-full border border-border p-2 text-ink/60 transition hover:text-ink"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              <p>Пока пусто.</p>
              <p className="mt-2">Добавьте позиции из меню — они появятся здесь.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map(({ item, quantity }) => (
                <li key={item.id} className="rounded-lg border border-border bg-card p-3">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 font-display text-lg leading-none tabular-nums text-accent">
                      {item.id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-snug">{item.name}</p>
                      {item.volume ? (
                        <p className="mt-1 text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                          {item.volume}
                        </p>
                      ) : null}
                    </div>
                    <span className="shrink-0 font-display text-base tabular-nums">
                      {(item.priceNum * quantity).toFixed(2).replace(".", ",")} BYN
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <QuantityControl
                      quantity={quantity}
                      onIncrement={() => updateQuantity(item.id, quantity + 1)}
                      onDecrement={() => updateQuantity(item.id, quantity - 1)}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground transition hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" />
                      Убрать
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-border px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">Итого {totalCount} поз.</span>
            <span className="font-display text-xl tabular-nums">
              {totalPrice.toFixed(2).replace(".", ",")} BYN
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Назовите номера позиций на кассе — мы соберём заказ.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={onClear}
              disabled={items.length === 0}
              className="btn-ghost flex-1 !py-2.5 !text-xs disabled:opacity-40"
            >
              Очистить
            </button>
            <button type="button" onClick={onClose} className="btn-primary flex-1 !py-2.5 !text-xs">
              Готово
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
