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
}

const troopEntries: CatalogEntry[] = [
  { id: 0, name: 'Barbarian', kind: 'troop', group: 'Troop' },
  { id: 1, name: 'Archer', kind: 'troop', group: 'Troop' },
  { id: 2, name: 'Goblin', kind: 'troop', group: 'Troop' },
  { id: 3, name: 'Giant', kind: 'troop', group: 'Troop' },
  { id: 4, name: 'Wall Breaker', kind: 'troop', group: 'Troop' },
  { id: 5, name: 'Balloon', kind: 'troop', group: 'Troop' },
  { id: 6, name: 'Wizard', kind: 'troop', group: 'Troop' },
  { id: 7, name: 'Healer', kind: 'troop', group: 'Troop' },
  { id: 8, name: 'Dragon', kind: 'troop', group: 'Troop' },
  { id: 9, name: 'P.E.K.K.A', kind: 'troop', group: 'Troop' },
  { id: 10, name: 'Minion', kind: 'troop', group: 'Troop' },
  { id: 11, name: 'Hog Rider', kind: 'troop', group: 'Troop' },
  { id: 12, name: 'Valkyrie', kind: 'troop', group: 'Troop' },
  { id: 13, name: 'Golem', kind: 'troop', group: 'Troop' },
  { id: 15, name: 'Witch', kind: 'troop', group: 'Troop' },
  { id: 17, name: 'Lava Hound', kind: 'troop', group: 'Troop' },
  { id: 22, name: 'Bowler', kind: 'troop', group: 'Troop' },
  { id: 23, name: 'Baby Dragon', kind: 'troop', group: 'Troop' },
  { id: 24, name: 'Miner', kind: 'troop', group: 'Troop' },
  { id: 26, name: 'Super Barbarian', kind: 'troop', group: 'Super Troop' },
  { id: 27, name: 'Super Archer', kind: 'troop', group: 'Super Troop' },
  { id: 28, name: 'Super Wall Breaker', kind: 'troop', group: 'Super Troop' },
  { id: 29, name: 'Super Giant', kind: 'troop', group: 'Super Troop' },
  { id: 30, name: 'Ice Wizard', kind: 'troop', group: 'Event Troop' },
  { id: 45, name: 'Battle Ram', kind: 'troop', group: 'Event Troop' },
  { id: 47, name: 'Royal Ghost', kind: 'troop', group: 'Event Troop' },
  { id: 48, name: 'Pumpkin Barbarian', kind: 'troop', group: 'Event Troop' },
  { id: 50, name: 'Giant Skeleton', kind: 'troop', group: 'Event Troop' },
  { id: 51, name: 'Wall Wrecker', kind: 'troop', group: 'Siege Machine' },
  { id: 52, name: 'Battle Blimp', kind: 'troop', group: 'Siege Machine' },
  { id: 53, name: 'Yeti', kind: 'troop', group: 'Troop' },
  { id: 55, name: 'Sneaky Goblin', kind: 'troop', group: 'Super Troop' },
  { id: 56, name: 'Super Miner', kind: 'troop', group: 'Super Troop' },
  { id: 57, name: 'Rocket Balloon', kind: 'troop', group: 'Super Troop' },
  { id: 58, name: 'Ice Golem', kind: 'troop', group: 'Troop' },
  { id: 59, name: 'Electro Dragon', kind: 'troop', group: 'Troop' },
  { id: 61, name: 'Skeleton Barrel', kind: 'troop', group: 'Event Troop' },
  { id: 62, name: 'Stone Slammer', kind: 'troop', group: 'Siege Machine' },
  { id: 63, name: 'Inferno Dragon', kind: 'troop', group: 'Troop' },
  { id: 64, name: 'Super Valkyrie', kind: 'troop', group: 'Super Troop' },
  { id: 65, name: 'Dragon Rider', kind: 'troop', group: 'Troop' },
  { id: 66, name: 'Super Witch', kind: 'troop', group: 'Super Troop' },
  { id: 67, name: 'El Primo', kind: 'troop', group: 'Event Troop' },
  { id: 72, name: 'Party Wizard', kind: 'troop', group: 'Event Troop' },
  { id: 75, name: 'Siege Barracks', kind: 'troop', group: 'Siege Machine' },
  { id: 76, name: 'Ice Hound', kind: 'troop', group: 'Super Troop' },
  { id: 80, name: 'Super Bowler', kind: 'troop', group: 'Super Troop' },
  { id: 81, name: 'Super Dragon', kind: 'troop', group: 'Super Troop' },
  { id: 82, name: 'Headhunter', kind: 'troop', group: 'Troop' },
  { id: 83, name: 'Super Wizard', kind: 'troop', group: 'Super Troop' },
  { id: 84, name: 'Super Minion', kind: 'troop', group: 'Super Troop' },
  { id: 87, name: 'Log Launcher', kind: 'troop', group: 'Siege Machine' },
  { id: 91, name: 'Flame Flinger', kind: 'troop', group: 'Siege Machine' },
  { id: 92, name: 'Battle Drill', kind: 'troop', group: 'Siege Machine' },
  { id: 95, name: 'Electro Titan', kind: 'troop', group: 'Troop' },
  { id: 97, name: 'Apprentice Warden', kind: 'troop', group: 'Troop' },
  { id: 98, name: 'Super Hog', kind: 'troop', group: 'Super Troop' },
  { id: 110, name: 'Root Rider', kind: 'troop', group: 'Troop' },
  { id: 119, name: 'Firecracker', kind: 'troop', group: 'Event Troop' },
  { id: 120, name: 'Azure Dragon', kind: 'troop', group: 'Event Troop' },
  { id: 123, name: 'Druid', kind: 'troop', group: 'Troop' },
  { id: 132, name: 'Thrower', kind: 'troop', group: 'Troop' },
  { id: 135, name: 'Troop Launcher', kind: 'troop', group: 'Siege Machine' },
  { id: 142, name: 'Snake Barrel', kind: 'troop', group: 'Event Troop' },
  { id: 147, name: 'Super Yeti', kind: 'troop', group: 'Super Troop' },
  { id: 150, name: 'Furnace', kind: 'troop', group: 'Troop' },
  { id: 177, name: 'Meteor Golem', kind: 'troop', group: 'Troop' },
]

const spellEntries: CatalogEntry[] = [
  { id: 0, name: 'Lightning Spell', kind: 'spell', group: 'Spell' },
  { id: 1, name: 'Healing Spell', kind: 'spell', group: 'Spell' },
  { id: 2, name: 'Rage Spell', kind: 'spell', group: 'Spell' },
  { id: 3, name: 'Jump Spell', kind: 'spell', group: 'Spell' },
  { id: 4, name: "Santa's Surprise", kind: 'spell', group: 'Event Spell' },
  { id: 5, name: 'Freeze Spell', kind: 'spell', group: 'Spell' },
  { id: 9, name: 'Poison Spell', kind: 'spell', group: 'Spell' },
  { id: 10, name: 'Earthquake Spell', kind: 'spell', group: 'Spell' },
  { id: 11, name: 'Haste Spell', kind: 'spell', group: 'Spell' },
  { id: 16, name: 'Clone Spell', kind: 'spell', group: 'Spell' },
  { id: 17, name: 'Skeleton Spell', kind: 'spell', group: 'Spell' },
  { id: 22, name: 'Birthday Boom', kind: 'spell', group: 'Event Spell' },
  { id: 28, name: 'Bat Spell', kind: 'spell', group: 'Spell' },
  { id: 35, name: 'Invisibility Spell', kind: 'spell', group: 'Spell' },
  { id: 53, name: 'Recall Spell', kind: 'spell', group: 'Spell' },
  { id: 70, name: 'Overgrowth Spell', kind: 'spell', group: 'Spell' },
  { id: 98, name: 'Revive Spell', kind: 'spell', group: 'Spell' },
  { id: 109, name: 'Ice Block Spell', kind: 'spell', group: 'Spell' },
  { id: 120, name: 'Totem Spell', kind: 'spell', group: 'Spell' },
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
  { id: 20, name: 'Healer Puppet', kind: 'equipment', group: 'Equipment' },
  { id: 22, name: 'Fireball', kind: 'equipment', group: 'Equipment' },
  { id: 24, name: 'Rage Gem', kind: 'equipment', group: 'Equipment' },
  { id: 32, name: 'Snake Bracelet', kind: 'equipment', group: 'Equipment' },
  { id: 34, name: 'Healing Tome', kind: 'equipment', group: 'Equipment' },
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
]

function createCatalog(entries: CatalogEntry[]) {
  return Object.fromEntries(
    entries.map((entry) => [entry.id, entry]),
  ) as Record<number, CatalogEntry>
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
