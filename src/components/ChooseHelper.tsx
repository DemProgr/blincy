"use client";

import { useState, useMemo } from "react";
import { X, Check, ChevronRight, Sparkles, Utensils, Coffee, Leaf, Flame } from "lucide-react";
import { allMenuItems, type MenuItem, type MenuTag } from "@/lib/menu-data";
import { Reveal } from "@/components/Reveal";

type Step = "taste" | "meat" | "spice" | "results";

const STEPS: { id: Step; question: string; icon: React.ReactNode }[] = [
  { id: "taste", question: "Сытный или сладкий?", icon: <Utensils className="size-5" /> },
  { id: "meat", question: "С мясом или без?", icon: <Leaf className="size-5" /> },
  { id: "spice", question: "Острый или обычный?", icon: <Flame className="size-5" /> },
];

type Answer = "hearty" | "sweet" | "with-meat" | "vegetarian" | "spicy" | "mild" | "any";

const OPTIONS: Record<Step, { value: Answer; label: string; icon?: React.ReactNode }[]> = {
  taste: [
    { value: "hearty", label: "Сытный", icon: <Utensils className="size-4" /> },
    { value: "sweet", label: "Сладкий", icon: <Coffee className="size-4" /> },
  ],
  meat: [
    { value: "with-meat", label: "С мясом" },
    { value: "vegetarian", label: "Без мяса" },
    { value: "any", label: "Неважно" },
  ],
  spice: [
    { value: "spicy", label: "Острый" },
    { value: "mild", label: "Обычный" },
    { value: "any", label: "Неважно" },
  ],
  results: [],
};

export function ChooseHelper({
  onClose,
  onAddItem,
}: {
  onClose: () => void;
  onAddItem: (item: MenuItem) => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<Step, Answer>>>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentStep = STEPS[stepIndex];

  const filteredResults = useMemo(() => {
    if (!isComplete) return [];

    return allMenuItems
      .filter((item) => {
        if (
          item.category === "coffee" ||
          item.category === "house-drinks" ||
          item.category === "drinks"
        ) {
          return false;
        }

        const tasteAnswer = answers.taste;
        const meatAnswer = answers.meat;
        const spiceAnswer = answers.spice;

        if (tasteAnswer === "hearty" && item.tags.includes("sweet")) return false;
        if (tasteAnswer === "sweet" && !item.tags.includes("sweet")) return false;

        if (meatAnswer === "with-meat" && !item.tags.includes("with-meat")) return false;
        if (meatAnswer === "vegetarian" && !item.tags.includes("vegetarian")) return false;

        if (spiceAnswer === "spicy" && !item.tags.includes("spicy")) return false;
        if (spiceAnswer === "mild" && item.tags.includes("spicy")) return false;

        return true;
      })
      .slice(0, 5);
  }, [answers, isComplete]);

  const handleAnswer = (value: Answer) => {
    const stepId = currentStep.id;
    setAnswers((prev) => ({ ...prev, [stepId]: value }));

    if (stepIndex < STEPS.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setStepIndex(0);
    setAnswers({});
    setIsComplete(false);
  };

  const progress = ((stepIndex + (isComplete ? 1 : 0)) / STEPS.length) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto bg-ink border border-cream/10 rounded-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-cream/10 bg-ink/95 backdrop-blur-sm rounded-t-2xl">
          <h2 className="font-display text-xl text-cream">Помоги выбрать</h2>
          <button type="button" onClick={onClose} className="text-cream/50 hover:text-cream p-1">
            <X className="size-5" />
          </button>
        </div>

        <div className="p-4 border-b border-cream/10 bg-ink/50">
          <div className="flex gap-1 h-2 bg-cream/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-cream/50 text-center">
            Шаг {isComplete ? STEPS.length : stepIndex + 1} из {STEPS.length}
          </p>
        </div>

        <div className="p-6">
          {isComplete ? (
            <ResultsView
              results={filteredResults}
              onAddItem={onAddItem}
              onRestart={handleRestart}
              onClose={onClose}
            />
          ) : (
            <QuestionView
              step={currentStep}
              options={OPTIONS[currentStep.id]}
              onAnswer={handleAnswer}
              onBack={handleBack}
              canGoBack={stepIndex > 0}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function QuestionView({
  step,
  options,
  onAnswer,
  onBack,
  canGoBack,
}: {
  step: { id: Step; question: string; icon: React.ReactNode };
  options: { value: Answer; label: string; icon?: React.ReactNode }[];
  onAnswer: (value: Answer) => void;
  onBack: () => void;
  canGoBack: boolean;
}) {
  return (
    <div className="space-y-4">
      <Reveal className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-4">
          {step.icon}
        </div>
        <h3 className="font-display text-2xl text-cream">{step.question}</h3>
        <p className="mt-2 text-sm text-cream/50">Нажми вариант, который ближе</p>
      </Reveal>

      <div className="grid grid-cols-1 gap-3" role="radiogroup" aria-label={step.question}>
        {options.map((option, index) => (
          <Reveal key={option.value} delay={index * 80}>
            <button
              type="button"
              onClick={() => onAnswer(option.value)}
              className="w-full flex items-center justify-between gap-4 p-4 bg-cream/3 border border-cream/10 rounded-xl text-left hover:bg-cream/5 hover:border-cream/20 transition-all active:scale-[0.98]"
              role="radio"
            >
              <div className="flex items-center gap-3">
                {option.icon && <span className="text-cream/60">{option.icon}</span>}
                <span className="font-medium text-cream">{option.label}</span>
              </div>
              <ChevronRight className="text-cream/30 size-5 shrink-0" />
            </button>
          </Reveal>
        ))}
      </div>

      {canGoBack && (
        <button
          type="button"
          onClick={onBack}
          className="w-full mt-4 text-sm text-cream/50 hover:text-cream"
        >
          Назад
        </button>
      )}
    </div>
  );
}

function ResultsView({
  results,
  onAddItem,
  onRestart,
  onClose,
}: {
  results: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onRestart: () => void;
  onClose: () => void;
}) {
  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <Sparkles className="size-12 mx-auto text-cream/30 mb-4" />
        <h3 className="font-display text-xl text-cream mb-2">Ничего не найдено</h3>
        <p className="text-cream/50 text-sm mb-6">Попробуй другие варианты или посмотри всё меню</p>
        <button type="button" onClick={onRestart} className="btn-primary w-full">
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Reveal className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-4">
          <Sparkles className="size-6" />
        </div>
        <h3 className="font-display text-2xl text-cream">Подобрали для тебя</h3>
        <p className="mt-2 text-sm text-cream/50">
          {results.length} варианта{results.length > 1 ? "ов" : ""}, которые точно понравятся
        </p>
      </Reveal>

      <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
        {results.map((item, index) => (
          <Reveal key={item.id} delay={index * 60}>
            <button
              type="button"
              onClick={() => {
                onAddItem(item);
                onClose();
              }}
              className="w-full flex items-center gap-4 p-4 bg-cream/3 border border-cream/10 rounded-xl text-left hover:bg-cream/5 hover:border-cream/20 transition-all"
            >
              <span className="shrink-0 font-display text-2xl tabular-nums text-accent font-bold leading-none w-10 text-center">
                {item.id}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ink leading-snug">
                  {item.name.split(",").slice(0, 3).join(", ")}
                </p>
                <p className="text-[0.75rem] text-ink/50 mt-0.5">{item.price} BYN</p>
              </div>
              <Check className="size-5 text-accent shrink-0" />
            </button>
          </Reveal>
        ))}
      </div>

      <div className="flex flex-col gap-3 pt-2 border-t border-cream/10">
        <button type="button" onClick={onRestart} className="btn-ghost w-full">
          Подобрать другие
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-cream/50 hover:text-cream text-center"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}
