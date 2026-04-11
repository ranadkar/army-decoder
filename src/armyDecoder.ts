import {
  equipmentCatalog,
  heroCatalog,
  petCatalog,
  spellCatalog,
  troopCatalog,
  type CatalogEntry,
  type CatalogEntryKind,
} from './armyData'

const ARMY_QUERY_PARAM = 'army'
const ENTRY_PATTERN = /^(\d+)x(\d+)$/i
const HERO_ENTRY_PATTERN =
  /^(?<heroId>\d+)(?:m(?<mode>\d+))?(?:p(?<petId>\d+))?(?:e(?<eq1>\d+)(?:_(?<eq2>\d+))?)?$/i
const SECTION_TOKENS = ['h', 'i', 'd', 'u', 's'] as const

type SectionToken = (typeof SECTION_TOKENS)[number]
type ItemSource = 'army' | 'clan-castle'

export type DecodedArmyItem = CatalogEntry & {
  count: number
  known: boolean
  source: ItemSource
}

export type DecodedLoadoutEntry = CatalogEntry & {
  known: boolean
}

export type DecodedHeroLoadout = {
  hero: DecodedLoadoutEntry
  pet: DecodedLoadoutEntry | null
  equipment: DecodedLoadoutEntry[]
  modeLabel: string | null
}

export type DecodeResult = {
  status: 'empty' | 'ready' | 'invalid'
  extractedCode: string
  normalizedCode: string
  heroes: DecodedHeroLoadout[]
  troops: DecodedArmyItem[]
  spells: DecodedArmyItem[]
  totalHeroCount: number
  totalTroopCount: number
  totalSpellCount: number
  errors: string[]
}

type ParseSectionResult = {
  items: DecodedArmyItem[]
  totalCount: number
  errors: string[]
}

type ParseHeroSectionResult = {
  heroes: DecodedHeroLoadout[]
  errors: string[]
}

export function extractArmyCode(value: string) {
  const trimmedValue = value.trim()
  if (!trimmedValue) {
    return ''
  }

  const queryMatch = trimmedValue.match(/(?:^|[?&#])army=([^&#]+)/i)
  if (!queryMatch) {
    return trimmedValue
  }

  try {
    return decodeURIComponent(queryMatch[1].replace(/\+/g, '%20'))
  } catch {
    return queryMatch[1]
  }
}

export function normalizeArmyCode(value: string) {
  return extractArmyCode(value).replace(/\s+/g, '').toLowerCase()
}

export function readArmyCodeFromLocation() {
  if (typeof window === 'undefined') {
    return ''
  }

  const params = new URLSearchParams(window.location.search)
  return normalizeArmyCode(params.get(ARMY_QUERY_PARAM) ?? '')
}

export function buildShareUrl(armyCode: string) {
  if (typeof window === 'undefined') {
    return ''
  }

  const normalizedCode = normalizeArmyCode(armyCode)
  if (!normalizedCode) {
    return ''
  }

  const url = new URL(window.location.href)
  url.searchParams.set(ARMY_QUERY_PARAM, normalizedCode)
  return url.toString()
}

export function syncArmyCodeToLocation(armyCode: string) {
  if (typeof window === 'undefined') {
    return
  }

  const normalizedCode = normalizeArmyCode(armyCode)
  const url = new URL(window.location.href)

  if (normalizedCode) {
    url.searchParams.set(ARMY_QUERY_PARAM, normalizedCode)
  } else {
    url.searchParams.delete(ARMY_QUERY_PARAM)
  }

  const nextUrl = `${url.pathname}${url.search}${url.hash}`
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`

  if (nextUrl !== currentUrl) {
    window.history.replaceState(null, '', nextUrl)
  }
}

export function decodeArmyShareCode(value: string): DecodeResult {
  const extractedCode = extractArmyCode(value)
  const normalizedCode = normalizeArmyCode(extractedCode)

  if (!normalizedCode) {
    return {
      status: 'empty',
      extractedCode,
      normalizedCode,
      heroes: [],
      troops: [],
      spells: [],
      totalHeroCount: 0,
      totalTroopCount: 0,
      totalSpellCount: 0,
      errors: [],
    }
  }

  const splitSections = splitEncodedSections(normalizedCode)
  const heroSection = parseHeroSections(splitSections.sections.h)
  const troopSection = parseItemSections(
    splitSections.sections.u,
    troopCatalog,
    'troop',
    'troop',
    'army',
  )
  const castleTroopSection = parseItemSections(
    splitSections.sections.i,
    troopCatalog,
    'troop',
    'clan castle troop',
    'clan-castle',
  )
  const spellSection = parseItemSections(
    splitSections.sections.s,
    spellCatalog,
    'spell',
    'spell',
    'army',
  )
  const castleSpellSection = parseItemSections(
    splitSections.sections.d,
    spellCatalog,
    'spell',
    'clan castle spell',
    'clan-castle',
  )

  const heroes = heroSection.heroes
  const troops = [...troopSection.items, ...castleTroopSection.items]
  const spells = [...spellSection.items, ...castleSpellSection.items]
  const errors = [
    ...splitSections.errors,
    ...heroSection.errors,
    ...troopSection.errors,
    ...castleTroopSection.errors,
    ...spellSection.errors,
    ...castleSpellSection.errors,
  ]
  const hasDecodedContent = heroes.length > 0 || troops.length > 0 || spells.length > 0

  if (!hasDecodedContent) {
    return {
      status: 'invalid',
      extractedCode,
      normalizedCode,
      heroes: [],
      troops,
      spells,
      totalHeroCount: 0,
      totalTroopCount: 0,
      totalSpellCount: 0,
      errors: errors.length
        ? errors
        : [
            'Expected a share code shaped like u10x0-2x3s1x9-3x2 or h...u...s....',
            `Received: ${normalizedCode}`,
          ],
    }
  }

  return {
    status: 'ready',
    extractedCode,
    normalizedCode,
    heroes,
    troops,
    spells,
    totalHeroCount: heroes.length,
    totalTroopCount: troopSection.totalCount + castleTroopSection.totalCount,
    totalSpellCount: spellSection.totalCount + castleSpellSection.totalCount,
    errors,
  }
}

function splitEncodedSections(normalizedCode: string) {
  const sections: Record<SectionToken, string[]> = {
    h: [],
    i: [],
    d: [],
    u: [],
    s: [],
  }
  const errors: string[] = []

  let index = 0

  while (index < normalizedCode.length) {
    const token = normalizedCode[index]

    if (!isSectionToken(token)) {
      errors.push(
        `Unexpected token "${token}" at position ${index + 1}. Expected one of ${SECTION_TOKENS.join(', ')}.`,
      )
      break
    }

    let nextIndex = index + 1

    while (
      nextIndex < normalizedCode.length &&
      !isSectionToken(normalizedCode[nextIndex])
    ) {
      nextIndex += 1
    }

    const body = normalizedCode.slice(index + 1, nextIndex)

    if (!body) {
      errors.push(`Section "${token}" is empty.`)
    } else {
      sections[token].push(body)
    }

    index = nextIndex
  }

  return {
    sections,
    errors,
  }
}

function parseItemSections(
  encodedSections: string[],
  catalog: Record<number, CatalogEntry>,
  kind: CatalogEntryKind,
  label: string,
  source: ItemSource,
  groupOverride?: string,
): ParseSectionResult {
  if (!encodedSections.length) {
    return {
      items: [],
      totalCount: 0,
      errors: [],
    }
  }

  const mergedItems = new Map<string, DecodedArmyItem>()
  const errors: string[] = []

  for (const encodedSection of encodedSections) {
    for (const segment of encodedSection.split('-')) {
      if (!segment) {
        continue
      }

      const matchedEntry = segment.match(ENTRY_PATTERN)
      if (!matchedEntry) {
        errors.push(`Could not parse ${label} segment "${segment}".`)
        continue
      }

      const count = Number(matchedEntry[1])
      const id = Number(matchedEntry[2])

      if (count < 1) {
        errors.push(
          `Ignored ${label} segment "${segment}" because the count is 0.`,
        )
        continue
      }

      const itemKey = `${source}:${id}`
      const existingItem = mergedItems.get(itemKey)
      if (existingItem) {
        existingItem.count += count
        continue
      }

      const knownEntry = catalog[id]
      mergedItems.set(
        itemKey,
        knownEntry
          ? {
              ...knownEntry,
              group: groupOverride ?? knownEntry.group,
              count,
              known: true,
              source,
            }
          : {
              id,
              name: `Unknown ${label} #${id}`,
              kind,
              group: groupOverride ?? 'Unknown ID',
              count,
              known: false,
              source,
            },
      )
    }
  }

  const items = [...mergedItems.values()]
  const totalCount = items.reduce((sum, item) => sum + item.count, 0)

  return {
    items,
    totalCount,
    errors,
  }
}

function parseHeroSections(encodedSections: string[]): ParseHeroSectionResult {
  if (!encodedSections.length) {
    return {
      heroes: [],
      errors: [],
    }
  }

  const heroes: DecodedHeroLoadout[] = []
  const errors: string[] = []

  for (const encodedSection of encodedSections) {
    for (const segment of encodedSection.split('-')) {
      if (!segment) {
        continue
      }

      const matchedHero = segment.match(HERO_ENTRY_PATTERN)
      if (!matchedHero?.groups) {
        errors.push(`Could not parse hero segment "${segment}".`)
        continue
      }

      const heroId = Number(matchedHero.groups.heroId)
      const mode = matchedHero.groups.mode
        ? Number(matchedHero.groups.mode)
        : null
      const petId = matchedHero.groups.petId
        ? Number(matchedHero.groups.petId)
        : null
      const equipmentIds = [matchedHero.groups.eq1, matchedHero.groups.eq2]
        .filter((value): value is string => Boolean(value))
        .map((value) => Number(value))

      heroes.push({
        hero: lookupLoadoutEntry(heroId, heroCatalog, 'hero', 'Hero'),
        pet:
          petId === null
            ? null
            : lookupLoadoutEntry(petId, petCatalog, 'pet', 'Pet'),
        equipment: equipmentIds.map((equipmentId) =>
          lookupLoadoutEntry(
            equipmentId,
            equipmentCatalog,
            'equipment',
            'Equipment',
          ),
        ),
        modeLabel: resolveHeroModeLabel(heroId, mode),
      })
    }
  }

  return {
    heroes,
    errors,
  }
}

function lookupLoadoutEntry(
  id: number,
  catalog: Record<number, CatalogEntry>,
  kind: CatalogEntryKind,
  label: string,
): DecodedLoadoutEntry {
  const knownEntry = catalog[id]

  if (knownEntry) {
    return {
      ...knownEntry,
      known: true,
    }
  }

  return {
    id,
    name: `Unknown ${label} #${id}`,
    kind,
    group: 'Unknown ID',
    known: false,
  }
}

function resolveHeroModeLabel(heroId: number, mode: number | null) {
  if (heroId !== 2) {
    return null
  }

  return mode === 1 ? 'Air Mode' : 'Ground Mode'
}

function isSectionToken(value: string): value is SectionToken {
  return SECTION_TOKENS.includes(value as SectionToken)
}
