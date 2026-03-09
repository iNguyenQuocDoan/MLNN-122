'use client'

import { Tile } from '@/lib/types'

interface TileGridProps {
  tiles: Tile[]
  canSelect: boolean
  onSelect: (id: number) => void
  revealingId: number | null
}

export default function TileGrid({ tiles, canSelect, onSelect, revealingId }: TileGridProps) {
  const revealedCount = tiles.filter(t => t.revealed).length
  const totalTiles = tiles.length

  return (
    <div className={`glass-card rounded-2xl p-4 transition-all duration-300 h-full flex flex-col ${!canSelect ? 'opacity-85' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">🗺️</span>
          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            Bản đồ kho báu
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge badge-gold text-xs">
            <span>📦</span>
            <span>{totalTiles - revealedCount} ô còn lại</span>
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4 shrink-0">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(revealedCount / totalTiles) * 100}%`,
            background: 'linear-gradient(90deg, #F5C518, #F97316)',
          }}
        />
      </div>

      {/* Tile grid - larger tiles with responsive columns */}
      <div className={`flex-1 min-h-0 overflow-y-auto custom-scroll ${!canSelect ? 'pointer-events-none' : ''}`}>
        <div className="grid grid-cols-5 lg:grid-cols-6 gap-3">
        {tiles.map((tile, index) => {
          const isRevealing = revealingId === tile.id
          const canClick = canSelect && !tile.revealed

          return (
            <div
              key={tile.id}
              className="tile-wrapper aspect-square"
              style={{ animationDelay: `${index * 0.02}s` }}
              onClick={() => canClick && onSelect(tile.id)}
            >
              <div className={`tile-inner ${tile.revealed ? 'flipped' : ''}`}>
                {/* Front face (unrevealed) */}
                <div
                  className={`
                    tile-face tile-front-face border-2 transition-all duration-300
                    ${canClick
                      ? 'tile-shimmer cursor-pointer hover:scale-110 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(245,197,24,0.5)] active:scale-95'
                      : tile.revealed
                      ? 'cursor-default'
                      : 'cursor-default opacity-40'
                    }
                  `}
                  style={{
                    background: canClick
                      ? 'linear-gradient(145deg, #6D4423 0%, #8B5A2B 30%, #5C3A1E 70%, #4A2C10 100%)'
                      : 'linear-gradient(145deg, #3D2413 0%, #4B3520 50%, #2A1A0C 100%)',
                    borderColor: canClick ? '#B8860B' : '#3a2510',
                    boxShadow: canClick
                      ? 'inset 0 2px 4px rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.3)'
                      : 'none',
                  }}
                >
                  {/* Chest icon with glow */}
                  <div className="relative">
                    <span
                      className="text-3xl select-none drop-shadow-lg"
                      style={{
                        filter: canClick ? 'drop-shadow(0 0 10px rgba(245,197,24,0.4))' : 'none',
                      }}
                    >
                      📦
                    </span>
                  </div>
                  {/* Tile number */}
                  <span
                    className="text-xs font-black mt-1 transition-colors"
                    style={{ color: canClick ? 'rgba(255,215,0,0.7)' : 'rgba(255,215,0,0.25)' }}
                  >
                    {tile.id + 1}
                  </span>

                  {/* Lock icon for non-selectable */}
                  {!canClick && !tile.revealed && (
                    <span className="absolute bottom-1 right-1 text-[8px] opacity-50">🔒</span>
                  )}
                </div>

                {/* Back face (revealed) */}
                <div
                  className={`tile-face tile-back-face border-2 ${
                    tile.type === 'question'
                      ? 'border-blue-400/70'
                      : 'border-yellow-400/70'
                  }`}
                  style={{
                    background:
                      tile.type === 'question'
                        ? 'linear-gradient(145deg, #1e3a8a 0%, #2563eb 50%, #1d4ed8 100%)'
                        : 'linear-gradient(145deg, #92400e 0%, #d97706 50%, #b45309 100%)',
                    boxShadow:
                      tile.type === 'question'
                        ? '0 4px 15px rgba(59,130,246,0.3), inset 0 2px 4px rgba(255,255,255,0.1)'
                        : '0 4px 15px rgba(245,197,24,0.3), inset 0 2px 4px rgba(255,255,255,0.1)',
                  }}
                >
                  <span
                    className="text-3xl select-none"
                    style={{
                      filter: tile.type === 'question'
                        ? 'drop-shadow(0 0 10px rgba(59,130,246,0.6))'
                        : 'drop-shadow(0 0 10px rgba(245,197,24,0.6))',
                    }}
                  >
                    {tile.type === 'question' ? '❓' : '🎁'}
                  </span>
                  <span
                    className={`text-[10px] font-black mt-1 uppercase tracking-wider ${
                      tile.type === 'question' ? 'text-blue-200' : 'text-yellow-200'
                    }`}
                  >
                    {tile.type === 'question' ? 'Hỏi' : 'Quà'}
                  </span>
                </div>
              </div>

              {/* Revealing shimmer overlay */}
              {isRevealing && (
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-10">
                  <div
                    className="absolute inset-0 animate-pulse"
                    style={{
                      background: 'radial-gradient(circle, rgba(245,197,24,0.6) 0%, rgba(245,197,24,0.2) 50%, transparent 70%)',
                    }}
                  />
                  <div className="absolute inset-0 bg-white/20 animate-ping" />
                </div>
              )}
            </div>
          )
        })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base">❓</span>
          <span className="text-xs text-slate-400">Câu hỏi</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base">🎁</span>
          <span className="text-xs text-slate-400">Phần quà</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base">📦</span>
          <span className="text-xs text-slate-400">Chưa mở</span>
        </div>
      </div>
    </div>
  )
}
