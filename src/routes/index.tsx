import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { MapSelector } from "@/components/MapSelector";
import { MenuView } from "@/components/MenuView";
import { Reveal } from "@/components/Reveal";
import { contacts } from "@/lib/menu-data";

import heroAsset from "@/assets/hero.jpg";

const heroUrl = heroAsset;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Блiнцы — мобильное меню и быстрый выбор на Октябрьской" },
      {
        name: "description",
        content:
          "Мобильное меню Блiнцы на Октябрьской, 23. Выбери блин за 20 секунд: номера позиций, фильтры, подбор под вкус. Назови номер на кассе.",
      },
      { property: "og:title", content: "Блiнцы — мобильное меню и быстрый выбор" },
      {
        property: "og:description",
        content:
          "Удобное меню с номерами, фильтрами и подбором. Отсканируй QR → выбери → назови номер на кассе.",
      },
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
  { href: "#menu", label: "Меню" },
  { href: "#visit", label: "Контакты" },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="overflow-x-hidden">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-cream/10 bg-ink/90 text-cream backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <a href="#top" className="font-display text-2xl uppercase">
            Блiнцы
          </a>
          <nav className="hidden items-center gap-8 text-[0.7rem] tracking-[0.2em] uppercase sm:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="opacity-70 transition hover:opacity-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href={contacts.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary !px-6 !py-2.5"
            >
              Прийти поесть
            </a>
          </nav>
          <button
            type="button"
            aria-label="Меню навигации"
            onClick={() => setMenuOpen((value) => !value)}
            className="text-[0.7rem] tracking-[0.2em] uppercase sm:hidden"
          >
            {menuOpen ? "Закрыть" : "Меню"}
          </button>
        </div>
        {menuOpen ? (
          <nav className="flex flex-col gap-4 border-t border-cream/10 px-5 py-5 text-sm tracking-[0.14em] uppercase sm:hidden">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href={contacts.mapUrl} target="_blank" rel="noreferrer" className="btn-primary">
              Построить маршрут
            </a>
          </nav>
        ) : null}
      </header>

      <main>
        <section id="top" className="relative flex min-h-[92svh] items-end overflow-hidden">
          <img
            src={heroUrl}
            alt="Блины с начинкой в кафе Блiнцы"
            width={1080}
            height={882}
            className="animate-slow-pan absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15" />
          <div className="relative mx-auto w-full max-w-6xl px-5 pt-32 pb-14 text-cream sm:pb-20">
            <Reveal>
              <p className="eyebrow !text-cream/65">Мобильное меню · Октябрьская, 23</p>
              <h1 className="font-display mt-5 max-w-4xl text-[3.8rem] leading-[0.9] uppercase sm:text-8xl">
                Блiнцы
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/80">
                Отсканируй QR → выбери блин за 20 секунд → назови номер на кассе.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#menu" className="btn-primary text-lg px-8 py-3">
                  Открыть меню
                </a>
                <MapSelector urls={contacts.mapUrls} variant="ghost" />
              </div>
              <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-5 border-t border-cream/20 pt-6 text-xs sm:grid-cols-3">
                <div>
                  <dt className="eyebrow !text-cream/50">Адрес</dt>
                  <dd className="mt-2">Октябрьская, 23</dd>
                </div>
                <div>
                  <dt className="eyebrow !text-cream/50">Сегодня</dt>
                  <dd className="mt-2">с 11:00</dd>
                </div>
                <div>
                  <dt className="eyebrow !text-cream/50">Телефон</dt>
                  <dd className="mt-2">
                    <a href={contacts.phoneHref}>{contacts.phone}</a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>

        <section id="menu" className="relative">
          <MenuView />
        </section>

        <section id="visit" className="surface-dark py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="font-display text-xl text-cream">4,7</span>
                <span className="text-cream/60">на Яндекс Картах · 1400+ оценок</span>
              </div>
              <h2 className="mt-2 max-w-2xl text-4xl leading-[1.05] sm:text-6xl">
                Блины лучше есть горячими, с руками.
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                <MapSelector urls={contacts.mapUrls} variant="primary" />
                <a href={contacts.phoneHref} className="btn-ghost">
                  Позвонить
                </a>
                <a href={contacts.instagram} target="_blank" rel="noreferrer" className="btn-ghost">
                  Отзывы гостей
                </a>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <dl className="space-y-5 border-l border-cream/20 pl-6 text-sm">
                <div>
                  <dt className="eyebrow !text-cream/50">Адрес</dt>
                  <dd className="mt-1">{contacts.address}</dd>
                </div>
                <div>
                  <dt className="eyebrow !text-cream/50">Часы работы</dt>
                  <dd className="mt-1">{contacts.hours}</dd>
                </div>
                <div>
                  <dt className="eyebrow !text-cream/50">Контакты</dt>
                  <dd className="mt-1">
                    <a href={contacts.phoneHref}>{contacts.phone}</a>
                  </dd>
                  <dd className="mt-1">
                    <a href={contacts.instagram} target="_blank" rel="noreferrer">
                      {contacts.instagramHandle}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-cream/10 bg-ink/50 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl uppercase text-cream">Блiнцы</p>
          <p>{contacts.address}</p>
          <a
            href={contacts.instagram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cream transition"
          >
            {contacts.instagramHandle}
          </a>
        </div>
      </footer>
    </div>
  );
}
