export type MenuItem = {
  name: string;
  desc?: string;
  volume?: string;
  price: string;
};

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
      name: "Курица, маринованный имбирь, моцарелла, чеснок, мята и чёрный перец",
      volume: "250 г",
      price: "9",
    },
    {
      name: "Курица, карпаччо из грибов, моцарелла и майонез",
      volume: "250 г",
      price: "9",
    },
    {
      name: "Курица, бекон, шпинат, моцарелла и соус цезарь",
      volume: "285 г",
      price: "11",
    },
    {
      name: "Курица, кукуруза, чеддер, шавья и соус spicy",
      volume: "245 г",
      price: "12",
    },
    {
      name: "Курица, ананас, чеддер, имбирь, чеснок и соус карри",
      volume: "275 г",
      price: "12",
    },
    {
      name: "Курица, вяленые томаты, творожный сыр, маслины, базилик и томатный соус",
      volume: "265 г",
      price: "12",
    },
    {
      name: "Индейка, сыр «Дружба», карпаччо из грибов и майонез",
      volume: "250 г",
      price: "13",
    },
    {
      name: "Индейка, томат, моцарелла и соус песта",
      volume: "260 г",
      price: "14",
    },
    {
      name: "Индейка, ананас, сыр Hochland, руккола и майонез",
      volume: "255 г",
      price: "14",
    },
    {
      name: "Индейка, персик, моцарелла, перец чили, смешанная зелень и соус бальзамик",
      volume: "280 г",
      price: "13",
    },
    {
      name: "Курица, моцарелла",
      volume: "250 г",
      price: "9",
    },
    {
      name: "Вяленые томаты, маслины и моцарелла",
      volume: "250 г",
      price: "10",
    },
    {
      name: "Вяленые томаты, жареный яичный желток и томатный соус",
      volume: "250 г",
      price: "9",
    },
    {
      name: "Карпаччо из грибов, жареный яичный желток и томатный соус",
      volume: "265 г",
      price: "10",
    },
    {
      name: "Бекон, картофельное пюре, маринованный огурец, шавья и сырный соус",
      volume: "265 г",
      price: "9",
    },
    {
      name: "Ягнятина Wagyu, карпаччо из грибов, сыр бри, трюфельный сыр, майонез, шпинат",
      volume: "280 г",
      price: "16",
    },
    {
      name: "Ягнятина Wagyu, вяленый сыр, маринованный огурец и майонез",
      volume: "280 г",
      price: "14",
    },
    {
      name: "Ягнятина Wagyu, авокадо, творожный сыр, кинза, сметана, аджика",
      volume: "280 г",
      price: "13",
    },
    {
      name: "Пепперони, томат, маслины, моцарелла и соус песта",
      volume: "255 г",
      price: "11",
    },
    {
      name: "Пепперони, творожный сыр, перец чили и шавья",
      volume: "255 г",
      price: "11",
    },
    {
      name: "Вяленая колбаса, жареный яичный желток, чеддер, руккола, соус spicy и соус цезарь",
      volume: "265 г",
      price: "12",
    },
    {
      name: "Вяленая колбаса, маринованный огурец, творожный сыр, шавья и сырный соус",
      volume: "270 г",
      price: "10",
    },
    {
      name: "Мортаделла, моцарелла, руккола и томатный соус",
      volume: "255 г",
      price: "12",
    },
  ],
};

export const spinachPancakes: MenuSection = {
  id: "spinach",
  title: "На шпинатном тесте",
  items: [
    {
      name: "Курица, маринованный огурец, перец чили, мёд и кунжутное масло",
      volume: "245 г",
      price: "12",
    },
    {
      name: "Авокадо, альпийский сыр, фета и чеддер",
      volume: "235 г",
      price: "14",
    },
  ],
};

export const fishPancakes: MenuSection = {
  id: "fish",
  title: "С рыбой",
  items: [
    {
      name: "Лосось, сыр чеддер и руккола",
      volume: "250 г",
      price: "18",
    },
    {
      name: "Лосось, карпаччо из грибов и соус цезарь",
      volume: "250 г",
      price: "15",
    },
    {
      name: "Лосось, свежий огурец, творожный сыр и соус песта",
      volume: "250 г",
      price: "15",
    },
    {
      name: "Лосось, груша, творожный сыр и соус бальзамик",
      volume: "250 г",
      price: "16",
    },
    {
      name: "Лосось, персик, шавья, авокадо и соус манго",
      volume: "250 г",
      price: "14",
    },
    {
      name: "Тунец, вяленые томаты, руккола, авокадо и соус цезарь",
      volume: "250 г",
      price: "16",
    },
  ],
};

export const vegetarianPancakes: MenuSection = {
  id: "vegetarian",
  title: "Вегетарианские блiнцы",
  items: [
    {
      name: "Карпаччо из грибов, моцарелла и соус бальзамик",
      volume: "220 г",
      price: "8",
    },
    {
      name: "Руккола, вяленые томаты и творожный сыр",
      volume: "195 г",
      price: "10",
    },
    {
      name: "Моцарелла, томат и соус песта",
      volume: "235 г",
      price: "8",
    },
    {
      name: "4 сыра и соус цезарь",
      volume: "240 г",
      price: "11",
    },
  ],
};

export const sweetPancakes: MenuSection = {
  id: "sweet",
  title: "Сладкие блiнцы",
  items: [
    {
      name: "Манго, персик, апельсин, творожный сыр, белый шоколад, мёд, кокос, мята",
      volume: "250 г",
      price: "12",
    },
    {
      name: "Банан и шоколадно-арахисовая паста",
      volume: "225 г",
      price: "10",
    },
    {
      name: "Шоколадно-арахисовая паста, творожный сыр и арахис",
      volume: "185 г",
      price: "10",
    },
    {
      name: "Вишня, миндаль, кокос и шоколадно-арахисовая паста",
      volume: "215 г",
      price: "12",
    },
    {
      name: "Творог, сметана и сахар",
      volume: "225 г",
      price: "8",
    },
    {
      name: "Яблоко, белый шоколад, миндаль, корица и сахар",
      volume: "230 г",
      price: "11",
    },
  ],
};

export const syrniki: MenuSection = {
  id: "syrniki",
  title: "Сырники",
  items: [
    { name: "Со сметаной", volume: "210 / 40 г", price: "9" },
    { name: "С вареньем", volume: "210 / 40 г", price: "9" },
  ],
};

export const soups: MenuSection = {
  id: "soups",
  title: "Суп дня",
  items: [{ name: "Суп дня", volume: "250 г", price: "5" }],
};

export const coffee: MenuSection = {
  id: "coffee",
  title: "Кофе",
  note: "Manufactura Roasters",
  items: [
    { name: "Эспрессо двойной", volume: "45 мл", price: "6,50" },
    { name: "Эспрессо", volume: "25 мл", price: "4,50" },
    { name: "Американо двойной", volume: "150 мл", price: "6,50" },
    { name: "Американо", volume: "150 мл", price: "4,50" },
    { name: "Флэт уайт", volume: "245 мл", price: "8" },
    { name: "Капучино", volume: "255 / 435 мл", price: "6 / 10" },
    { name: "Латте", volume: "255 / 435 мл", price: "6 / 10" },
    { name: "Раф классический", volume: "255 мл", price: "9" },
    { name: "Раф миндальный", volume: "300 мл", price: "12" },
    { name: "Какао", volume: "200 / 400 мл", price: "5 / 7" },
    {
      name: "Флэт уайт на миндальном молоке",
      volume: "245 мл",
      price: "11",
    },
    {
      name: "Капучино на миндальном молоке",
      volume: "255 / 435 мл",
      price: "10 / 14",
    },
    {
      name: "Латте на миндальном молоке",
      volume: "255 / 435 мл",
      price: "9 / 14",
    },
    {
      name: "Какао на миндальном молоке",
      volume: "200 / 400 мл",
      price: "8 / 12",
    },
    {
      name: "Матча на миндальном молоке",
      volume: "250 мл",
      price: "8",
    },
  ],
};

export const houseDrinks: MenuSection = {
  id: "house-drinks",
  title: "Домашние напитки",
  items: [
    { name: "Лимонад паричка-мята", volume: "450 мл", price: "9" },
    { name: "Лимонад цитрус-мята", volume: "450 мл", price: "9" },
    { name: "Айс матча-латте классический", volume: "335 мл", price: "7" },
    { name: "Айс матча-латте клубничный", volume: "360 мл", price: "8" },
    { name: "Матча-тоник цитрусовый", volume: "370 мл", price: "8" },
    { name: "Эспресса-тоник классический", volume: "400 мл", price: "8" },
    { name: "Эспресса-тоник вишня-мята", volume: "400 мл", price: "9" },
    { name: "Бамбл-кофе", volume: "330 мл", price: "11" },
    { name: "Айс латте", volume: "335 мл", price: "7" },
    { name: "Чай клубника-мята", volume: "400 мл", price: "10" },
    { name: "Чай у ассортименте", price: "3" },
  ],
};

export const drinks: MenuSection = {
  id: "drinks",
  title: "Напитки",
  items: [
    { name: "Coca-Cola, Fanta, Sprite", volume: "330 мл", price: "4" },
    { name: "Schweppes Indian Tonic", volume: "330 мл", price: "4,50" },
    { name: "Bonaqua", volume: "500 мл", price: "3,50" },
    { name: "Сок «Rich»", volume: "200 мл", price: "6" },
    { name: "Квас «Лидский»", volume: "450 мл", price: "6" },
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
};
