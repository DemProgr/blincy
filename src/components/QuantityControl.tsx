import { Minus, Plus } from "lucide-react";

export function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
}: {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-cream/20 bg-cream/10 px-2 py-1">
      <button
        type="button"
        onClick={onDecrement}
        className="-m-0.5 p-0.5 text-ink/60 hover:text-ink"
        aria-label="Уменьшить"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="w-6 text-center font-display text-sm tabular-nums text-ink">{quantity}</span>
      <button
        type="button"
        onClick={onIncrement}
        className="-m-0.5 p-0.5 text-ink/60 hover:text-ink"
        aria-label="Увеличить"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
