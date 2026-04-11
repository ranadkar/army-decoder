import { useEffect, useState } from 'react'
import './App.css'
import {
  decodeArmyShareCode,
  readArmyCodeFromLocation,
  syncArmyCodeToLocation,
  type DecodedArmyItem,
  type DecodedHeroLoadout,
} from './armyDecoder'

const EXAMPLE_ARMY_CODE = 'u10x0-2x3s1x9-3x2'
const USE_IN_GAME_BASE_URL =
  'https://link.clashofclans.com/en/?action=CopyArmy&army='

function App() {
  const [armyCode, setArmyCode] = useState(() => readArmyCodeFromLocation())

  const decodedArmy = decodeArmyShareCode(armyCode)
  const useInGameUrl = decodedArmy.normalizedCode
    ? `${USE_IN_GAME_BASE_URL}${encodeURIComponent(decodedArmy.normalizedCode)}`
    : ''
  const hasResults = decodedArmy.status === 'ready'
  const armyUnits = decodedArmy.troops.filter((item) => item.source === 'army')
  const castleUnits = decodedArmy.troops.filter(
    (item) => item.source === 'clan-castle',
  )
  const armyTroops = armyUnits.filter((item) => !isSiegeMachine(item))
  const armySiegeMachines = armyUnits.filter(isSiegeMachine)
  const castleTroops = castleUnits.filter((item) => !isSiegeMachine(item))
  const castleSiegeMachines = castleUnits.filter(isSiegeMachine)
  const armySpells = decodedArmy.spells.filter((item) => item.source === 'army')
  const castleSpells = decodedArmy.spells.filter(
    (item) => item.source === 'clan-castle',
  )
  const armyTroopTotals = getItemTotals(armyTroops)
  const armySiegeTotals = getItemTotals(armySiegeMachines)
  const armySpellTotals = getItemTotals(armySpells)
  const hasClanCastle =
    castleTroops.length > 0 ||
    castleSiegeMachines.length > 0 ||
    castleSpells.length > 0

  useEffect(() => {
    syncArmyCodeToLocation(armyCode)
  }, [armyCode])

  return (
    <main className="app-shell">
      <div className="page">
        <section className="surface-card search-panel">
          <div className="panel-header">
            <div className="panel-heading">
              <h1>Army Decoder</h1>
            </div>
            {hasResults ? (
              <div className="meta-list">
                {decodedArmy.totalTroopHousingSpace ? (
                  <span className="meta-chip summary-chip">
                    <SummaryHousingValue
                      kind="troop"
                      value={decodedArmy.totalTroopHousingSpace}
                    />
                  </span>
                ) : null}
                {decodedArmy.totalSiegeMachineHousingSpace ? (
                  <span className="meta-chip summary-chip">
                    <SummaryHousingValue
                      kind="siege"
                      value={decodedArmy.totalSiegeMachineHousingSpace}
                    />
                  </span>
                ) : null}
                {decodedArmy.totalSpellHousingSpace ? (
                  <span className="meta-chip summary-chip">
                    <SummaryHousingValue
                      kind="spell"
                      value={decodedArmy.totalSpellHousingSpace}
                    />
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>

          <label className="field-label" htmlFor="army-code">
            Share code
          </label>
          <textarea
            id="army-code"
            className="army-input"
            value={armyCode}
            onChange={(event) => setArmyCode(event.target.value)}
            placeholder={EXAMPLE_ARMY_CODE}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />

          <div className="button-row">
            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                if (useInGameUrl) {
                  window.open(useInGameUrl, '_blank', 'noopener,noreferrer')
                }
              }}
              disabled={!useInGameUrl}
            >
              Use in game
            </button>
          </div>
        </section>

        {decodedArmy.status === 'empty' ? (
          <section className="surface-card info-card">
            <p className="empty-state">
              Paste an army share code.
            </p>
          </section>
        ) : null}

        {decodedArmy.errors.length ? (
          <section className="status-message">
            <ul className="message-list">
              {decodedArmy.errors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {hasResults ? (
          <>
            {decodedArmy.heroes.length ? (
              <HeroSection heroes={decodedArmy.heroes} />
            ) : null}

            <section className="results-grid">
              <ArmySection
                troops={armyTroops}
                siegeMachines={armySiegeMachines}
                troopHousingSpace={armyTroopTotals.housingSpace}
                siegeHousingSpace={armySiegeTotals.housingSpace}
              />

              <SpellSection
                title="Spells"
                items={armySpells}
                housingSpace={armySpellTotals.housingSpace}
                emptyLabel="No spell entries."
              />

              {hasClanCastle ? (
                <ClanCastleSection
                  troops={castleTroops}
                  siegeMachines={castleSiegeMachines}
                  spells={castleSpells}
                />
              ) : null}
            </section>
          </>
        ) : null}
      </div>
    </main>
  )
}

function ClanCastleSection({
  troops,
  siegeMachines,
  spells,
}: {
  troops: DecodedArmyItem[]
  siegeMachines: DecodedArmyItem[]
  spells: DecodedArmyItem[]
}) {
  const troopTotals = getItemTotals(troops)
  const siegeTotals = getItemTotals(siegeMachines)
  const spellTotals = getItemTotals(spells)
  const summaryItems: HousingSummaryItem[] = []

  if (troopTotals.count) {
    summaryItems.push({
      kind: 'troop',
      value: troopTotals.housingSpace,
    })
  }

  if (spellTotals.count) {
    summaryItems.push({
      kind: 'spell',
      value: spellTotals.housingSpace,
    })
  }

  if (siegeTotals.count) {
    summaryItems.push({
      kind: 'siege',
      value: siegeTotals.housingSpace,
    })
  }

  return (
    <section className="surface-card army-section">
      <header className="section-header">
        <div className="section-heading">
          <h2>Clan Castle</h2>
        </div>
        {summaryItems.length ? <SummaryList items={summaryItems} /> : null}
      </header>

      <div className="castle-groups">
        <div className="castle-group">
          <p className="castle-group-label">Troops</p>
          {troops.length ? (
            <div className="unit-grid">
              {troops.map((item) => (
                <ArmyCard
                  key={`${item.kind}-${item.source}-${item.id}`}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">No troop entries.</div>
          )}
        </div>

        <div className="castle-group">
          <p className="castle-group-label">Spells</p>
          {spells.length ? (
            <div className="unit-grid">
              {spells.map((item) => (
                <ArmyCard
                  key={`${item.kind}-${item.source}-${item.id}`}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">No spell entries.</div>
          )}
        </div>

        <div className="castle-group">
          <p className="castle-group-label">Siege Machines</p>
          {siegeMachines.length ? (
            <div className="unit-grid">
              {siegeMachines.map((item) => (
                <ArmyCard
                  key={`${item.kind}-${item.source}-${item.id}`}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">No siege machines.</div>
          )}
        </div>
      </div>
    </section>
  )
}

function HeroSection({ heroes }: { heroes: DecodedHeroLoadout[] }) {
  return (
    <section className="surface-card army-section">
      <header className="section-header">
        <div className="section-heading">
          <h2>Heroes</h2>
        </div>
      </header>

      <div className="hero-grid">
        {heroes.map((heroLoadout, index) => (
          <HeroCard
            key={`${heroLoadout.hero.id}-${index}`}
            heroLoadout={heroLoadout}
          />
        ))}
      </div>
    </section>
  )
}

type ArmySectionProps = {
  troops: DecodedArmyItem[]
  siegeMachines: DecodedArmyItem[]
  troopHousingSpace: number
  siegeHousingSpace: number
}

function ArmySection({
  troops,
  siegeMachines,
  troopHousingSpace,
  siegeHousingSpace,
}: ArmySectionProps) {
  const summaryItems: HousingSummaryItem[] = []

  if (troops.length) {
    summaryItems.push({
      kind: 'troop',
      value: troopHousingSpace,
    })
  }

  if (siegeMachines.length) {
    summaryItems.push({
      kind: 'siege',
      value: siegeHousingSpace,
    })
  }

  return (
    <section className="surface-card army-section">
      <header className="section-header">
        <div className="section-heading">
          <h2>Army</h2>
        </div>
        {summaryItems.length ? <SummaryList items={summaryItems} /> : null}
      </header>

      <div className="castle-groups">
        <div className="castle-group">
          <p className="castle-group-label">Troops</p>
          {troops.length ? (
            <div className="unit-grid">
              {troops.map((item) => (
                <ArmyCard
                  key={`${item.kind}-${item.source}-${item.id}`}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">No troop entries.</div>
          )}
        </div>

        <div className="castle-group">
          <p className="castle-group-label">Siege Machines</p>
          {siegeMachines.length ? (
            <div className="unit-grid">
              {siegeMachines.map((item) => (
                <ArmyCard
                  key={`${item.kind}-${item.source}-${item.id}`}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">No siege machines.</div>
          )}
        </div>
      </div>
    </section>
  )
}

type SpellSectionProps = {
  title: string
  items: DecodedArmyItem[]
  housingSpace: number
  emptyLabel: string
}

function SpellSection({
  title,
  items,
  housingSpace,
  emptyLabel,
}: SpellSectionProps) {
  return (
    <section className="surface-card army-section">
      <header className="section-header">
        <div className="section-heading">
          <h2>{title}</h2>
        </div>
        {housingSpace ? (
          <SummaryList items={[{ kind: 'spell', value: housingSpace }]} />
        ) : null}
      </header>

      {items.length ? (
        <div className="unit-grid">
          {items.map((item) => (
            <ArmyCard key={`${item.kind}-${item.source}-${item.id}`} item={item} />
          ))}
        </div>
      ) : (
        <div className="empty-state">{emptyLabel}</div>
      )}
    </section>
  )
}

function HeroCard({ heroLoadout }: { heroLoadout: DecodedHeroLoadout }) {
  const subtitle = heroLoadout.modeLabel ?? 'Hero'
  const equipmentSlots = [heroLoadout.equipment[0] ?? null, heroLoadout.equipment[1] ?? null]

  return (
    <article className="unit-card hero-card">
      <div className="unit-icon unit-icon-hero">
        {getMonogram(heroLoadout.hero.name)}
      </div>

      <div className="unit-body">
        <div className="unit-title-row">
          <div className="unit-copy">
            <strong className="unit-name">{heroLoadout.hero.name}</strong>
            <p className="unit-group">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="hero-loadout-grid">
        <HeroLoadoutSlot
          label="Pet"
          entry={heroLoadout.pet}
          emptyLabel="None"
        />
        {equipmentSlots.map((equipment, index) => (
          <HeroLoadoutSlot
            key={index}
            label={`Equipment ${index + 1}`}
            entry={equipment}
            emptyLabel="None"
          />
        ))}
      </div>
    </article>
  )
}

function HeroLoadoutSlot({
  label,
  entry,
  emptyLabel,
}: {
  label: string
  entry: DecodedHeroLoadout['pet'] | DecodedHeroLoadout['equipment'][number] | null
  emptyLabel: string
}) {
  const slotClassName = `hero-slot-value${
    entry ? '' : ' hero-slot-value-empty'
  }${entry && !entry.known ? ' hero-slot-value-warning' : ''}`

  return (
    <div className="hero-slot">
      <p className="hero-slot-label">{label}</p>
      <div className={slotClassName}>{entry?.name ?? emptyLabel}</div>
    </div>
  )
}

function ArmyCard({ item }: { item: DecodedArmyItem }) {
  const suffixMetadata: string[] = []
  const housingKind = getHousingKind(item)
  const iconClassName = `unit-icon unit-icon-${item.kind}${
    housingKind === 'siege' ? ' unit-icon-siege' : ''
  }`

  if (!item.known) {
    suffixMetadata.push('Unknown')
  }

  return (
    <article className="unit-card">
      <div className={iconClassName}>
        {getMonogram(item.name)}
      </div>

      <div className="unit-body">
        <div className="unit-title-row">
          <div className="unit-copy">
            <strong className="unit-name">{item.name}</strong>
            <div className="unit-subline">
              <p className="unit-group">{item.group}</p>
              <span
                className={`unit-meta-inline${item.known ? '' : ' unit-meta-inline-warning'}`}
              >
                <span className="unit-space-inline">
                  <HousingSpaceIcon kind={housingKind} />
                  <span>{item.housingSpace ?? '?'}</span>
                </span>
                {suffixMetadata.length ? ` • ${suffixMetadata.join(' • ')}` : ''}
              </span>
            </div>
          </div>
          <div className="unit-count-row">
            <span className="count-pill">x{item.count}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

type HousingIconKind = 'troop' | 'spell' | 'siege'
type HousingSummaryItem = {
  kind: HousingIconKind
  value: number
}

function HousingSpaceIcon({ kind }: { kind: HousingIconKind }) {
  if (kind === 'spell') {
    return (
      <svg
        aria-hidden="true"
        className={`unit-space-icon unit-space-icon-${kind}`}
        viewBox="0 0 16 16"
      >
        <path d="M6.1 2.5h3.8" />
        <path d="M7 2.5v2.2L5.3 6.4v4.2A2.5 2.5 0 0 0 7.8 13h.4a2.5 2.5 0 0 0 2.5-2.4V6.4L9 4.7V2.5" />
        <path d="M5.3 8.8h5.4" />
      </svg>
    )
  }

  if (kind === 'siege') {
    return (
      <svg
        aria-hidden="true"
        className={`unit-space-icon unit-space-icon-${kind}`}
        viewBox="0 0 16 16"
      >
        <circle cx="4.5" cy="11.5" r="2" />
        <circle cx="11.5" cy="11.5" r="2" />
        <path d="M4.5 11.5h7" />
        <path d="M6.5 11.5 9.2 4.4l3 1.2" />
        <path d="M8.1 7.5H12" />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      className={`unit-space-icon unit-space-icon-${kind}`}
      viewBox="0 0 16 16"
    >
      <g transform="rotate(45 8 8)">
        <path d="M8 1.8 9.8 4.1V9H6.2V4.1L8 1.8Z" />
        <path d="M4.8 9h6.4" />
        <path d="M8 9v3" />
        <path d="M8 14.1 8.9 13.2 8 12.3 7.1 13.2 8 14.1Z" />
      </g>
    </svg>
  )
}

function getMonogram(name: string) {
  const words = name
    .replace(/[^a-z0-9.\s]/gi, ' ')
    .split(/\s+/)
    .filter(Boolean)

  if (!words.length) {
    return '??'
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase()
}

function getItemTotals(items: DecodedArmyItem[]) {
  return items.reduce(
    (totals, item) => ({
      count: totals.count + item.count,
      housingSpace: totals.housingSpace + (item.housingSpace ?? 0) * item.count,
    }),
    {
      count: 0,
      housingSpace: 0,
    },
  )
}

function SummaryList({ items }: { items: HousingSummaryItem[] }) {
  return (
    <span className="summary-list">
      {items.map((item) => (
        <SummaryHousingValue key={item.kind} kind={item.kind} value={item.value} />
      ))}
    </span>
  )
}

function SummaryHousingValue({
  kind,
  value,
}: {
  kind: HousingIconKind
  value: number
}) {
  return (
    <span className="summary-space-inline">
      <HousingSpaceIcon kind={kind} />
      <span>{value}</span>
    </span>
  )
}

function isSiegeMachine(item: DecodedArmyItem) {
  return item.kind === 'troop' && item.group === 'Siege Machine'
}

function getHousingKind(item: DecodedArmyItem): HousingIconKind {
  if (item.kind === 'spell') {
    return 'spell'
  }

  return isSiegeMachine(item) ? 'siege' : 'troop'
}

export default App
