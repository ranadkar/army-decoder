export type CatalogEntryKind =
  | 'troop'
  | 'spell'
  | 'hero'
  | 'pet'
  | 'equipment'

export type CatalogEntry = {
  id: number
  name: string
  kind: CatalogEntryKind
  group: string
  housingSpace?: number
}

const troopEntries: CatalogEntry[] = [
  { id: 0, name: 'Barbarian', kind: 'troop', group: 'Troop', housingSpace: 1 },
  { id: 1, name: 'Archer', kind: 'troop', group: 'Troop', housingSpace: 1 },
  { id: 2, name: 'Goblin', kind: 'troop', group: 'Troop', housingSpace: 1 },
  { id: 3, name: 'Giant', kind: 'troop', group: 'Troop', housingSpace: 5 },
  { id: 4, name: 'Wall Breaker', kind: 'troop', group: 'Troop', housingSpace: 2 },
  { id: 5, name: 'Balloon', kind: 'troop', group: 'Troop', housingSpace: 5 },
  { id: 6, name: 'Wizard', kind: 'troop', group: 'Troop', housingSpace: 4 },
  { id: 7, name: 'Healer', kind: 'troop', group: 'Troop', housingSpace: 14 },
  { id: 8, name: 'Dragon', kind: 'troop', group: 'Troop', housingSpace: 20 },
  { id: 9, name: 'P.E.K.K.A', kind: 'troop', group: 'Troop', housingSpace: 25 },
  { id: 10, name: 'Minion', kind: 'troop', group: 'Troop', housingSpace: 2 },
  { id: 11, name: 'Hog Rider', kind: 'troop', group: 'Troop', housingSpace: 5 },
  { id: 12, name: 'Valkyrie', kind: 'troop', group: 'Troop', housingSpace: 8 },
  { id: 13, name: 'Golem', kind: 'troop', group: 'Troop', housingSpace: 30 },
  { id: 15, name: 'Witch', kind: 'troop', group: 'Troop', housingSpace: 12 },
  { id: 17, name: 'Lava Hound', kind: 'troop', group: 'Troop', housingSpace: 30 },
  { id: 22, name: 'Bowler', kind: 'troop', group: 'Troop', housingSpace: 6 },
  { id: 23, name: 'Baby Dragon', kind: 'troop', group: 'Troop', housingSpace: 10 },
  { id: 24, name: 'Miner', kind: 'troop', group: 'Troop', housingSpace: 6 },
  { id: 26, name: 'Super Barbarian', kind: 'troop', group: 'Super Troop', housingSpace: 5 },
  { id: 27, name: 'Super Archer', kind: 'troop', group: 'Super Troop', housingSpace: 12 },
  { id: 28, name: 'Super Wall Breaker', kind: 'troop', group: 'Super Troop', housingSpace: 8 },
  { id: 29, name: 'Super Giant', kind: 'troop', group: 'Super Troop', housingSpace: 10 },
  { id: 30, name: 'Ice Wizard', kind: 'troop', group: 'Event Troop', housingSpace: 4 },
  { id: 45, name: 'Battle Ram', kind: 'troop', group: 'Event Troop', housingSpace: 4 },
  { id: 47, name: 'Royal Ghost', kind: 'troop', group: 'Event Troop', housingSpace: 8 },
  { id: 48, name: 'Pumpkin Barbarian', kind: 'troop', group: 'Event Troop', housingSpace: 1 },
  { id: 50, name: 'Giant Skeleton', kind: 'troop', group: 'Event Troop', housingSpace: 20 },
  { id: 51, name: 'Wall Wrecker', kind: 'troop', group: 'Siege Machine', housingSpace: 1 },
  { id: 52, name: 'Battle Blimp', kind: 'troop', group: 'Siege Machine', housingSpace: 1 },
  { id: 53, name: 'Yeti', kind: 'troop', group: 'Troop', housingSpace: 18 },
  { id: 55, name: 'Sneaky Goblin', kind: 'troop', group: 'Super Troop', housingSpace: 3 },
  { id: 56, name: 'Super Miner', kind: 'troop', group: 'Super Troop', housingSpace: 24 },
  { id: 57, name: 'Rocket Balloon', kind: 'troop', group: 'Super Troop', housingSpace: 8 },
  { id: 58, name: 'Ice Golem', kind: 'troop', group: 'Troop', housingSpace: 15 },
  { id: 59, name: 'Electro Dragon', kind: 'troop', group: 'Troop', housingSpace: 30 },
  { id: 60, name: 'Golden Dragon', kind: 'troop', group: 'Event Troop', housingSpace: 5 },
  { id: 61, name: 'Skeleton Barrel', kind: 'troop', group: 'Event Troop', housingSpace: 5 },
  { id: 62, name: 'Stone Slammer', kind: 'troop', group: 'Siege Machine', housingSpace: 1 },
  { id: 63, name: 'Inferno Dragon', kind: 'troop', group: 'Troop', housingSpace: 15 },
  { id: 64, name: 'Super Valkyrie', kind: 'troop', group: 'Super Troop', housingSpace: 20 },
  { id: 65, name: 'Dragon Rider', kind: 'troop', group: 'Troop', housingSpace: 25 },
  { id: 66, name: 'Super Witch', kind: 'troop', group: 'Super Troop', housingSpace: 40 },
  { id: 67, name: 'El Primo', kind: 'troop', group: 'Event Troop', housingSpace: 10 },
  { id: 72, name: 'Party Wizard', kind: 'troop', group: 'Event Troop', housingSpace: 4 },
  { id: 75, name: 'Siege Barracks', kind: 'troop', group: 'Siege Machine', housingSpace: 1 },
  { id: 76, name: 'Ice Hound', kind: 'troop', group: 'Super Troop', housingSpace: 40 },
  { id: 80, name: 'Super Bowler', kind: 'troop', group: 'Super Troop', housingSpace: 30 },
  { id: 81, name: 'Super Dragon', kind: 'troop', group: 'Super Troop', housingSpace: 40 },
  { id: 82, name: 'Headhunter', kind: 'troop', group: 'Troop', housingSpace: 6 },
  { id: 83, name: 'Super Wizard', kind: 'troop', group: 'Super Troop', housingSpace: 10 },
  { id: 84, name: 'Super Minion', kind: 'troop', group: 'Super Troop', housingSpace: 12 },
  { id: 87, name: 'Log Launcher', kind: 'troop', group: 'Siege Machine', housingSpace: 1 },
  { id: 91, name: 'Flame Flinger', kind: 'troop', group: 'Siege Machine', housingSpace: 1 },
  { id: 92, name: 'Battle Drill', kind: 'troop', group: 'Siege Machine', housingSpace: 1 },
  { id: 94, name: 'Ram Rider', kind: 'troop', group: 'Event Troop', housingSpace: 12 },
  { id: 95, name: 'Electro Titan', kind: 'troop', group: 'Troop', housingSpace: 32 },
  { id: 97, name: 'Apprentice Warden', kind: 'troop', group: 'Troop', housingSpace: 20 },
  { id: 98, name: 'Super Hog Rider', kind: 'troop', group: 'Super Troop', housingSpace: 12 },
  { id: 101, name: 'Barcher', kind: 'troop', group: 'Event Troop', housingSpace: 3 },
  { id: 102, name: 'Witch Golem', kind: 'troop', group: 'Event Troop', housingSpace: 41 },
  { id: 103, name: 'Hog Wizard', kind: 'troop', group: 'Event Troop', housingSpace: 7 },
  { id: 104, name: 'Lavaloon', kind: 'troop', group: 'Event Troop', housingSpace: 35 },
  { id: 110, name: 'Root Rider', kind: 'troop', group: 'Troop', housingSpace: 20 },
  { id: 118, name: 'C.O.O.K.I.E', kind: 'troop', group: 'Event Troop', housingSpace: 10 },
  { id: 119, name: 'Firecracker', kind: 'troop', group: 'Event Troop', housingSpace: 10 },
  { id: 120, name: 'Azure Dragon', kind: 'troop', group: 'Event Troop', housingSpace: 40 },
  { id: 121, name: 'Barbarian Kicker', kind: 'troop', group: 'Event Troop', housingSpace: 12 },
  { id: 122, name: 'Giant Thrower', kind: 'troop', group: 'Event Troop', housingSpace: 15 },
  { id: 123, name: 'Druid', kind: 'troop', group: 'Troop', housingSpace: 16 },
  { id: 125, name: 'Broom Witch', kind: 'troop', group: 'Event Troop', housingSpace: 20 },
  { id: 130, name: 'Ice Minion', kind: 'troop', group: 'Event Troop', housingSpace: 4 },
  { id: 132, name: 'Thrower', kind: 'troop', group: 'Troop', housingSpace: 16 },
  { id: 135, name: 'Troop Launcher', kind: 'troop', group: 'Siege Machine', housingSpace: 1 },
  { id: 136, name: 'Debt Collector', kind: 'troop', group: 'Event Troop', housingSpace: 4 },
  { id: 142, name: 'Snake Barrel', kind: 'troop', group: 'Event Troop', housingSpace: 8 },
  { id: 147, name: 'Super Yeti', kind: 'troop', group: 'Super Troop', housingSpace: 35 },
  { id: 150, name: 'Furnace', kind: 'troop', group: 'Troop', housingSpace: 18 },
  { id: 156, name: 'Giant Giant', kind: 'troop', group: 'Event Troop', housingSpace: 50 },
  { id: 157, name: 'K.A.N.E', kind: 'troop', group: 'Event Troop', housingSpace: 75 },
  { id: 158, name: 'The Disarmer', kind: 'troop', group: 'Event Troop', housingSpace: 60 },
  { id: 159, name: 'YEETer', kind: 'troop', group: 'Event Troop', housingSpace: 45 },
  { id: 164, name: 'YEETer', kind: 'troop', group: 'Event Troop', housingSpace: 45 },
  { id: 165, name: 'The Disarmer', kind: 'troop', group: 'Event Troop', housingSpace: 60 },
  { id: 167, name: 'Meteor Golem', kind: 'troop', group: 'Troop', housingSpace: 40 },
  { id: 177, name: 'Meteor Golem', kind: 'troop', group: 'Troop', housingSpace: 40 },
  { id: 188, name: 'Sky Wagon', kind: 'troop', group: 'Siege Machine', housingSpace: 1 },
]

const spellEntries: CatalogEntry[] = [
  { id: 0, name: 'Lightning Spell', kind: 'spell', group: 'Spell', housingSpace: 1 },
  { id: 1, name: 'Healing Spell', kind: 'spell', group: 'Spell', housingSpace: 2 },
  { id: 2, name: 'Rage Spell', kind: 'spell', group: 'Spell', housingSpace: 2 },
  { id: 3, name: 'Jump Spell', kind: 'spell', group: 'Spell', housingSpace: 2 },
  { id: 4, name: "Santa's Surprise", kind: 'spell', group: 'Event Spell', housingSpace: 2 },
  { id: 5, name: 'Freeze Spell', kind: 'spell', group: 'Spell', housingSpace: 1 },
  { id: 6, name: "Santa's Surprise", kind: 'spell', group: 'Event Spell', housingSpace: 2 },
  { id: 9, name: 'Poison Spell', kind: 'spell', group: 'Spell', housingSpace: 1 },
  { id: 10, name: 'Earthquake Spell', kind: 'spell', group: 'Spell', housingSpace: 1 },
  { id: 11, name: 'Haste Spell', kind: 'spell', group: 'Spell', housingSpace: 1 },
  { id: 16, name: 'Clone Spell', kind: 'spell', group: 'Spell', housingSpace: 3 },
  { id: 17, name: 'Skeleton Spell', kind: 'spell', group: 'Spell', housingSpace: 1 },
  { id: 22, name: 'Birthday Boom', kind: 'spell', group: 'Event Spell', housingSpace: 2 },
  { id: 28, name: 'Bat Spell', kind: 'spell', group: 'Spell', housingSpace: 1 },
  { id: 35, name: 'Invisibility Spell', kind: 'spell', group: 'Spell', housingSpace: 1 },
  { id: 53, name: 'Recall Spell', kind: 'spell', group: 'Spell', housingSpace: 2 },
  { id: 70, name: 'Overgrowth Spell', kind: 'spell', group: 'Spell', housingSpace: 2 },
  { id: 73, name: 'Bag of Frostmites', kind: 'spell', group: 'Event Spell', housingSpace: 1 },
  { id: 98, name: 'Revive Spell', kind: 'spell', group: 'Spell', housingSpace: 2 },
  { id: 109, name: 'Ice Block Spell', kind: 'spell', group: 'Spell', housingSpace: 1 },
  { id: 120, name: 'Totem Spell', kind: 'spell', group: 'Spell', housingSpace: 1 },
]

const heroEntries: CatalogEntry[] = [
  { id: 0, name: 'Barbarian King', kind: 'hero', group: 'Hero' },
  { id: 1, name: 'Archer Queen', kind: 'hero', group: 'Hero' },
  { id: 2, name: 'Grand Warden', kind: 'hero', group: 'Hero' },
  { id: 3, name: 'Battle Machine', kind: 'hero', group: 'Hero' },
  { id: 4, name: 'Royal Champion', kind: 'hero', group: 'Hero' },
  { id: 5, name: 'Battle Copter', kind: 'hero', group: 'Hero' },
  { id: 6, name: 'Minion Prince', kind: 'hero', group: 'Hero' },
  { id: 7, name: 'Dragon Duke', kind: 'hero', group: 'Hero' },
]

const petEntries: CatalogEntry[] = [
  { id: 0, name: 'L.A.S.S.I', kind: 'pet', group: 'Pet' },
  { id: 1, name: 'Mighty Yak', kind: 'pet', group: 'Pet' },
  { id: 2, name: 'Electro Owl', kind: 'pet', group: 'Pet' },
  { id: 3, name: 'Unicorn', kind: 'pet', group: 'Pet' },
  { id: 4, name: 'Phoenix', kind: 'pet', group: 'Pet' },
  { id: 7, name: 'Poison Lizard', kind: 'pet', group: 'Pet' },
  { id: 8, name: 'Diggy', kind: 'pet', group: 'Pet' },
  { id: 9, name: 'Frosty', kind: 'pet', group: 'Pet' },
  { id: 10, name: 'Spirit Fox', kind: 'pet', group: 'Pet' },
  { id: 11, name: 'Angry Jelly', kind: 'pet', group: 'Pet' },
  { id: 16, name: 'Sneezy', kind: 'pet', group: 'Pet' },
  { id: 17, name: 'Greedy Raven', kind: 'pet', group: 'Pet' },
]

const equipmentEntries: CatalogEntry[] = [
  { id: 0, name: 'Barbarian Puppet', kind: 'equipment', group: 'Equipment' },
  { id: 1, name: 'Rage Vial', kind: 'equipment', group: 'Equipment' },
  { id: 2, name: 'Archer Puppet', kind: 'equipment', group: 'Equipment' },
  { id: 3, name: 'Invisibility Vial', kind: 'equipment', group: 'Equipment' },
  { id: 4, name: 'Eternal Tome', kind: 'equipment', group: 'Equipment' },
  { id: 5, name: 'Life Gem', kind: 'equipment', group: 'Equipment' },
  { id: 6, name: 'Seeking Shield', kind: 'equipment', group: 'Equipment' },
  { id: 7, name: 'Royal Gem', kind: 'equipment', group: 'Equipment' },
  { id: 8, name: 'Earthquake Boots', kind: 'equipment', group: 'Equipment' },
  { id: 9, name: 'Hog Rider Puppet', kind: 'equipment', group: 'Equipment' },
  { id: 10, name: 'Giant Gauntlet', kind: 'equipment', group: 'Equipment' },
  { id: 11, name: 'Vampstache', kind: 'equipment', group: 'Equipment' },
  { id: 12, name: 'Haste Vial', kind: 'equipment', group: 'Equipment' },
  { id: 13, name: 'Rocket Spear', kind: 'equipment', group: 'Equipment' },
  { id: 14, name: 'Spiky Ball', kind: 'equipment', group: 'Equipment' },
  { id: 15, name: 'Frozen Arrow', kind: 'equipment', group: 'Equipment' },
  { id: 17, name: 'Giant Arrow', kind: 'equipment', group: 'Equipment' },
  { id: 19, name: 'Heroic Torch', kind: 'equipment', group: 'Equipment' },
  { id: 20, name: 'Healer Puppet', kind: 'equipment', group: 'Equipment' },
  { id: 22, name: 'Fireball', kind: 'equipment', group: 'Equipment' },
  { id: 24, name: 'Rage Gem', kind: 'equipment', group: 'Equipment' },
  { id: 32, name: 'Snake Bracelet', kind: 'equipment', group: 'Equipment' },
  { id: 34, name: 'Healing Tome', kind: 'equipment', group: 'Equipment' },
  { id: 35, name: 'Dark Crown', kind: 'equipment', group: 'Equipment' },
  { id: 39, name: 'Magic Mirror', kind: 'equipment', group: 'Equipment' },
  { id: 40, name: 'Electro Boots', kind: 'equipment', group: 'Equipment' },
  { id: 41, name: 'Lavaloon Puppet', kind: 'equipment', group: 'Equipment' },
  { id: 42, name: 'Henchmen Puppet', kind: 'equipment', group: 'Equipment' },
  { id: 43, name: 'Dark Orb', kind: 'equipment', group: 'Equipment' },
  { id: 44, name: 'Metal Pants', kind: 'equipment', group: 'Equipment' },
  { id: 47, name: 'Noble Iron', kind: 'equipment', group: 'Equipment' },
  { id: 48, name: 'Action Figure', kind: 'equipment', group: 'Equipment' },
  { id: 49, name: 'Meteor Staff', kind: 'equipment', group: 'Equipment' },
  { id: 50, name: 'Frost Flake', kind: 'equipment', group: 'Equipment' },
  { id: 51, name: 'Stick Horse', kind: 'equipment', group: 'Equipment' },
  { id: 52, name: 'Fire Heart', kind: 'equipment', group: 'Equipment' },
  { id: 53, name: 'Rocket Backpack', kind: 'equipment', group: 'Equipment' },
  { id: 56, name: 'Stun Blaster', kind: 'equipment', group: 'Equipment' },
  { id: 57, name: 'Flame Blower', kind: 'equipment', group: 'Equipment' },
  { id: 59, name: 'Electro Fangs', kind: 'equipment', group: 'Equipment' },
]

function createCatalog<T extends CatalogEntry>(entries: T[]) {
  return Object.fromEntries(
    entries.map((entry) => [entry.id, entry]),
  ) as Record<number, T>
}

export const troopCatalog = createCatalog(troopEntries)
export const spellCatalog = createCatalog(spellEntries)
export const heroCatalog = createCatalog(heroEntries)
export const petCatalog = createCatalog(petEntries)
export const equipmentCatalog = createCatalog(equipmentEntries)

export const decoderReference = {
  troopCount: troopEntries.length,
  spellCount: spellEntries.length,
  heroCount: heroEntries.length,
  petCount: petEntries.length,
  equipmentCount: equipmentEntries.length,
}
