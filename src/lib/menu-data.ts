export type MenuItem = {
  id: number;
  name: string;
  desc?: string;
  volume?: string;
  price: string;
  priceNum: number;
  category: MenuCategory;
  tags: MenuTag[];
  popular?: boolean;
};

export type MenuCategory =
  | "savory"
  | "spinach"
  | "fish"
  | "vegetarian"
  | "sweet"
  | "syrniki"
  | "soups"
  | "coffee"
  | "house-drinks"
  | "drinks";

export type MenuTag =
  | "hearty"
  | "sweet"
  | "vegetarian"
  | "with-meat"
  | "spicy"
  | "fish"
  | "popular"
  | "under-10"
  | "under-15"
  | "under-20";

export type MenuSection = {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
};

export const savoryPancakes: MenuSection = {
  id: "savory",
  title: "Сытные блiнцы",
  items: [
    {
      id: 1,
      name: "Курица, маринованный имбирь, моцарелла, чеснок, мята и чёрный перец",
      volume: "250 г",
      price: "9",
      priceNum: 9,
      category: "savory",
      tags: ["hearty", "with-meat"],
      popular: true,
    },
    {
      id: 2,
      name: "Курица, карпаччо из грибов, моцарелла и майонез",
      volume: "250 г",
      price: "9",
      priceNum: 9,
      category: "savory",
      tags: ["hearty", "with-meat"],
    },
    {
      id: 3,
      name: "Курица, бекон, шпинат, моцарелла и соус цезарь",
      volume: "285 г",
      price: "11",
      priceNum: 11,
      category: "savory",
      tags: ["hearty", "with-meat"],
    },
    {
      id: 4,
      name: "Курица, кукуруза, чеддер, шавья и соус spicy",
      volume: "245 г",
      price: "12",
      priceNum: 12,
      category: "savory",
      tags: ["hearty", "with-meat", "spicy", "under-15"],
    },
    {
      id: 5,
      name: "Курица, ананас, чеддер, имбирь, чеснок и соус карри",
      volume: "275 г",
      price: "12",
      priceNum: 12,
      category: "savory",
      tags: ["hearty", "with-meat", "under-15"],
    },
    {
      id: 6,
      name: "Курица, вяленые томаты, творожный сыр, маслины, базилик и томатный соус",
      volume: "265 г",
      price: "12",
      priceNum: 12,
      category: "savory",
      tags: ["hearty", "with-meat", "under-15"],
    },
    {
      id: 7,
      name: "Индейка, сыр «Дружба», карпаччо из грибов и майонез",
      volume: "250 г",
      price: "13",
      priceNum: 13,
      category: "savory",
      tags: ["hearty", "with-meat", "under-15"],
    },
    {
      id: 8,
      name: "Индейка, томат, моцарелла и соус песта",
      volume: "260 г",
      price: "14",
      priceNum: 14,
      category: "savory",
      tags: ["hearty", "with-meat", "under-15"],
    },
    {
      id: 9,
      name: "Индейка, ананас, сыр Hochland, руккола и майонез",
      volume: "255 г",
      price: "14",
      priceNum: 14,
      category: "savory",
      tags: ["hearty", "with-meat", "under-15"],
    },
    {
      id: 10,
      name: "Индейка, персик, моцарелла, перец чили, смешанная зелень и соус бальзамик",
      volume: "280 г",
      price: "13",
      priceNum: 13,
      category: "savory",
      tags: ["hearty", "with-meat", "spicy", "under-15"],
    },
    {
      id: 11,
      name: "Курица, моцарелла",
      volume: "250 г",
      price: "9",
      priceNum: 9,
      category: "savory",
      tags: ["hearty", "with-meat", "under-10"],
    },
    {
      id: 12,
      name: "Вяленые томаты, маслины и моцарелла",
      volume: "250 г",
      price: "10",
      priceNum: 10,
      category: "savory",
      tags: ["hearty", "vegetarian", "under-10"],
    },
    {
      id: 13,
      name: "Вяленые томаты, жареный яичный желток и томатный соус",
      volume: "250 г",
      price: "9",
      priceNum: 9,
      category: "savory",
      tags: ["hearty", "vegetarian", "under-10"],
    },
    {
      id: 14,
      name: "Карпаччо из грибов, жареный яичный желток и томатный соус",
      volume: "265 г",
      price: "10",
      priceNum: 10,
      category: "savory",
      tags: ["hearty", "vegetarian", "under-10"],
    },
    {
      id: 15,
      name: "Бекон, картофельное пюре, маринованный огурец, шавья и сырный соус",
      volume: "265 г",
      price: "9",
      priceNum: 9,
      category: "savory",
      tags: ["hearty", "with-meat", "under-10"],
    },
    {
      id: 16,
      name: "Ягнятина Wagyu, карпаччо из грибов, сыр бри, трюфельный сыр, майонез, шпинат",
      volume: "280 г",
      price: "16",
      priceNum: 16,
      category: "savory",
      tags: ["hearty", "with-meat", "popular"],
    },
    {
      id: 17,
      name: "Ягнятина Wagyu, вяленый сыр, маринованный огурец и майонез",
      volume: "280 г",
      price: "14",
      priceNum: 14,
      category: "savory",
      tags: ["hearty", "with-meat", "under-15"],
    },
    {
      id: 18,
      name: "Ягнятина Wagyu, авокадо, творожный сыр, кинза, сметана, аджика",
      volume: "280 г",
      price: "13",
      priceNum: 13,
      category: "savory",
      tags: ["hearty", "with-meat", "spicy", "under-15"],
    },
    {
      id: 19,
      name: "Пепперони, томат, маслины, моцарелла и соус песта",
      volume: "255 г",
      price: "11",
      priceNum: 11,
      category: "savory",
      tags: ["hearty", "with-meat", "under-15"],
    },
    {
      id: 20,
      name: "Пепперони, творожный сыр, перец чили и шавья",
      volume: "255 г",
      price: "11",
      priceNum: 11,
      category: "savory",
      tags: ["hearty", "with-meat", "spicy", "under-15"],
    },
    {
      id: 21,
      name: "Вяленая колбаса, жареный яичный желток, чеддер, руккола, соус spicy и соус цезарь",
      volume: "265 г",
      price: "12",
      priceNum: 12,
      category: "savory",
      tags: ["hearty", "with-meat", "spicy", "under-15"],
    },
    {
      id: 22,
      name: "Вяленая колбаса, маринованный огурец, творожный сыр, шавья и сырный соус",
      volume: "270 г",
      price: "10",
      priceNum: 10,
      category: "savory",
      tags: ["hearty", "with-meat", "under-10"],
    },
    {
      id: 23,
      name: "Мортаделла, моцарелла, руккола и томатный соус",
      volume: "255 г",
      price: "12",
      priceNum: 12,
      category: "savory",
      tags: ["hearty", "with-meat", "under-15"],
    },
  ],
};

export const spinachPancakes: MenuSection = {
  id: "spinach",
  title: "На шпинатном тесте",
  items: [
    {
      id: 24,
      name: "Курица, маринованный огурец, перец чили, мёд и кунжутное масло",
      volume: "245 г",
      price: "12",
      priceNum: 12,
      category: "spinach",
      tags: ["hearty", "with-meat", "spicy", "under-15"],
    },
    {
      id: 25,
      name: "Авокадо, альпийский сыр, фета и чеддер",
      volume: "235 г",
      price: "14",
      priceNum: 14,
      category: "spinach",
      tags: ["hearty", "vegetarian", "under-15"],
    },
  ],
};

export const fishPancakes: MenuSection = {
  id: "fish",
  title: "С рыбой",
  items: [
    {
      id: 26,
      name: "Лосось, сыр чеддер и руккола",
      volume: "250 г",
      price: "18",
      priceNum: 18,
      category: "fish",
      tags: ["hearty", "fish"],
    },
    {
      id: 27,
      name: "Лосось, карпаччо из грибов и соус цезарь",
      volume: "250 г",
      price: "15",
      priceNum: 15,
      category: "fish",
      tags: ["hearty", "fish", "under-15"],
    },
    {
      id: 28,
      name: "Лосось, свежий огурец, творожный сыр и соус песта",
      volume: "250 г",
      price: "15",
      priceNum: 15,
      category: "fish",
      tags: ["hearty", "fish", "under-15"],
    },
    {
      id: 29,
      name: "Лосось, груша, творожный сыр и соус бальзамик",
      volume: "250 г",
      price: "16",
      priceNum: 16,
      category: "fish",
      tags: ["hearty", "fish"],
    },
    {
      id: 30,
      name: "Лосось, персик, шавья, авокадо и соус манго",
      volume: "250 г",
      price: "14",
      priceNum: 14,
      category: "fish",
      tags: ["hearty", "fish", "under-15"],
    },
    {
      id: 31,
      name: "Тунец, вяленые томаты, руккола, авокадо и соус цезарь",
      volume: "250 г",
      price: "16",
      priceNum: 16,
      category: "fish",
      tags: ["hearty", "fish"],
    },
  ],
};

export const vegetarianPancakes: MenuSection = {
  id: "vegetarian",
  title: "Вегетарианские блiнцы",
  items: [
    {
      id: 32,
      name: "Карпаччо из грибов, моцарелла и соус бальзамик",
      volume: "220 г",
      price: "8",
      priceNum: 8,
      category: "vegetarian",
      tags: ["hearty", "vegetarian", "under-10"],
    },
    {
      id: 33,
      name: "Руккола, вяленые томаты и творожный сыр",
      volume: "195 г",
      price: "10",
      priceNum: 10,
      category: "vegetarian",
      tags: ["hearty", "vegetarian", "under-10"],
    },
    {
      id: 34,
      name: "Моцарелла, томат и соус песта",
      volume: "235 г",
      price: "8",
      priceNum: 8,
      category: "vegetarian",
      tags: ["hearty", "vegetarian", "under-10"],
    },
    {
      id: 35,
      name: "4 сыра и соус цезарь",
      volume: "240 г",
      price: "11",
      priceNum: 11,
      category: "vegetarian",
      tags: ["hearty", "vegetarian", "under-15"],
    },
  ],
};

export const sweetPancakes: MenuSection = {
  id: "sweet",
  title: "Сладкие блiнцы",
  items: [
    {
      id: 36,
      name: "Манго, персик, апельсин, творожный сыр, белый шоколад, мёд, кокос, мята",
      volume: "250 г",
      price: "12",
      priceNum: 12,
      category: "sweet",
      tags: ["sweet", "vegetarian", "under-15"],
    },
    {
      id: 37,
      name: "Банан и шоколадно-арахисовая паста",
      volume: "225 г",
      price: "10",
      priceNum: 10,
      category: "sweet",
      tags: ["sweet", "vegetarian", "under-10"],
    },
    {
      id: 38,
      name: "Шоколадно-арахисовая паста, творожный сыр и арахис",
      volume: "185 г",
      price: "10",
      priceNum: 10,
      category: "sweet",
      tags: ["sweet", "vegetarian", "under-10"],
    },
    {
      id: 39,
      name: "Вишня, миндаль, кокос и шоколадно-арахисовая паста",
      volume: "215 г",
      price: "12",
      priceNum: 12,
      category: "sweet",
      tags: ["sweet", "vegetarian", "under-15"],
    },
    {
      id: 40,
      name: "Творог, сметана и сахар",
      volume: "225 г",
      price: "8",
      priceNum: 8,
      category: "sweet",
      tags: ["sweet", "vegetarian", "under-10"],
    },
    {
      id: 41,
      name: "Яблоко, белый шоколад, миндаль, корица и сахар",
      volume: "230 г",
      price: "11",
      priceNum: 11,
      category: "sweet",
      tags: ["sweet", "vegetarian", "under-15"],
    },
  ],
};

export const syrniki: MenuSection = {
  id: "syrniki",
  title: "Сырники",
  items: [
    {
      id: 42,
      name: "Со сметаной",
      volume: "210 / 40 г",
      price: "9",
      priceNum: 9,
      category: "syrniki",
      tags: ["sweet", "vegetarian", "under-10"],
    },
    {
      id: 43,
      name: "С вареньем",
      volume: "210 / 40 г",
      price: "9",
      priceNum: 9,
      category: "syrniki",
      tags: ["sweet", "vegetarian", "under-10"],
    },
  ],
};

export const soups: MenuSection = {
  id: "soups",
  title: "Суп дня",
  items: [
    {
      id: 44,
      name: "Суп дня",
      volume: "250 г",
      price: "5",
      priceNum: 5,
      category: "soups",
      tags: ["hearty", "under-10"],
    },
  ],
};

export const coffee: MenuSection = {
  id: "coffee",
  title: "Кофе",
  note: "Manufactura Roasters",
  items: [
    {
      id: 45,
      name: "Эспрессо двойной",
      volume: "45 мл",
      price: "6,50",
      priceNum: 6.5,
      category: "coffee",
      tags: ["under-10"],
    },
    {
      id: 46,
      name: "Эспрессо",
      volume: "25 мл",
      price: "4,50",
      priceNum: 4.5,
      category: "coffee",
      tags: ["under-10"],
    },
    {
      id: 47,
      name: "Американо двойной",
      volume: "150 мл",
      price: "6,50",
      priceNum: 6.5,
      category: "coffee",
      tags: ["under-10"],
    },
    {
      id: 48,
      name: "Американо",
      volume: "150 мл",
      price: "4,50",
      priceNum: 4.5,
      category: "coffee",
      tags: ["under-10"],
    },
    {
      id: 49,
      name: "Флэт уайт",
      volume: "245 мл",
      price: "8",
      priceNum: 8,
      category: "coffee",
      tags: ["under-10"],
    },
    {
      id: 50,
      name: "Капучино",
      volume: "255 / 435 мл",
      price: "6 / 10",
      priceNum: 6,
      category: "coffee",
      tags: ["under-10"],
    },
    {
      id: 51,
      name: "Латте",
      volume: "255 / 435 мл",
      price: "6 / 10",
      priceNum: 6,
      category: "coffee",
      tags: ["under-10"],
    },
    {
      id: 52,
      name: "Раф классический",
      volume: "255 мл",
      price: "9",
      priceNum: 9,
      category: "coffee",
      tags: ["under-10"],
    },
    {
      id: 53,
      name: "Раф миндальный",
      volume: "300 мл",
      price: "12",
      priceNum: 12,
      category: "coffee",
      tags: ["under-15"],
    },
    {
      id: 54,
      name: "Какао",
      volume: "200 / 400 мл",
      price: "5 / 7",
      priceNum: 5,
      category: "coffee",
      tags: ["under-10"],
    },
    {
      id: 55,
      name: "Флэт уайт на миндальном молоке",
      volume: "245 мл",
      price: "11",
      priceNum: 11,
      category: "coffee",
      tags: ["under-15"],
    },
    {
      id: 56,
      name: "Капучино на миндальном молоке",
      volume: "255 / 435 мл",
      price: "10 / 14",
      priceNum: 10,
      category: "coffee",
      tags: ["under-15"],
    },
    {
      id: 57,
      name: "Латте на миндальном молоке",
      volume: "255 / 435 мл",
      price: "9 / 14",
      priceNum: 9,
      category: "coffee",
      tags: ["under-10"],
    },
    {
      id: 58,
      name: "Какао на миндальном молоке",
      volume: "200 / 400 мл",
      price: "8 / 12",
      priceNum: 8,
      category: "coffee",
      tags: ["under-10"],
    },
    {
      id: 59,
      name: "Матча на миндальном молоке",
      volume: "250 мл",
      price: "8",
      priceNum: 8,
      category: "coffee",
      tags: ["under-10"],
    },
  ],
};

export const houseDrinks: MenuSection = {
  id: "house-drinks",
  title: "Домашние напитки",
  items: [
    {
      id: 60,
      name: "Лимонад паричка-мята",
      volume: "450 мл",
      price: "9",
      priceNum: 9,
      category: "house-drinks",
      tags: ["under-10"],
    },
    {
      id: 61,
      name: "Лимонад цитрус-мята",
      volume: "450 мл",
      price: "9",
      priceNum: 9,
      category: "house-drinks",
      tags: ["under-10"],
    },
    {
      id: 62,
      name: "Айс матча-латте классический",
      volume: "335 мл",
      price: "7",
      priceNum: 7,
      category: "house-drinks",
      tags: ["under-10"],
    },
    {
      id: 63,
      name: "Айс матча-латте клубничный",
      volume: "360 мл",
      price: "8",
      priceNum: 8,
      category: "house-drinks",
      tags: ["under-10"],
    },
    {
      id: 64,
      name: "Матча-тоник цитрусовый",
      volume: "370 мл",
      price: "8",
      priceNum: 8,
      category: "house-drinks",
      tags: ["under-10"],
    },
    {
      id: 65,
      name: "Эспресса-тоник классический",
      volume: "400 мл",
      price: "8",
      priceNum: 8,
      category: "house-drinks",
      tags: ["under-10"],
    },
    {
      id: 66,
      name: "Эспресса-тоник вишня-мята",
      volume: "400 мл",
      price: "9",
      priceNum: 9,
      category: "house-drinks",
      tags: ["under-10"],
    },
    {
      id: 67,
      name: "Бамбл-кофе",
      volume: "330 мл",
      price: "11",
      priceNum: 11,
      category: "house-drinks",
      tags: ["under-15"],
    },
    {
      id: 68,
      name: "Айс латте",
      volume: "335 мл",
      price: "7",
      priceNum: 7,
      category: "house-drinks",
      tags: ["under-10"],
    },
    {
      id: 69,
      name: "Чай клубника-мята",
      volume: "400 мл",
      price: "10",
      priceNum: 10,
      category: "house-drinks",
      tags: ["under-10"],
    },
    {
      id: 70,
      name: "Чай у ассортименте",
      price: "3",
      priceNum: 3,
      category: "house-drinks",
      tags: ["under-10"],
    },
  ],
};

export const drinks: MenuSection = {
  id: "drinks",
  title: "Напитки",
  items: [
    {
      id: 71,
      name: "Coca-Cola, Fanta, Sprite",
      volume: "330 мл",
      price: "4",
      priceNum: 4,
      category: "drinks",
      tags: ["under-10"],
    },
    {
      id: 72,
      name: "Schweppes Indian Tonic",
      volume: "330 мл",
      price: "4,50",
      priceNum: 4.5,
      category: "drinks",
      tags: ["under-10"],
    },
    {
      id: 73,
      name: "Bonaqua",
      volume: "500 мл",
      price: "3,50",
      priceNum: 3.5,
      category: "drinks",
      tags: ["under-10"],
    },
    {
      id: 74,
      name: "Сок «Rich»",
      volume: "200 мл",
      price: "6",
      priceNum: 6,
      category: "drinks",
      tags: ["under-10"],
    },
    {
      id: 75,
      name: "Квас «Лидский»",
      volume: "450 мл",
      price: "6",
      priceNum: 6,
      category: "drinks",
      tags: ["under-10"],
    },
  ],
};

export const contacts = {
  address: "ул. Октябрьская, 23, Минск",
  hours: "Вс–Чт 11:00–23:00 · Пт–Сб 11:00–00:00",
  phone: "+375 29 663-40-88",
  phoneHref: "tel:+375296634088",
  instagram: "https://www.instagram.com/blincy.kastrycnickaja",
  instagramHandle: "@blincy.kastrycnickaja",
  mapUrl: "https://2gis.by/minsk/firm/70000001042224265",
  mapUrls: {
    yandex: "https://yandex.ru/maps/?text=ул. Октябрьская 23 Минск",
    "2gis": "https://2gis.by/minsk/firm/70000001042224265",
    google: "https://www.google.com/maps/search/?api=1&query=ул. Октябрьская 23 Минск",
  },
};

export const allMenuSections = [
  savoryPancakes,
  spinachPancakes,
  fishPancakes,
  vegetarianPancakes,
  sweetPancakes,
  syrniki,
  soups,
  coffee,
  houseDrinks,
  drinks,
];

export const allMenuItems: MenuItem[] = allMenuSections.flatMap((s) => s.items);

export const drinkPairings: Record<number, number[]> = {
  1: [60, 61],
  2: [60, 62],
  3: [60, 65],
  4: [60, 64],
  5: [61, 63],
  6: [60, 62],
  7: [60, 61],
  8: [62, 64],
  9: [61, 63],
  10: [64, 66],
  11: [60, 61],
  12: [60, 62],
  13: [60, 68],
  14: [60, 65],
  15: [60, 61],
  16: [60, 67],
  17: [60, 61],
  18: [64, 66],
  19: [60, 65],
  20: [64, 66],
  21: [60, 61],
  22: [60, 62],
  23: [60, 61],
  24: [60, 64],
  25: [62, 63],
  26: [60, 61],
  27: [60, 62],
  28: [60, 65],
  29: [61, 63],
  30: [61, 63],
  31: [60, 65],
  32: [60, 62],
  33: [60, 68],
  34: [60, 65],
  35: [60, 61],
  36: [61, 63],
  37: [62, 63],
  38: [62, 68],
  39: [61, 63],
  40: [60, 68],
  41: [60, 61],
  42: [60, 68],
  43: [61, 63],
  44: [60, 61],
};

export function getDrinkSuggestions(blinId: number): MenuItem[] {
  const drinkIds = drinkPairings[blinId] || [];
  return drinkIds
    .map((id) => allMenuItems.find((item) => item.id === id))
    .filter(Boolean) as MenuItem[];
}

export function getItemById(id: number): MenuItem | undefined {
  return allMenuItems.find((item) => item.id === id);
}
