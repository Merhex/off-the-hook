import deck from './data/cards.json';

export type Lang = 'en' | 'cs' | 'nl' | 'lt';
/** Every language the app speaks, in the order Settings lists them. */
export const LANGS: Lang[] = ['en', 'nl', 'lt', 'cs'];
/** Each language's own name, for the picker in Settings. */
export const LANG_NAMES: Record<Lang, string> = { en: 'English', cs: 'Čeština', nl: 'Nederlands', lt: 'Lietuvių' };
/** The locale used for dates and numbers. */
export const LOCALES: Record<Lang, string> = { en: 'en-GB', cs: 'cs-CZ', nl: 'nl-NL', lt: 'lt-LT' };
export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary';
export type Category = 'physical' | 'sensory' | 'ridiculous' | 'social' | 'grounding' | 'daydream';
export type Where = 'anywhere' | 'quiet' | 'home' | 'outside';

export interface Card {
  id: string;
  title: Record<Lang, string>;
  task: Record<Lang, string>;
  rarity: Rarity;
  category: Category;
  where: Where[];
  timerSeconds?: number;
  addedIn: number;
}

export const DECK_VERSION: number = deck.deckVersion;
export const CARDS = deck.cards as Card[];
export const RARITIES: Rarity[] = ['common', 'uncommon', 'rare', 'legendary'];

const byId = new Map(CARDS.map((c) => [c.id, c]));
export const cardById = (id: string) => byId.get(id);

/** Where the player is when a hook hits. */
export type Place = 'home' | 'out';
export const PLACES: Place[] = ['home', 'out'];

/** Whether a card can be done where the player is. Out and about rules out cards that need a kitchen, a floor or privacy. */
export function fitsPlace(card: Card, place: Place): boolean {
  return place === 'home'
    ? card.where.includes('home') || card.where.includes('anywhere')
    : card.where.includes('anywhere') || card.where.includes('outside');
}
