'use client'

import { Tile } from '@/lib/types'

// ─── TileCard ──────────────────────────────────────────────────────────────────

interface TileCardProps {
  tile: Tile
  index: number
  canClick: boolean
  isRevealing: boolean
  onSelect: (id: number) => void
}

function TileCard({ tile, index, canClick, isRevealing, onSelect }: TileCardProps) {
  const frontState = canClick
    ? 'tc-front--active'
    : tile.revealed
    ? 'tc-front--hidden'
    : 'tc-front--locked'

  return (
    <div
      className="tc-wrap aspect-square"
      style={{ animationDelay: `${index * 0.025}s` }}
      onClick={() => canClick && onSelect(tile.id)}
      role={canClick ? 'button' : undefined}
      aria-label={canClick ? `Mở ô ${tile.id + 1}` : undefined}
    >
      {/* 3-D flip container — must wrap both faces */}
      <div className={`tc-inner${tile.revealed ? ' tc-inner--flipped' : ''}`}>

        {/* Front face: unrevealed */}
        <div className={`tc-face tc-front ${frontState}`}>
          <div className="tc-bevel" aria-hidden="true" />
          {canClick && <div className="tc-shimmer" aria-hidden="true" />}

          <div className="tc-icon-box">
            <span className="tc-icon" aria-hidden="true">📦</span>
          </div>
          <span className="tc-num">{tile.id + 1}</span>

          {!canClick && !tile.revealed && (
            <span className="tc-lock" aria-hidden="true">🔒</span>
          )}
        </div>

        {/* Back face: revealed */}
        <div className={`tc-face tc-back tc-back--${tile.type}`}>
          <div className="tc-icon-box">
            <span className="tc-icon" aria-hidden="true">
              {tile.type === 'question' ? '❓' : '🎁'}
            </span>
          </div>
          <span className="tc-type-label">
            {tile.type === 'question' ? 'Câu hỏi' : 'Phần quà'}
          </span>
        </div>

      </div>{/* /tc-inner */}

      {/* Reveal burst overlay — outside tc-inner so it sits on top always */}
      {isRevealing && (
        <div className="tc-burst" aria-hidden="true">
          <div className="tc-burst-pulse" />
          <div className="tc-burst-ring" />
        </div>
      )}
    </div>
  )
}

// ─── TileGrid ─────────────────────────────────────────────────────────────────

interface TileGridProps {
  tiles: Tile[]
  canSelect: boolean
  onSelect: (id: number) => void
  revealingId: number | null
}

const LEGEND = [
  { icon: '📦', label: 'Chưa mở' },
  { icon: '❓', label: 'Câu hỏi' },
  { icon: '🎁', label: 'Phần quà' },
] as const

export default function TileGrid({ tiles, canSelect, onSelect, revealingId }: TileGridProps) {
  const revealedCount = tiles.filter(t => t.revealed).length
  const totalTiles    = tiles.length
  const questionLeft  = tiles.filter(t => !t.revealed && t.type === 'question').length
  const giftLeft      = tiles.filter(t => !t.revealed && t.type === 'gift').length
  const progressPct   = totalTiles > 0 ? (revealedCount / totalTiles) * 100 : 0

  return (
    <div className={`tg-root glass-card rounded-2xl${!canSelect ? ' tg-root--locked' : ''}`}>

      {/* Header */}
      <div className="tg-header">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none select-none">🗺️</span>
          <h2 className="tg-title">Bản đồ kho báu</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="tile-count-q">❓ {questionLeft}</span>
          <span className="tile-count-g">🎁 {giftLeft}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="tg-progress">
        <div className="tg-progress-meta">
          <span className="tg-progress-label">Tiến trình khám phá</span>
          <span className="tg-progress-count">{revealedCount}/{totalTiles}</span>
        </div>
        <div className="tg-progress-track">
          <div className="tg-progress-fill" style={{ width: `${progressPct}%` }}>
            {progressPct > 5 && <div className="tg-progress-sheen" />}
          </div>
        </div>
      </div>

      {/* Tile grid */}
      <div className={`tg-scroll custom-scroll${!canSelect ? ' pointer-events-none' : ''}`}>
        <div className="tg-grid">
          {tiles.map((tile, index) => (
            <TileCard
              key={tile.id}
              tile={tile}
              index={index}
              canClick={canSelect && !tile.revealed}
              isRevealing={revealingId === tile.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="tg-legend">
        {LEGEND.map(({ icon, label }) => (
          <div key={label} className="tg-legend-item">
            <span className="select-none">{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
