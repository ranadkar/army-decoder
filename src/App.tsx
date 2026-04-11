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
                <span className="meta-chip">
                  Troops {decodedArmy.totalTroopCount}
                </span>
                <span className="meta-chip">
                  Spells {decodedArmy.totalSpellCount}
                </span>
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
                title="Troops"
                items={decodedArmy.troops}
                totalCount={decodedArmy.totalTroopCount}
                emptyLabel="No troop entries."
              />

              <ArmySection
                title="Spells"
                items={decodedArmy.spells}
                totalCount={decodedArmy.totalSpellCount}
                emptyLabel="No spell entries."
              />
            </section>
          </>
        ) : null}
      </div>
    </main>
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
  title: string
  items: DecodedArmyItem[]
  totalCount: number
  emptyLabel: string
}

function ArmySection({ title, items, totalCount, emptyLabel }: ArmySectionProps) {
  return (
    <section className="surface-card army-section">
      <header className="section-header">
        <div className="section-heading">
          <h2>{title}</h2>
        </div>
        <span>{totalCount}</span>
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
  const metadata = [`ID ${item.id}`]

  if (item.source === 'clan-castle') {
    metadata.push('Clan Castle')
  }

  if (!item.known) {
    metadata.push('Unknown')
  }

  return (
    <article className="unit-card">
      <div className={`unit-icon unit-icon-${item.kind}`}>
        {getMonogram(item.name)}
      </div>

      <div className="unit-body">
        <div className="unit-title-row">
          <div className="unit-copy">
            <div className="unit-name-line">
              <strong className="unit-name">{item.name}</strong>
              <span
                className={`unit-meta-inline${item.known ? '' : ' unit-meta-inline-warning'}`}
              >
                {metadata.join(' • ')}
              </span>
            </div>
            <p className="unit-group">{item.group}</p>
          </div>
          <span className="count-pill">x{item.count}</span>
        </div>
      </div>
    </article>
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

export default App
