import type { Lang } from './cards';
import { CZK_PER, type Currency } from './treasure';

/**
 * What the treasure would already buy. Prices are rough, in Kč, converted for € and $.
 * Czech uses "N×" so the nouns never need declining.
 */
export interface Comparison {
  id: string;
  czk: number;
  en: [one: string, many: (n: string) => string];
  cs: (n: string) => string;
}

export const COMPARISONS: Comparison[] = [
  { id: 'ice-cream', czk: 40, en: ['an ice cream cone, two scoops, no sharing', (n) => `${n} ice cream cones, two scoops each, no sharing`], cs: (n) => `${n}× kornout zmrzliny, dva kopečky, bez dělení` },
  { id: 'tuna-can', czk: 45, en: ['a can of tuna. Your cousin. Too soon?', (n) => `${n} cans of tuna. Your cousins. Too soon?`], cs: (n) => `${n}× konzerva tuňáka. Tvoji bratranci. Moc brzo?` },
  { id: 'bubble-tea', czk: 55, en: ['a bubble tea, size: enormous', (n) => `${n} bubble teas, size: enormous`], cs: (n) => `${n}× bubble tea, velikost: obrovská` },
  { id: 'capsule-toy', czk: 60, en: ['a capsule toy from a vending machine. Could be a tiny sushi. Could be a tiny me.', (n) => `${n} capsule toys from a vending machine. Statistically, one of them is a tiny me.`], cs: (n) => `${n}× hračka z automatu na kapsle. Třeba malé sushi. Třeba malý já.` },
  { id: 'chai', czk: 90, en: ['a fancy spiced chai with oat milk and attitude', (n) => `${n} fancy spiced chais with oat milk and attitude`], cs: (n) => `${n}× drahý kořeněný čaj chai s ovesným mlékem a postojem` },
  { id: 'rubber-duck', czk: 100, en: ['a rubber duck, to assert dominance in the bath', (n) => `${n} rubber ducks, to assert dominance in the bath`], cs: (n) => `${n}× gumová kachnička na prosazení dominance ve vaně` },
  { id: 'silly-socks', czk: 120, en: ['a pair of ridiculous socks. Fish print, obviously.', (n) => `${n} pairs of ridiculous socks. Fish print, obviously.`], cs: (n) => `${n}× páry šílených ponožek. S rybami, samozřejmě.` },
  { id: 'weird-snacks', czk: 120, en: ['a bag of snacks in flavours that shouldn’t exist. Pickle. Wasabi. Why.', (n) => `${n} bags of snacks in flavours that shouldn’t exist. Pickle. Wasabi. Why.`], cs: (n) => `${n}× sáček chipsů v příchutích, které by neměly existovat. Okurka. Wasabi. Proč.` },
  { id: 'kebab', czk: 150, en: ['a kebab at 2 a.m., zero regrets', (n) => `${n} kebabs at 2 a.m., zero regrets`], cs: (n) => `${n}× kebab ve dvě ráno, nula výčitek` },
  { id: 'houseplant', czk: 180, en: ['a houseplant you’ll name and talk to', (n) => `${n} houseplants you’ll name and talk to`], cs: (n) => `${n}× pokojovka, které dáš jméno a budeš si s ní povídat` },
  { id: 'music-streaming', czk: 199, en: ['a month of music streaming. No ads, only bangers.', (n) => `${n} months of music streaming. No ads, only bangers.`], cs: (n) => `${n}× měsíc hudebního streamování. Žádné reklamy, jen pecky.` },
  { id: 'ramen', czk: 220, en: ['a bowl of ramen at the tiny place with eight seats and a queue', (n) => `${n} bowls of ramen at the tiny place with eight seats and a queue`], cs: (n) => `${n}× miska ramenu v malém bistru s osmi místy a frontou` },
  { id: 'sheet-masks', czk: 220, en: ['ten sheet masks, for looking like a ghost on purpose', (n) => `${n} packs of ten sheet masks, for looking like a ghost on purpose`], cs: (n) => `${n}× deset pleťových masek na schválné strašení jako duch` },
  { id: 'pizza', czk: 250, en: ['a large pizza you swear you’ll share', (n) => `${n} large pizzas you swear you’ll share`], cs: (n) => `${n}× velká pizza, o kterou se prý rozdělíš` },
  { id: 'cinema', czk: 250, en: ['a cinema ticket (popcorn not included, priorities)', (n) => `${n} cinema tickets (popcorn not included, priorities)`], cs: (n) => `${n}× lístek do kina (popcorn zvlášť, priority)` },
  { id: 'tv-streaming', czk: 300, en: ['a month of streaming to rewatch the same show again', (n) => `${n} months of streaming to rewatch the same show again`], cs: (n) => `${n}× měsíc streamování na pětadvacáté zhlédnutí stejného seriálu` },
  { id: 'paperback', czk: 350, en: ['a paperback you’ll actually finish this time', (n) => `${n} paperbacks you’ll actually finish this time`], cs: (n) => `${n}× knížka, kterou tentokrát fakt dočteš` },
  { id: 'karaoke', czk: 400, en: ['an hour in a private karaoke room. The power ballad is mandatory.', (n) => `${n} hours in a private karaoke room. The power ballad is mandatory.`], cs: (n) => `${n}× hodina v soukromém karaoke. Srdceryvná balada je povinná.` },
  { id: 'bowling', czk: 450, en: ['a night of bowling, with the bumpers up and no shame', (n) => `${n} nights of bowling, with the bumpers up and no shame`], cs: (n) => `${n}× večer bowlingu, se zábranami a bez studu` },
  { id: 'escape-room', czk: 550, en: ['a go at an escape room. Spoiler: it’s always behind the painting.', (n) => `${n} goes at escape rooms. Spoiler: it’s always behind the painting.`], cs: (n) => `${n}× úniková hra. Spoiler: je to vždycky za obrazem.` },
  { id: 'sushi', czk: 600, en: ['a sushi dinner (no tuna, out of respect)', (n) => `${n} sushi dinners (no tuna, out of respect)`], cs: (n) => `${n}× večeře v sushi baru (bez tuňáka, z úcty)` },
  { id: 'vinyl', czk: 700, en: ['a vinyl of your favourite album. For the cover art. And the songs.', (n) => `${n} vinyls of your favourite albums. For the cover art. And the songs.`], cs: (n) => `${n}× vinyl oblíbeného alba. Kvůli obalu. A písničkám.` },
  { id: 'massage', czk: 900, en: ['an hour-long massage', (n) => `${n} hour-long massages`], cs: (n) => `${n}× hodinová masáž` },
  { id: 'duck-feast', czk: 1200, en: ['a whole roast duck feast. Ducks aren’t fish. Not my problem.', (n) => `${n} whole roast duck feasts. Ducks aren’t fish. Not my problem.`], cs: (n) => `${n}× hostina s celou pečenou kachnou. Kachny nejsou ryby. Není to můj problém.` },
  { id: 'concert', czk: 1500, en: ['a ticket to see your favourite band live (front row, elbows out, screaming included)', (n) => `${n} tickets to see your favourite band live (front row, elbows out, screaming included)`], cs: (n) => `${n}× lístek na oblíbenou kapelu naživo (první řada, lokty od těla, ječení v ceně)` },
  { id: 'tasting-menu', czk: 2500, en: ['a tasting menu with seven courses you can’t pronounce', (n) => `${n} tasting menus with seven courses you can’t pronounce`], cs: (n) => `${n}× degustační menu se sedmi chody, které neumíš vyslovit` },
  { id: 'sneakers', czk: 3000, en: ['a pair of new sneakers, for swimming away from hooks faster', (n) => `${n} pairs of new sneakers, for swimming away from hooks faster`], cs: (n) => `${n}× páry nových tenisek, ať před háčky plaveš rychleji` },
  { id: 'festival', czk: 4000, en: ['a weekend festival pass. Glitter not included.', (n) => `${n} weekend festival passes. Glitter not included.`], cs: (n) => `${n}× víkendová permanentka na festival. Třpytky zvlášť.` },
  { id: 'spa-night', czk: 4500, en: ['a night at a spa hotel with a hot tub. Robe and tiny slippers included.', (n) => `${n} nights at spa hotels with a hot tub. Robe and tiny slippers included.`], cs: (n) => `${n}× noc ve wellness hotelu s vířivkou. Župan a malinké pantofle v ceně.` },
  { id: 'aquarium', czk: 5000, en: ['a real aquarium, for your real fish friends', (n) => `${n} real aquariums, for your real fish friends`], cs: (n) => `${n}× opravdové akvárium pro opravdové rybí kamarády` },
  { id: 'headphones', czk: 7000, en: ['noise-cancelling headphones, for ignoring everyone beautifully', (n) => `${n} pairs of noise-cancelling headphones, for ignoring everyone beautifully`], cs: (n) => `${n}× sluchátka s potlačením hluku na krásné ignorování všech` },
  { id: 'console', czk: 12000, en: ['a games console, and a whole weekend to test it', (n) => `${n} games consoles, and a whole weekend to test them`], cs: (n) => `${n}× herní konzole a celý víkend na testování` },
  { id: 'coffin', czk: 15000, en: ['a very nice coffin. No longer needed. Love that.', (n) => `${n} very nice coffins. No longer needed. Love that.`], cs: (n) => `${n}× moc pěkná rakev. Už ji nepotřebuješ. Paráda.` },
  { id: 'bike', czk: 20000, en: ['a really good bike. Fish can’t ride them. You can.', (n) => `${n} really good bikes. Fish can’t ride them. You can.`], cs: (n) => `${n}× pořádné kolo. Ryby na něm jezdit neumí. Ty jo.` },
  { id: 'laptop', czk: 30000, en: ['a shiny new laptop', (n) => `${n} shiny new laptops`], cs: (n) => `${n}× nový lesklý notebook` },
  { id: 'hot-tub', czk: 60000, en: ['a hot tub for the garden. Finally, somewhere for me to visit.', (n) => `${n} hot tubs for the garden. Finally, somewhere for me to visit.`], cs: (n) => `${n}× vířivka na zahradu. Konečně místo, kam za tebou můžu přijet.` },
  { id: 'scooter', czk: 90000, en: ['an electric scooter, to arrive everywhere like a legend', (n) => `${n} electric scooters, to arrive everywhere like a legend`], cs: (n) => `${n}× elektrický skútr, ať všude dorazíš jako legenda` },
];

export const countOf = (c: Comparison, amount: number, currency: Currency) => Math.floor((amount * CZK_PER[currency]) / c.czk);

export function describeComparison(c: Comparison, n: number, lang: Lang): string {
  const num = new Intl.NumberFormat(lang === 'cs' ? 'cs-CZ' : 'en-GB').format(n);
  if (lang === 'cs') return c.cs(num);
  return n === 1 ? c.en[0] : c.en[1](num);
}

/**
 * A few things the treasure can already buy, all picked at random. `seed` picks which;
 * changing it shows a new set.
 */
export function pickComparisons(amount: number, currency: Currency, seed: number, count = 3): Comparison[] {
  const affordable = COMPARISONS.filter((c) => countOf(c, amount, currency) >= 1);
  // Deterministic shuffle so the list doesn't jump around while the counter ticks.
  return affordable
    .map((c, i) => ({ c, k: Math.sin((i + 1) * 12.9898 + seed * 78.233) }))
    .sort((a, b) => a.k - b.k)
    .map((x) => x.c)
    .slice(0, count);
}
