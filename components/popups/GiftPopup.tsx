'use client'

import { GiftData, Player } from '@/lib/types'

interface GiftPopupProps {
  gift: GiftData
  currentPlayer: Player
  allPlayers: Player[]
  phase: 'gift' | 'choose_freeze_target'
  onClaim: () => void
  onFreezeTarget: (targetId: number) => void
}

const GIFT_COLORS: Record<string, { bg: string; border: string; glow: string }> = {
  bonus_1: { bg: 'linear-gradient(145deg, #065f46, #059669)', border: '#10b981', glow: 'rgba(16,185,129,0.4)' },
  bonus_2: { bg: 'linear-gradient(145deg, #1e40af, #3b82f6)', border: '#60a5fa', glow: 'rgba(59,130,246,0.4)' },
  bonus_3: { bg: 'linear-gradient(145deg, #7c2d12, #ea580c)', border: '#fb923c', glow: 'rgba(251,146,60,0.4)' },
  extra_turn: { bg: 'linear-gradient(145deg, #166534, #22c55e)', border: '#4ade80', glow: 'rgba(74,222,128,0.4)' },
  shield: { bg: 'linear-gradient(145deg, #1e3a8a, #3b82f6)', border: '#60a5fa', glow: 'rgba(96,165,250,0.4)' },
  freeze: { bg: 'linear-gradient(145deg, #0e7490, #06b6d4)', border: '#22d3ee', glow: 'rgba(34,211,238,0.4)' },
  swap: { bg: 'linear-gradient(145deg, #6b21a8, #a855f7)', border: '#c084fc', glow: 'rgba(192,132,252,0.4)' },
  double_loot: { bg: 'linear-gradient(145deg, #92400e, #f59e0b)', border: '#fbbf24', glow: 'rgba(251,191,36,0.4)' },
}

export default function GiftPopup({
  gift,
  currentPlayer,
  allPlayers,
  phase,
  onClaim,
  onFreezeTarget,
}: GiftPopupProps) {
  const opponents = allPlayers.filter((p) => p.id !== currentPlayer.id)
  const colors = GIFT_COLORS[gift.type] || GIFT_COLORS.bonus_1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md anim-pop-in">
        <div
          className="rounded-3xl border-2 p-6 text-center space-y-5 relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a0a00 0%, #3d2000 50%, #2d1b00 100%)',
            borderColor: '#F5C518',
            boxShadow: `0 0 80px ${colors.glow}, 0 0 120px rgba(245,197,24,0.2)`,
          }}
        >
          {/* Decorative rays */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: `
                repeating-conic-gradient(
                  from 0deg at 50% 50%,
                  transparent 0deg,
                  rgba(245,197,24,0.1) 5deg,
                  transparent 10deg
                )
              `,
              animation: 'spinSlow 30s linear infinite',
            }}
          />

          {/* Glow orb */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-3xl opacity-40"
            style={{ background: colors.border }}
          />

          {/* Player badge */}
          <div className="relative flex items-center justify-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl border-2 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${currentPlayer.color} 0%, ${currentPlayer.color}aa 100%)`,
                borderColor: 'rgba(255,255,255,0.3)',
                boxShadow: `0 4px 20px ${currentPlayer.color}50`,
              }}
            >
              {currentPlayer.avatar}
            </div>
            <div className="text-left">
              <div className="text-xs text-yellow-400/80 uppercase tracking-wider">Phần thưởng cho</div>
              <span className="font-black text-lg" style={{ color: currentPlayer.color }}>
                {currentPlayer.name}
              </span>
            </div>
          </div>

          {/* Gift icon with glow */}
          <div className="relative py-4">
            <div
              className="text-8xl anim-float relative z-10"
              style={{ filter: `drop-shadow(0 0 30px ${colors.glow})` }}
            >
              {gift.icon}
            </div>
            {/* Sparkle effects */}
            <span className="absolute top-2 left-1/4 text-yellow-400 text-xl anim-float">✨</span>
            <span className="absolute top-6 right-1/4 text-yellow-400 text-lg anim-float" style={{ animationDelay: '0.5s' }}>⭐</span>
            <span className="absolute bottom-4 left-1/3 text-yellow-400 text-sm anim-float" style={{ animationDelay: '1s' }}>✨</span>
          </div>

          {/* Gift info */}
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🎁</span>
              <h2
                className="text-3xl font-black neon-gold"
                style={{
                  background: 'linear-gradient(135deg, #F5C518 0%, #F97316 50%, #EF4444 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {gift.name}
              </h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xs mx-auto">
              {gift.description}
            </p>

            {/* Bonus steps indicator */}
            {gift.steps && gift.steps > 0 && (
              <div className="mt-3 inline-flex items-center gap-2 badge badge-gold text-sm py-1.5 px-4">
                <span>🚀</span>
                <span>+{gift.steps} bước</span>
                {currentPlayer.status.hasDoubleLoot && (
                  <span className="text-yellow-300">(x2 = +{gift.steps * 2})</span>
                )}
              </div>
            )}
          </div>

          {/* Claim button OR freeze target picker */}
          {phase === 'gift' ? (
            <button
              onClick={onClaim}
              className="btn-premium w-full py-5 rounded-2xl font-black text-xl text-black
                hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(245,197,24,0.6)] active:scale-[0.98] transition-all"
            >
              <span className="flex items-center justify-center gap-3">
                <span className="text-2xl">🎉</span>
                <span>NHẬN QUÀ!</span>
              </span>
            </button>
          ) : (
            <div className="space-y-3 relative">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-2xl">❄️</span>
                <p className="text-cyan-300 font-bold text-base">Chọn đối thủ để đóng băng</p>
              </div>

              {opponents.map((p, index) => (
                <button
                  key={p.id}
                  onClick={() => onFreezeTarget(p.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 border-white/15
                    bg-white/5 hover:border-cyan-400/70 hover:bg-cyan-500/15 hover:scale-[1.02]
                    transition-all text-left anim-slide-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl border-2 shadow-lg transition-transform group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${p.color} 0%, ${p.color}aa 100%)`,
                        borderColor: 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {p.avatar}
                    </div>
                    {p.status.hasShield && (
                      <span className="absolute -top-1 -right-1 text-sm">🛡️</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="font-bold text-base text-white">{p.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">Vị trí:</span>
                      <span className="text-sm font-bold" style={{ color: p.color }}>{p.position}</span>
                    </div>
                  </div>

                  <div className="text-cyan-400 text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    ❄️
                  </div>
                </button>
              ))}

              {opponents.some(p => p.status.hasShield) && (
                <p className="text-xs text-slate-500 mt-2">
                  💡 Người có 🛡️ sẽ mất lá chắn thay vì bị đóng băng
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
