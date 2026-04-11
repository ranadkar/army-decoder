import { useEffect, useState } from 'react'
import './App.css'
import {
  buildShareUrl,
  decodeArmyShareCode,
  readArmyCodeFromLocation,
  syncArmyCodeToLocation,
  type DecodedArmyItem,
  type DecodedHeroLoadout,
} from './armyDecoder'

const EXAMPLE_ARMY_CODE = 'u10x0-2x3s1x9-3x2'

function App() {
  const [armyCode, setArmyCode] = useState(() => readArmyCodeFromLocation())
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  )

  const decodedArmy = decodeArmyShareCode(armyCode)
  const shareUrl = buildShareUrl(armyCode)
  const unknownEntryCount =
    decodedArmy.troops.filter((item) => !item.known).length +
    decodedArmy.spells.filter((item) => !item.known).length +
    decodedArmy.heroes.reduce(
      (sum, heroLoadout) =>
        sum +
        Number(!heroLoadout.hero.known) +
        Number(heroLoadout.pet !== null && !heroLoadout.pet.known) +
        heroLoadout.equipment.filter((item) => !item.known).length,
      0,
    )
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

  useEffect(() => {
    if (copyState === 'idle') {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setCopyState('idle')
    }, 1800)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [copyState])

  const handleCopyShareUrl = async () => {
    if (!shareUrl) {
      return
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  return (
    <main className="app-shell">
      <div className="page">
        <section className="surface-card search-panel">
          <div className="panel-header">
            <div className="panel-heading">
              <h1>Army Decoder</h1>
              <p>Paste a share code or full Clash link.</p>
            </div>
            {hasResults ? (
              <div className="meta-list">
                {decodedArmy.totalHeroCount ? (
                  <span className="meta-chip">
                    Heroes {decodedArmy.totalHeroCount}
                  </span>
                ) : null}
                {decodedArmy.totalTroopCount ? (
                  <span className="meta-chip">
                    Army {decodedArmy.totalTroopCount} •{' '}
                    {decodedArmy.totalTroopHousingSpace} space
                  </span>
                ) : null}
                {decodedArmy.totalSiegeMachineCount ? (
                  <span className="meta-chip">
                    Siege {decodedArmy.totalSiegeMachineCount} •{' '}
                    {decodedArmy.totalSiegeMachineHousingSpace} space
                  </span>
                ) : null}
                {decodedArmy.totalSpellCount ? (
                  <span className="meta-chip">
                    Spells {decodedArmy.totalSpellCount} •{' '}
                    {decodedArmy.totalSpellHousingSpace} space
                  </span>
                ) : null}
                <span className="meta-chip">Unknown {unknownEntryCount}</span>
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
              className="primary-button"
              type="button"
              onClick={() => setArmyCode(EXAMPLE_ARMY_CODE)}
            >
              Example
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => setArmyCode('')}
              disabled={!decodedArmy.normalizedCode}
            >
              Clear
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => void handleCopyShareUrl()}
              disabled={!shareUrl}
            >
              {copyState === 'copied'
                ? 'Copied'
                : copyState === 'failed'
                  ? 'Copy failed'
                  : 'Copy URL'}
            </button>
          </div>

          {shareUrl ? (
            <div className="share-block">
              <span className="field-label">Share URL</span>
              <code className="share-url">{shareUrl}</code>
            </div>
          ) : null}
        </section>

        {decodedArmy.status === 'empty' ? (
          <section className="surface-card info-card">
            <p className="empty-state">
              Paste a <code>u...s...</code> or <code>h...u...s...</code> code.
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
                troopSummary={formatSectionSummary(armyTroopTotals)}
                siegeSummary={formatSectionSummary(armySiegeTotals)}
              />

              <SpellSection
                title="Spells"
                items={armySpells}
                summary={formatSectionSummary(armySpellTotals)}
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
  const summaryParts: string[] = []

  if (troopTotals.count) {
    summaryParts.push(`Troops ${formatSectionSummary(troopTotals)}`)
  }

  if (siegeTotals.count) {
    summaryParts.push(`Siege ${formatSectionSummary(siegeTotals)}`)
  }

  if (spellTotals.count) {
    summaryParts.push(`Spells ${formatSectionSummary(spellTotals)}`)
  }

  return (
    <section className="surface-card army-section">
      <header className="section-header">
        <div className="section-heading">
          <h2>Clan Castle</h2>
        </div>
        <span>{summaryParts.join(' • ')}</span>
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
        <span>{heroes.length}</span>
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
  troopSummary: string
  siegeSummary: string
}

function ArmySection({
  troops,
  siegeMachines,
  troopSummary,
  siegeSummary,
}: ArmySectionProps) {
  const summaryParts: string[] = []

  if (troops.length) {
    summaryParts.push(`Troops ${troopSummary}`)
  }

  if (siegeMachines.length) {
    summaryParts.push(`Siege ${siegeSummary}`)
  }

  return (
    <section className="surface-card army-section">
      <header className="section-header">
        <div className="section-heading">
          <h2>Army</h2>
        </div>
        <span>{summaryParts.join(' • ')}</span>
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
  summary: string
  emptyLabel: string
}

function SpellSection({
  title,
  items,
  summary,
  emptyLabel,
}: SpellSectionProps) {
  return (
    <section className="surface-card army-section">
      <header className="section-header">
        <div className="section-heading">
          <h2>{title}</h2>
        </div>
        <span>{summary}</span>
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

  return (
    <article className="unit-card">
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

        <div className="meta-row">
          {heroLoadout.pet ? (
            <span
              className={`meta-pill${heroLoadout.pet.known ? '' : ' meta-pill-warning'}`}
            >
              Pet {heroLoadout.pet.name}
            </span>
          ) : null}

          {heroLoadout.equipment.map((equipment, index) => (
            <span
              className={`meta-pill${equipment.known ? '' : ' meta-pill-warning'}`}
              key={`${equipment.id}-${index}`}
            >
              {equipment.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

function ArmyCard({ item }: { item: DecodedArmyItem }) {
  const suffixMetadata: string[] = []

  if (!item.known) {
    suffixMetadata.push('Unknown')
  }

  return (
    <article className="unit-card">
      <div className={`unit-icon unit-icon-${item.kind}`}>
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
                  <HousingSpaceIcon />
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

function HousingSpaceIcon() {
  return (
    <svg
      aria-hidden="true"
      className="unit-space-icon"
      viewBox="0 0 16 16"
    >
      <path d="M8 1.5 13.5 4v8L8 14.5 2.5 12V4L8 1.5Z" />
      <path d="M8 1.5V7m5.5-3L8 7m-5.5-3L8 7" />
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

function formatSectionSummary(totals: ReturnType<typeof getItemTotals>) {
  return `${totals.count} • ${totals.housingSpace} space`
}

function isSiegeMachine(item: DecodedArmyItem) {
  return item.kind === 'troop' && item.group === 'Siege Machine'
}

export default App
