import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Plus, RotateCcw, X } from "lucide-react";
import { allMenuItems, type MenuItem } from "@/lib/menu-data";
import type { SelectedItem } from "@/hooks/use-selection";
import { useModalEffects } from "@/hooks/use-modal";
import { QuantityControl } from "@/components/QuantityControl";

type Question = {
  id: string;
  title: string;
  hint?: string;
  answer: (item: MenuItem) => string;
  order?: string[];
};

const courseOf = (item: MenuItem): string => {
  switch (item.category) {
    case "savory":
      return "Сытные";
    case "spinach":
      return "На шпинатном тесте";
    case "fish":
      return "С рыбой";
    case "vegetarian":
      return "Вегетарианские";
    case "sweet":
    case "syrniki":
      return "Сладкие";
    case "soups":
      return "Суп дня";
    case "coffee":
      return "Кофе";
    case "house-drinks":
      return "Домашние напитки";
    case "drinks":
      return "Напитки";
    default:
      return "Другое";
  }
};

const fillingOf = (item: MenuItem): string => {
  const name = item.name.toLowerCase();
  if (name.includes("куриц")) return "Курица";
  if (name.includes("индейк")) return "Индейка";
  if (name.includes("ягнят") || name.includes("wagyu")) return "Ягнятина";
  if (
    name.includes("бекон") ||
    name.includes("пепперони") ||
    name.includes("колбас") ||
    name.includes("мортаделл")
  ) {
    return "Свинина";
  }
  if (name.includes("лосось") || name.includes("тунец")) return "Рыба";
  if (name.includes("гриб")) return "Грибы";
  return "Без мяса";
};

const QUESTIONS: Question[] = [
  {
    id: "course",
    title: "Что хотите попробовать?",
    hint: "Выберите категорию",
    answer: courseOf,
    order: [
      "Сытные",
      "На шпинатном тесте",
      "С рыбой",
      "Вегетарианские",
      "Сладкие",
      "Суп дня",
      "Кофе",
      "Домашние напитки",
      "Напитки",
    ],
  },
  {
    id: "filling",
    title: "Какая начинка внутри?",
    answer: fillingOf,
    order: ["Курица", "Индейка", "Свинина", "Ягнятина", "Рыба", "Грибы", "Без мяса"],
  },
  {
    id: "spicy",
    title: "Любите острое?",
    answer: (item) => (item.tags.includes("spicy") ? "Да, острое" : "Нет, без острого"),
    order: ["Да, острое", "Нет, без острого"],
  },
  {
    id: "budget",
    title: "Какой бюджет?",
    answer: (item) =>
      item.priceNum <= 10 ? "До 10 BYN" : item.priceNum <= 15 ? "До 15 BYN" : "Более 15 BYN",
    order: ["До 10 BYN", "До 15 BYN", "Более 15 BYN"],
  },
  {
    id: "popular",
    title: "Взять проверенное?",
    answer: (item) => (item.popular || item.tags.includes("popular") ? "Да, хит" : "Любое"),
    order: ["Да, хит", "Любое"],
  },
];

const QUESTION_MAP = new Map(QUESTIONS.map((question) => [question.id, question]));

const sortOptions = (question: Question, options: string[]): string[] => {
  if (!question.order) return options;
  return [...options].sort((a, b) => {
    const indexA = question.order?.indexOf(a) ?? -1;
    const indexB = question.order?.indexOf(b) ?? -1;
    return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
  });
};

type QuizPickerProps = {
  open: boolean;
  onClose: () => void;
  onShowCart: () => void;
  onAdd: (item: MenuItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  selectedItems: Map<number, SelectedItem>;
  totalCount: number;
};

export function QuizPicker({
  open,
  onClose,
  onShowCart,
  onAdd,
  updateQuantity,
  selectedItems,
  totalCount,
}: QuizPickerProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useModalEffects(open, onClose);

  useEffect(() => {
    if (open) setAnswers({});
  }, [open]);

  const answerEntries = Object.entries(answers);

  const remaining = useMemo(() => {
    const entries = Object.entries(answers);
    if (entries.length === 0) return allMenuItems;
    return allMenuItems.filter((item) =>
      entries.every(([questionId, value]) => QUESTION_MAP.get(questionId)?.answer(item) === value),
    );
  }, [answers]);

  const activeQuestions = useMemo(() => {
    return QUESTIONS.filter((question) => {
      if (answers[question.id]) return false;
      if (remaining.length <= 1) return false;
      return new Set(remaining.map((item) => question.answer(item))).size > 1;
    });
  }, [remaining, answers]);

  if (!open) return null;

  const current = activeQuestions[0];
  const answeredCount = answerEntries.length;

  const answer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const back = () => {
    setAnswers((prev) => {
      const keys = Object.keys(prev);
      const lastKey = keys[keys.length - 1];
      if (!lastKey) return prev;
      const next = { ...prev };
      delete next[lastKey];
      return next;
    });
  };

  const reset = () => setAnswers({});

  const options = current
    ? sortOptions(current, Array.from(new Set(remaining.map((item) => current.answer(item)))))
    : [];

  const counts = new Map<string, number>();
  if (current) {
    for (const item of remaining) {
      const key = current.answer(item);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  return (
    <div className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative flex max-h-[90svh] w-full max-w-lg animate-in slide-in-from-bottom duration-300 flex-col overflow-hidden rounded-t-2xl border border-border bg-cream text-ink shadow-soft sm:rounded-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <p className="eyebrow">Быстрый подбор</p>
            <h3 className="font-display mt-1.5 text-2xl leading-none">Найдём ваш блин</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть подбор"
            className="rounded-full border border-border p-2 text-ink/60 transition hover:text-ink"
          >
            <X className="size-4" />
          </button>
        </header>

        {!current ? (
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
              Готово
            </p>
            <h4 className="font-display mt-2 text-2xl leading-tight">
              {remaining.length === 0
                ? "Ничего не нашлось"
                : remaining.length === 1
                  ? "Вот ваша позиция"
                  : `Подошло: ${remaining.length}`}
            </h4>

            <div className="mt-4 max-h-[44svh] space-y-3 overflow-y-auto pr-1">
              {remaining.map((item) => {
                const selected = selectedItems.get(item.id);
                return (
                  <div key={item.id} className="rounded-lg border border-border bg-card p-3">
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
                        {item.price} BYN
                      </span>
                    </div>
                    <div className="mt-3 flex justify-end">
                      {selected ? (
                        <QuantityControl
                          quantity={selected.quantity}
                          onIncrement={() => updateQuantity(item.id, selected.quantity + 1)}
                          onDecrement={() => updateQuantity(item.id, selected.quantity - 1)}
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => onAdd(item)}
                          className="btn-primary !px-4 !py-2 !text-xs"
                        >
                          <Plus className="size-4" />
                          Добавить
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col gap-2">
              {totalCount > 0 ? (
                <button type="button" onClick={onShowCart} className="btn-primary w-full !py-3">
                  Показать на кассе
                </button>
              ) : null}
              <div className="flex gap-2">
                <button type="button" onClick={reset} className="btn-ghost flex-1 !py-2.5 !text-xs">
                  <RotateCcw className="size-4" />
                  Заново
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-ghost flex-1 !py-2.5 !text-xs"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {answeredCount > 0 ? (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={back}
                  className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground transition hover:text-ink"
                >
                  <ArrowLeft className="size-3" />
                  Назад
                </button>
                {answerEntries.map(([questionId, value]) => (
                  <button
                    key={questionId}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => {
                        const next = { ...prev };
                        delete next[questionId];
                        return next;
                      })
                    }
                    className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-ink/70 transition hover:border-accent hover:text-ink"
                  >
                    {value}
                  </button>
                ))}
              </div>
            ) : null}

            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
              Вопрос {answeredCount + 1}
            </p>
            <h4 className="font-display mt-2 text-2xl leading-tight">{current.title}</h4>
            {current.hint ? (
              <p className="mt-1 text-sm text-muted-foreground">{current.hint}</p>
            ) : null}

            <div className="mt-5 space-y-2">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => answer(current.id, option)}
                  className="flex w-full animate-in fade-in slide-in-from-bottom-2 duration-200 items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left transition hover:border-accent hover:bg-accent/10"
                >
                  <span className="text-sm font-semibold">{option}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {counts.get(option) ?? 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
