'use client'

import { useEffect, useRef } from 'react'
import { Player } from '@/lib/types'
import { TOTAL_STEPS } from '@/lib/gameData'

interface WinPopupProps {
  winner: Player
  allPlayers: Player[]
  onPlayAgain: () => void
}

const RANK_MEDALS = ['🥇', '🥈', '🥉']

export default function WinPopup({ winner, allPlayers, onPlayAgain }: WinPopupProps) {
  const confettiRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = confettiRef.current
    if (!container) return

    const colors = ['#F5C518', '#F97316', '#EF4444', '#3B82F6', '#22C55E', '#A855F7', '#EC4899', '#ffffff', '#FFD700']
    const shapes = ['circle', 'square', 'triangle']
    const pieces: HTMLDivElement[] = []

    for (let i = 0; i < 120; i++) {
      setTimeout(() => {
        const el = document.createElement('div')
        const shape = shapes[Math.floor(Math.random() * shapes.length)]
        const size = Math.random() * 12 + 6

        el.style.cssText = `
          position: absolute;
          left: ${Math.random() * 100}%;
          top: -20px;
          width: ${size}px;
          height: ${size}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: ${shape === 'circle' ? '50%' : shape === 'square' ? '2px' : '0'};
          ${shape === 'triangle' ? 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);' : ''}
          animation-duration: ${Math.random() * 3 + 2}s;
          animation-delay: ${Math.random() * 0.3}s;
          opacity: 1;
          box-shadow: 0 0 6px currentColor;
        `
        el.className = 'anim-confetti'
        container.appendChild(el)
        pieces.push(el)
        setTimeout(() => el.remove(), 5000)
      }, i * 25)
    }

    return () => pieces.forEach((el) => el.remove())
  }, [])

  const sorted = [...allPlayers].sort((a, b) => b.position - a.position)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-hidden">
      {/* Confetti container */}
      <div ref={confettiRef} className="fixed inset-0 pointer-events-none overflow-hidden z-40" />

      {/* Spotlight effect */}
      <div
        className="fixed inset-0 pointer-events-none z-30"
        style={{
          background: `radial-gradient(ellipse at center, ${winner.color}20 0%, transparent 50%)`,
        }}
      />

      <div className="w-full max-w-md anim-pop-in relative z-50">
        <div
          className="rounded-3xl border-4 p-8 text-center space-y-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a0a00 0%, #3d2000 30%, #2d1500 70%, #1a0a00 100%)',
            borderColor: '#F5C518',
            boxShadow: '0 0 100px rgba(245,197,24,0.5), 0 0 200px rgba(245,197,24,0.2), inset 0 2px 0 rgba(255,255,255,0.1)',
          }}
        >
          {/* Decorative rays */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: `
                repeating-conic-gradient(
                  from 0deg at 50% 30%,
                  transparent 0deg,
                  rgba(245,197,24,0.15) 3deg,
                  transparent 6deg
                )
              `,
              animation: 'spinSlow 20s linear infinite',
            }}
          />

          {/* Golden glow orb */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full blur-3xl opacity-50"
            style={{ background: 'linear-gradient(135deg, #F5C518, #F97316)' }}
          />

          {/* Trophy with enhanced effects */}
          <div className="relative pt-4">
            <div
              className="text-9xl anim-float relative z-10"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(245,197,24,0.8)) drop-shadow(0 0 80px rgba(245,197,24,0.4))',
              }}
            >
              🏆
            </div>
            {/* Sparkles */}
            <span className="absolute top-0 left-1/4 text-2xl anim-float">✨</span>
            <span className="absolute top-8 right-1/4 text-xl anim-float" style={{ animationDelay: '0.5s' }}>⭐</span>
            <span className="absolute bottom-0 left-1/3 text-lg anim-float" style={{ animationDelay: '1s' }}>✨</span>
            <span className="absolute bottom-4 right-1/3 text-2xl anim-float" style={{ animationDelay: '1.5s' }}>⭐</span>
          </div>

          {/* Winner info */}
          <div className="relative space-y-4">
            <p className="text-yellow-400 text-sm font-black uppercase tracking-[0.3em]">
              Người chiến thắng
            </p>

            {/* Winner avatar */}
            <div className="relative inline-block">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl border-4 mx-auto anim-pulse-gold"
                style={{
                  background: `linear-gradient(135deg, ${winner.color} 0%, ${winner.color}aa 100%)`,
                  borderColor: '#F5C518',
                  boxShadow: `0 0 40px ${winner.color}60, 0 0 80px rgba(245,197,24,0.3)`,
                }}
              >
                {winner.avatar}
              </div>
              {/* Crown */}
              <span
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl anim-crown"
                style={{ filter: 'drop-shadow(0 0 10px rgba(245,197,24,0.8))' }}
              >
                👑
              </span>
            </div>

            {/* Winner name */}
            <h2
              className="text-4xl font-black neon-gold"
              style={{
                background: `linear-gradient(135deg, ${winner.color} 0%, #F5C518 50%, ${winner.color} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {winner.name}
            </h2>

            <p className="text-yellow-300 font-bold flex items-center justify-center gap-2">
              <span className="text-2xl">🎉</span>
              <span>Đã tìm được Kho Báu Huyền Thoại!</span>
              <span className="text-2xl">🎉</span>
            </p>
          </div>

          {/* Rankings */}
          <div
            className="rounded-2xl p-4 space-y-3 relative"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider text-center mb-3 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
              Bảng xếp hạng
              <span className="w-8 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
            </p>

            {sorted.map((p, rank) => (
              <div
                key={p.id}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                  p.id === winner.id ? 'bg-yellow-400/10 border border-yellow-400/30' : ''
                }`}
              >
                <span className="text-2xl w-8 text-center">
                  {RANK_MEDALS[rank] ?? <span className="text-slate-500 text-sm">#{rank + 1}</span>}
                </span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border-2 flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${p.color} 0%, ${p.color}aa 100%)`,
                    borderColor: p.id === winner.id ? '#F5C518' : 'rgba(255,255,255,0.2)',
                  }}
                >
                  {p.avatar}
                </div>
                <span className="font-bold text-base flex-1">{p.name}</span>
                <div className="text-right">
                  <span className="text-lg font-black" style={{ color: p.color }}>
                    {p.position}
                  </span>
                  <span className="text-xs text-slate-500">/{TOTAL_STEPS}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Play again button */}
          <button
            onClick={onPlayAgain}
            className="btn-premium w-full py-5 rounded-2xl font-black text-xl text-black transition-all
              hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(245,197,24,0.6)] active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-3">
              <span className="text-2xl">🔄</span>
              <span>CHƠI LẠI</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
