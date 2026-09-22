import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { MenuBlock } from "@/components/MenuBlock";
import { Reveal } from "@/components/Reveal";
import {
  contacts,
  coffee,
  drinks,
  fishPancakes,
  houseDrinks,
  savoryPancakes,
  soups,
  spinachPancakes,
  sweetPancakes,
  syrniki,
  vegetarianPancakes,
} from "@/lib/menu-data";

import heroAsset from "@/assets/hero.jpg";
import foodAsset from "@/assets/food.jpg";
import interiorAsset from "@/assets/interior.jpg";
import sweetPancake from "@/assets/sweet.jpg";

const heroUrl = heroAsset;
const foodUrl = foodAsset;
const interiorUrl = interiorAsset;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Блiнцы — блинная на Октябрьской в Минске" },
      {
        name: "description",
        content: "Блiнцы на Октябрьской, 23 в Минске. Большие блины с сытными и сладкими начинками, меню, часы работы и контакты.",
      },
      { property: "og:title", content: "Блiнцы — блинная на Октябрьской" },
      { property: "og:description", content: "Большие блины с десятками начинок в самом сердце Октябрьской улицы." },
      { property: "og:type", content: "restaurant.restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Блiнцы",
          address: {
            "@type": "PostalAddress",
            streetAddress: "улица Октябрьская, 23",
            addressLocality: "Минск",
            postalCode: "220030",
            addressCountry: "BY",
          },
          telephone: "+375296634088",
          openingHours: ["Mo-Th 11:00-23:00", "Fr-Sa 11:00-00:00", "Su 11:00-23:00"],
          servesCuisine: ["Блины", "Белорусская кухня", "Европейская кухня"],
          sameAs: contacts.instagram,
        }),
      },
    ],
  }),
});

const navLinks = [
  { href: "#about", label: "О нас" },
  { href: "#menu", label: "Меню" },
  { href: "#place", label: "Место" },
  { href: "#visit", label: "Контакты" },
];

type Tab = "savory" | "spinach" | "sweet" | "drinks";

function Index() {
  const [tab, setTab] = useState<Tab>("savory");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="overflow-x-hidden">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-cream/10 bg-ink/90 text-cream backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <a href="#top" className="font-display text-2xl uppercase">Блiнцы</a>
          <nav className="hidden items-center gap-8 text-[0.7rem] tracking-[0.2em] uppercase sm:flex">
            {navLinks.map((link) => <a key={link.href} href={link.href} className="opacity-70 transition hover:opacity-100">{link.label}</a>)}
            <a href={contacts.mapUrl} target="_blank" rel="noreferrer" className="btn-primary !px-6 !py-2.5">Прийти поесть</a>
          </nav>
          <button type="button" aria-label="Меню навигации" onClick={() => setMenuOpen((value) => !value)} className="text-[0.7rem] tracking-[0.2em] uppercase sm:hidden">
            {menuOpen ? "Закрыть" : "Меню"}
          </button>
        </div>
        {menuOpen ? (
          <nav className="flex flex-col gap-4 border-t border-cream/10 px-5 py-5 text-sm tracking-[0.14em] uppercase sm:hidden">
            {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
            <a href={contacts.mapUrl} target="_blank" rel="noreferrer" className="btn-primary">Построить маршрут</a>
          </nav>
        ) : null}
      </header>

      <main>
        <section id="top" className="relative flex min-h-[92svh] items-end overflow-hidden">
          <img src={heroUrl} alt="Блины с начинкой в кафе Блiнцы" width={1080} height={882} className="animate-slow-pan absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15" />
          <div className="relative mx-auto w-full max-w-6xl px-5 pt-32 pb-14 text-cream sm:pb-20">
            <Reveal>
              <p className="eyebrow !text-cream/65">Блинная · Октябрьская, 23</p>
              <h1 className="font-display mt-5 max-w-4xl text-[3.8rem] leading-[0.9] uppercase sm:text-8xl">Блiнцы</h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/80">Большие тонкие блины на сковородке, щедрые начинки и десятки сочетаний — от сытной классики с курицей и грибами до сладких вариантов с фруктами и сгущёнкой.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#menu" className="btn-primary">Смотреть меню</a>
                <a href={contacts.mapUrl} target="_blank" rel="noreferrer" className="btn-ghost">Построить маршрут</a>
              </div>
              <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-5 border-t border-cream/20 pt-6 text-xs sm:grid-cols-3">
                <div><dt className="eyebrow !text-cream/50">Адрес</dt><dd className="mt-2">Октябрьская, 23</dd></div>
                <div><dt className="eyebrow !text-cream/50">Сегодня</dt><dd className="mt-2">с 11:00</dd></div>
                <div><dt className="eyebrow !text-cream/50">Телефон</dt><dd className="mt-2"><a href={contacts.phoneHref}>{contacts.phone}</a></dd></div>
              </dl>
            </Reveal>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <p className="eyebrow">Главное — блин</p>
              <h2 className="mt-5 text-4xl leading-[1.05] sm:text-6xl">Один блин.<br />Много характеров.</h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">Здесь тонкое тесто на сковородке становится полноценным обедом. Курица, бекон, грибы, сыры, овощи и яркие соусы собираются в большие сытные блины. Есть варианты на шпинатном тесте, сладкие блины с ягодами и сгущёнкой, кофе и лимонады.</p>
              <div className="mt-9 border-l-2 border-accent pl-5 text-sm leading-relaxed"><strong>Формат простой:</strong> выбрать начинку, взять горячий блин и остаться в зале или продолжить прогулку по Октябрьской.</div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              <Reveal className="hover-zoom col-span-2" delay={80}><img src={foodUrl} alt="Блин с начинкой в Блiнцах" loading="lazy" width={1200} height={800} className="h-72 w-full object-cover sm:h-96" /></Reveal>
              <Reveal className="hover-zoom" delay={150}><img src={sweetPancake} alt="Сладкий блин с фруктовой начинкой" loading="lazy" width={1200} height={800} className="h-48 w-full object-cover sm:h-60" /></Reveal>
              <Reveal className="hover-zoom" delay={220}><img src={interiorUrl} alt="Интерьер кафе Блiнцы на Октябрьской" loading="lazy" width={1200} height={800} className="h-48 w-full object-cover sm:h-60" /></Reveal>
            </div>
          </div>
        </section>

        <section id="menu" className="surface-dark py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal className="max-w-2xl">
              <p className="eyebrow !text-cream/50">Что выбрать</p>
              <h2 className="mt-5 text-4xl leading-[1.05] sm:text-6xl">Меню «Блiнцов»</h2>
              <p className="mt-5 text-sm leading-relaxed text-cream/60">Показываем популярные позиции из меню. Актуальные цены и наличие уточняйте в кафе — блiнцы печут на сковородке прямо при заказе.</p>
            </Reveal>
            <div className="mt-10 flex flex-wrap gap-2">
              {([['savory', 'Сытные'], ['spinach', 'Шпинатное тесто'], ['sweet', 'Сладкие и сырники'], ['drinks', 'Напитки']] as [Tab, string][]).map(([key, label]) => (
                <button key={key} type="button" onClick={() => setTab(key)} aria-pressed={tab === key} className={`border px-5 py-2.5 text-[0.7rem] tracking-[0.16em] uppercase transition ${tab === key ? "border-accent bg-accent text-accent-foreground" : "border-cream/25 text-cream/70 hover:text-cream"}`}>{label}</button>
              ))}
            </div>
            <div key={tab} className="animate-in fade-in slide-in-from-bottom-4 mt-8 duration-700">
              {tab === "savory" ? <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"><MenuBlock section={savoryPancakes} dark /><img src={foodUrl} alt="Большой блин с сытной начинкой" loading="lazy" className="h-full min-h-80 w-full object-cover" /></div> : null}
              {tab === "spinach" ? <div className="grid gap-6 lg:grid-cols-2"><MenuBlock section={spinachPancakes} dark /><MenuBlock section={fishPancakes} dark /></div> : null}
              {tab === "sweet" ? <div className="grid gap-6 lg:grid-cols-2"><MenuBlock section={sweetPancakes} dark /><div className="space-y-6"><MenuBlock section={syrniki} dark /><MenuBlock section={soups} dark /></div></div> : null}
              {tab === "drinks" ? <div className="grid gap-6 lg:grid-cols-3"><MenuBlock section={coffee} dark /><MenuBlock section={houseDrinks} dark /><MenuBlock section={drinks} dark /></div> : null}
            </div>
          </div>
        </section>

        <section id="place" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <p className="eyebrow">На Октябрьской</p>
              <h2 className="mt-5 text-4xl leading-[1.05] sm:text-6xl">Городской ритм снаружи. Горячий блин внутри.</h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">«Блiнцы» находятся на Октябрьской улице — в индустриальном квартале со стрит-артом. Внутри — лаконичный зал с деревом и графикой, пахнет горячими блинами и кофе. В тёплый сезон работает посадка на улице.</p>
            </Reveal>
            <Reveal className="hover-zoom" delay={100}><img src={interiorUrl} alt="Зал кафе Блiнцы" loading="lazy" width={1200} height={800} className="h-80 w-full object-cover sm:h-[30rem]" /></Reveal>
          </div>
        </section>

        <section id="visit" className="surface-dark py-24 sm:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <Reveal>
              <p className="eyebrow !text-cream/50">Заходите</p>
              <h2 className="mt-5 max-w-2xl text-5xl leading-[0.98] sm:text-7xl">Блины лучше есть горячими, с руками.</h2>
              <div className="mt-9 flex flex-wrap gap-3"><a href={contacts.mapUrl} target="_blank" rel="noreferrer" className="btn-primary">Построить маршрут</a><a href={contacts.phoneHref} className="btn-ghost">Позвонить</a></div>
            </Reveal>
            <Reveal delay={120}>
              <dl className="space-y-7 border-l border-cream/20 pl-7 text-sm">
                <div><dt className="eyebrow !text-cream/50">Адрес</dt><dd className="mt-2">{contacts.address}</dd></div>
                <div><dt className="eyebrow !text-cream/50">Часы работы</dt><dd className="mt-2">{contacts.hours}</dd></div>
                <div><dt className="eyebrow !text-cream/50">Контакты</dt><dd className="mt-2"><a href={contacts.phoneHref}>{contacts.phone}</a></dd><dd className="mt-2"><a href={contacts.instagram} target="_blank" rel="noreferrer">{contacts.instagramHandle}</a></dd></div>
              </dl>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p className="font-display text-2xl uppercase text-foreground">Блiнцы</p><p>{contacts.address}</p><a href={contacts.instagram} target="_blank" rel="noreferrer">{contacts.instagramHandle}</a></div>
      </footer>
    </div>
  );
}