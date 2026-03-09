'use client'

import { Player } from '@/lib/types'
import { TOTAL_STEPS } from '@/lib/gameData'

interface RaceTrackProps {
  players: Player[]
}

export default function RaceTrack({ players }: RaceTrackProps) {
  const getPlayersAtPos = (pos: number) => players.filter((p) => p.position === pos)
  const sorted = [...players].sort((a, b) => b.position - a.position)
  const leader = sorted[0]

  // Generate vertical track positions: 0 to TOTAL_STEPS
  const trackPositions = Array.from({ length: TOTAL_STEPS + 1 }, (_, i) => i)

  const cellColor = (pos: number) => {
    if (pos === 0) {
      return {
        bg: 'linear-gradient(135deg, rgba(34,197,94,0.3) 0%, rgba(16,185,129,0.2) 100%)',
        border: 'rgba(34,197,94,0.7)',
        glow: 'rgba(34,197,94,0.3)',
      }
    }
    if (pos === TOTAL_STEPS) {
      return {
        bg: 'linear-gradient(135deg, rgba(245,197,24,0.4) 0%, rgba(249,115,22,0.3) 100%)',
        border: '#F5C518',
        glow: 'rgba(245,197,24,0.5)',
      }
    }
    const t = pos / TOTAL_STEPS
    const r = Math.round(34 + (245 - 34) * t)
    const g = Math.round(197 - (197 - 150) * t * 0.5)
    const b = Math.round(94 - 70 * t)
    return {
      bg: `linear-gradient(135deg, rgba(${r},${g},${b},0.12) 0%, rgba(${r},${g},${b},0.06) 100%)`,
      border: `rgba(${r},${g},${b},0.35)`,
      glow: `rgba(${r},${g},${b},0.2)`,
    }
  }

  return (
    <div className="glass-card rounded-2xl px-3 py-3 flex-1 min-h-0 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base">🏁</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Đường đua
          </span>
        </div>
        {leader && leader.position > 0 && (
          <div className="flex items-center gap-1 text-[10px]">
            <span>👑</span>
            <span className="font-bold text-yellow-400 truncate max-w-[60px]">{leader.name}</span>
          </div>
        )}
      </div>

      {/* Vertical Track */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scroll">
        <div className="flex flex-col gap-1 relative px-1">
          {/* Finish line at top */}
          {trackPositions.slice().reverse().map((pos) => {
            const playersHere = getPlayersAtPos(pos)
            const isStart = pos === 0
            const isFinish = pos === TOTAL_STEPS
            const { bg, border, glow } = cellColor(pos)
            const isLeaderHere = leader && leader.position === pos && pos > 0

            return (
              <div
                key={pos}
                className={`
                  relative h-8 rounded-lg flex items-center px-2 gap-2
                  border transition-all duration-500
                  ${isFinish ? 'anim-track-glow' : ''}
                  ${isStart ? 'anim-breathe' : ''}
                `}
                style={{
                  background: bg,
                  borderColor: border,
                  boxShadow: playersHere.length > 0 ? `0 0 12px ${glow}` : 'none',
                }}
              >
                {/* Position number */}
                <div className="w-6 shrink-0 text-center">
                  {isStart ? (
                    <span className="text-emerald-400 text-[9px] font-black">START</span>
                  ) : isFinish ? (
                    <span className="text-lg" style={{ filter: 'drop-shadow(0 0 6px rgba(245,197,24,0.8))' }}>
                      💰
                    </span>
                  ) : (
                    <span className="text-slate-500 text-[10px] font-bold">{pos}</span>
                  )}
                </div>

                {/* Progress bar line */}
                <div className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: '100%',
                      background: `linear-gradient(90deg, ${border}, transparent)`,
                      opacity: 0.3,
                    }}
                  />
                </div>

                {/* Player tokens */}
                <div className="flex items-center -space-x-1.5 shrink-0">
                  {playersHere.slice(0, 4).map((p, idx) => (
                    <div
                      key={p.id}
                      title={`${p.name} - ${p.position}/${TOTAL_STEPS}`}
                      className="relative w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 border-white/50 shadow-lg transition-all duration-300 hover:scale-125 hover:z-20"
                      style={{
                        background: `linear-gradient(135deg, ${p.color} 0%, ${p.color}bb 100%)`,
                        zIndex: 10 - idx,
                        boxShadow: `0 2px 8px ${p.color}60`,
                      }}
                    >
                      {p.avatar}
                      {p.status.hasShield && (
                        <span className="absolute -top-1 -right-1 text-[6px]">🛡️</span>
                      )}
                      {p.status.isFrozen && (
                        <span className="absolute -bottom-1 -right-1 text-[6px] animate-pulse">❄️</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Leader crown */}
                {isLeaderHere && (
                  <span
                    className="absolute -left-1 top-1/2 -translate-y-1/2 text-xs anim-crown"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(245,197,24,0.8))' }}
                  >
                    👑
                  </span>
                )}

                {/* Checkpoint markers */}
                {pos > 0 && pos < TOTAL_STEPS && pos % 5 === 0 && playersHere.length === 0 && (
                  <span className="absolute right-1 text-[8px] opacity-50">⭐</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Mini leaderboard */}
      <div className="flex items-center justify-center gap-3 mt-2 pt-2 border-t border-white/10 shrink-0">
        {sorted.slice(0, 3).map((p, rank) => (
          <div key={p.id} className="flex items-center gap-1">
            <span className="text-[10px]">
              {rank === 0 ? '🥇' : rank === 1 ? '🥈' : '🥉'}
            </span>
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] border border-white/30"
              style={{ background: p.color }}
            >
              {p.avatar}
            </div>
            <span className="text-[9px] font-bold" style={{ color: p.color }}>
              {p.position}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
