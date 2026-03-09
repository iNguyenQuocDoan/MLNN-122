'use client'

import { Player } from '@/lib/types'
import { TOTAL_STEPS } from '@/lib/gameData'

interface PlayerPanelProps {
  players: Player[]
  currentPlayerIndex: number
}

const RANK_MEDALS = ['🥇', '🥈', '🥉']

export default function PlayerPanel({ players, currentPlayerIndex }: PlayerPanelProps) {
  const sorted = [...players].sort((a, b) => b.position - a.position)

  return (
    <div className="glass-card rounded-2xl px-3 py-2">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">👥</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Người chơi
        </span>
        <span className="text-[10px] text-slate-500 ml-auto">{players.length} người</span>
      </div>

      {/* Vertical player list */}
      <div className="flex flex-col gap-2">
        {sorted.map((player, rank) => {
          const isActive = player.id === players[currentPlayerIndex]?.id
          const progress = (player.position / TOTAL_STEPS) * 100
          const hasStatus = player.status.hasShield || player.status.isFrozen || player.status.hasDoubleLoot || player.status.extraTurns > 0

          return (
            <div
              key={player.id}
              className={`
                rounded-xl px-3 py-2 border transition-all duration-500
                ${isActive ? 'scale-[1.02]' : 'opacity-80 hover:opacity-100'}
              `}
              style={{
                borderColor: isActive ? player.color : 'rgba(255,255,255,0.1)',
                background: isActive
                  ? `linear-gradient(135deg, ${player.color}20 0%, ${player.color}08 100%)`
                  : 'rgba(255,255,255,0.03)',
                boxShadow: isActive
                  ? `0 0 15px ${player.color}30, inset 0 1px 0 rgba(255,255,255,0.1)`
                  : 'none',
              }}
            >
              {/* Row: Rank + Avatar + Name + Position */}
              <div className="flex items-center gap-2">
                {/* Rank */}
                <span className="text-sm leading-none w-5 text-center shrink-0">
                  {RANK_MEDALS[rank] ?? <span className="text-slate-500 text-[10px]">#{rank + 1}</span>}
                </span>

                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className={`
                      w-7 h-7 rounded-full flex items-center justify-center text-sm border-2 transition-all duration-300
                      ${isActive ? 'anim-pulse-player' : ''}
                    `}
                    style={{
                      background: `linear-gradient(135deg, ${player.color} 0%, ${player.color}aa 100%)`,
                      borderColor: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                      boxShadow: isActive ? `0 0 10px ${player.color}60` : 'none',
                    }}
                  >
                    {player.avatar}
                  </div>
                  {isActive && (
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0A1628]"
                      style={{ background: '#22c55e' }}
                    />
                  )}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <div
                    className="text-xs font-bold truncate leading-tight"
                    style={{ color: isActive ? player.color : '#e2e8f0' }}
                  >
                    {player.name}
                  </div>
                </div>

                {/* Position */}
                <div className="text-right shrink-0">
                  <span
                    className="text-sm font-black tabular-nums"
                    style={{ color: player.color }}
                  >
                    {player.position}
                  </span>
                  <span className="text-[9px] text-slate-500">/{TOTAL_STEPS}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-white/10 rounded-full overflow-hidden mt-1.5 relative">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out relative"
                  style={{
                    width: `${Math.max(progress, 2)}%`,
                    background: `linear-gradient(90deg, ${player.color}90, ${player.color})`,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                      animation: progress > 10 ? 'shimmerSweep 2s ease-in-out infinite' : 'none',
                    }}
                  />
                </div>
              </div>

              {/* Status badges - compact */}
              {hasStatus && (
                <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                  {player.status.hasShield && (
                    <span className="text-[9px]" title="Lá chắn">🛡️</span>
                  )}
                  {player.status.isFrozen && (
                    <span className="text-[9px] animate-pulse" title="Đóng băng">❄️</span>
                  )}
                  {player.status.hasDoubleLoot && (
                    <span className="text-[9px]" title="Nhân đôi">✨</span>
                  )}
                  {player.status.extraTurns > 0 && (
                    <span className="text-[9px] text-green-400" title="Lượt thêm">+{player.status.extraTurns}</span>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
