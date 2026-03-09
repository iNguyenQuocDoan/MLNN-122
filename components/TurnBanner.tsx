'use client'

import { Player, GamePhase } from '@/lib/types'

interface TurnBannerProps {
  currentPlayer: Player
  phase: GamePhase
  tilesLeft: number
}

const PHASE_LABELS: Partial<Record<GamePhase, { text: string; emoji: string; color: string }>> = {
  selecting:            { text: 'Chọn một ô bí ẩn!',           emoji: '🎲', color: '#F5C518' },
  question:             { text: 'Đang trả lời câu hỏi...',      emoji: '❓', color: '#3B82F6' },
  answer_result:        { text: 'Xem kết quả...',               emoji: '📊', color: '#22C55E' },
  gift:                 { text: 'Nhận quà!',                    emoji: '🎁', color: '#F97316' },
  choose_freeze_target: { text: 'Chọn đối thủ để đóng băng!',  emoji: '❄️', color: '#22D3EE' },
}

export default function TurnBanner({ currentPlayer, phase, tilesLeft }: TurnBannerProps) {
  const label = PHASE_LABELS[phase]
  const isFrozen = currentPlayer.status.isFrozen
  const hasDouble = currentPlayer.status.hasDoubleLoot
  const hasShield = currentPlayer.status.hasShield
  const extraTurns = currentPlayer.status.extraTurns

  return (
    <div
      className="glass-card rounded-2xl px-3 py-3 border-2 transition-all duration-500 relative overflow-hidden"
      style={{
        borderColor: currentPlayer.color,
        boxShadow: `0 0 25px ${currentPlayer.color}30, inset 0 1px 0 rgba(255,255,255,0.1)`,
      }}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${currentPlayer.color}40 0%, transparent 70%)`,
        }}
      />

      {/* Sweep animation */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${currentPlayer.color}10 50%, transparent 100%)`,
          animation: 'shimmerSweep 3s ease-in-out infinite',
        }}
      />

      {/* Top row: Avatar + Name + Tiles */}
      <div className="flex items-center gap-3 relative">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl border-2 shadow-lg transition-transform hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${currentPlayer.color} 0%, ${currentPlayer.color}aa 100%)`,
              borderColor: 'rgba(255,255,255,0.4)',
              boxShadow: `0 4px 15px ${currentPlayer.color}50`,
            }}
          >
            {currentPlayer.avatar}
          </div>
          <div
            className="absolute inset-0 rounded-xl anim-breathe pointer-events-none"
            style={{ boxShadow: `0 0 0 2px ${currentPlayer.color}40` }}
          />
          <span
            className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#0A1628] flex items-center justify-center text-[7px]"
            style={{ background: '#22c55e' }}
          >
            ▶
          </span>
        </div>

        {/* Name + Turn label */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
              Đến lượt
            </span>
            {extraTurns > 0 && (
              <span className="badge badge-green text-[7px] py-0">
                +{extraTurns}
              </span>
            )}
          </div>
          <div
            className="text-lg font-black leading-tight truncate"
            style={{ color: currentPlayer.color }}
          >
            {currentPlayer.name}
          </div>
        </div>

        {/* Tiles counter */}
        <div className="shrink-0 text-center">
          <div
            className="text-xl font-black tabular-nums"
            style={{
              background: 'linear-gradient(135deg, #F5C518, #F97316)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {tilesLeft}
          </div>
          <div className="text-[8px] text-slate-500 uppercase tracking-wider font-bold">
            ô còn lại
          </div>
        </div>
      </div>

      {/* Phase indicator */}
      {label && (
        <div
          className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/10"
          style={{ color: label.color }}
        >
          <span className="text-sm">{label.emoji}</span>
          <span className="text-xs font-bold">{label.text}</span>
        </div>
      )}

      {/* Status badges - inline */}
      {(hasShield || isFrozen || hasDouble) && (
        <div className="flex items-center gap-1.5 mt-2">
          {hasShield && (
            <span className="badge badge-blue text-[8px] py-0.5">
              <span>🛡️</span>
              <span>Lá chắn</span>
            </span>
          )}
          {isFrozen && (
            <span className="badge badge-blue text-[8px] py-0.5 animate-pulse">
              <span>❄️</span>
              <span>Đóng băng</span>
            </span>
          )}
          {hasDouble && (
            <span className="badge badge-gold text-[8px] py-0.5 anim-heartbeat">
              <span>✨</span>
              <span>Nhân đôi</span>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
