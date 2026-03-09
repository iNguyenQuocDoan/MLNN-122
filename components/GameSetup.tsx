'use client'

import { useState } from 'react'
import { PLAYER_CONFIGS } from '@/lib/gameData'

interface GameSetupProps {
  onStart: (names: string[]) => void
  hasSavedGame?: boolean
  onContinue?: () => void
}

export default function GameSetup({ onStart, hasSavedGame, onContinue }: GameSetupProps) {
  const [count, setCount] = useState(2)
  const [names, setNames] = useState<string[]>(['', '', '', '', '', ''])
  const [isStarting, setIsStarting] = useState(false)

  const handleStart = () => {
    setIsStarting(true)
    setTimeout(() => {
      const playerNames = names
        .slice(0, count)
        .map((n, i) => n.trim() || `Người chơi ${i + 1}`)
      onStart(playerNames)
    }, 600)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      {/* Animated particles */}
      <div className="particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className={`w-full max-w-md transition-all duration-500 ${isStarting ? 'scale-95 opacity-0' : ''}`}>
        {/* Logo Section */}
        <div className="text-center mb-8">
          {/* Animated treasure chest */}
          <div className="relative inline-block">
            <div className="text-8xl anim-float drop-shadow-2xl">🏴‍☠️</div>
            {/* Glow effect behind */}
            <div
              className="absolute inset-0 blur-3xl opacity-40"
              style={{ background: 'radial-gradient(circle, #F5C518 0%, transparent 70%)' }}
            />
          </div>

          {/* Title with gradient and glow */}
          <h1
            className="text-4xl md:text-5xl font-black tracking-tight mt-4 neon-gold"
            style={{
              background: 'linear-gradient(135deg, #F5C518 0%, #F97316 50%, #EF4444 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Truy Tìm Kho Báu
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 mt-3 text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
            Mở ô bí ẩn · Trả lời câu hỏi · Giành kho báu!
            <span className="w-8 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          </p>
        </div>

        {/* Setup card */}
        <div className="glass-card rounded-3xl p-6 space-y-6 anim-slide-up">
          {/* Player count selector */}
          <div>
            <label className="flex items-center gap-2 text-yellow-400 font-bold text-sm mb-4 uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center text-xs">
                👥
              </span>
              Số người chơi
            </label>
            <div className="grid grid-cols-5 gap-3">
              {[2, 3, 4, 5, 6].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`
                    relative py-4 rounded-2xl font-black text-xl border-2 transition-all duration-300
                    ${count === n
                      ? 'border-yellow-400 text-black scale-110 glow-gold'
                      : 'border-white/15 bg-white/5 text-white hover:border-yellow-400/50 hover:bg-yellow-400/10 hover:scale-105'
                    }
                  `}
                  style={{
                    background: count === n
                      ? 'linear-gradient(135deg, #F5C518 0%, #F97316 100%)'
                      : undefined,
                  }}
                >
                  {n}
                  {count === n && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0A1628]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-xs text-slate-500 uppercase tracking-widest">Nhập tên</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Name inputs */}
          <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 anim-slide-right"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Avatar with glow */}
                <div className="relative">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-xl border-2 shadow-lg transition-transform hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${PLAYER_CONFIGS[i].color}dd, ${PLAYER_CONFIGS[i].color}88)`,
                      borderColor: 'rgba(255,255,255,0.3)',
                      boxShadow: `0 4px 15px ${PLAYER_CONFIGS[i].color}40`,
                    }}
                  >
                    {PLAYER_CONFIGS[i].avatar}
                  </div>
                  {/* Player number badge */}
                  <span
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-[#0A1628]"
                    style={{ background: PLAYER_CONFIGS[i].color }}
                  >
                    {i + 1}
                  </span>
                </div>

                {/* Input field */}
                <div className="flex-1 relative group">
                  <input
                    type="text"
                    placeholder={`Người chơi ${i + 1}`}
                    value={names[i]}
                    onChange={(e) => {
                      const next = [...names]
                      next[i] = e.target.value
                      setNames(next)
                    }}
                    maxLength={20}
                    className="w-full bg-white/5 border-2 border-white/15 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm font-medium outline-none transition-all duration-300 focus:border-yellow-400/60 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(245,197,24,0.15)] group-hover:border-white/25"
                  />
                  {/* Active indicator */}
                  {names[i] && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 text-sm">
                      ✓
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Continue button (if saved game exists) */}
          {hasSavedGame && onContinue && (
            <button
              onClick={onContinue}
              disabled={isStarting}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300
                bg-gradient-to-r from-emerald-600 to-teal-600 border-2 border-emerald-400/50
                hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-[0.98] disabled:opacity-70"
            >
              <span className="flex items-center justify-center gap-3">
                <span className="text-xl">▶️</span>
                TIẾP TỤC GAME
              </span>
            </button>
          )}

          {/* Start button */}
          <button
            onClick={handleStart}
            disabled={isStarting}
            className="btn-premium w-full py-5 rounded-2xl font-black text-xl text-black transition-all duration-300
              hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(245,197,24,0.5)] active:scale-[0.98] disabled:opacity-70"
          >
            <span className="flex items-center justify-center gap-3">
              <span className="text-2xl">{isStarting ? '⏳' : '🚀'}</span>
              {isStarting ? 'Đang tải...' : hasSavedGame ? 'BẮT ĐẦU GAME MỚI' : 'BẮT ĐẦU PHIÊU LƯU!'}
            </span>
          </button>

          {/* Rules hint */}
          <div className="text-xs text-slate-500 text-center leading-relaxed px-4">
            <span className="text-yellow-400/60">Tip:</span> Chọn ô bí ẩn → Trả lời câu hỏi hoặc nhận quà → Tiến tới kho báu trước!
          </div>
        </div>

        {/* Game features */}
        <div className="grid grid-cols-4 gap-3 mt-6">
          {[
            { icon: '❓', label: '20 câu hỏi', color: '#3B82F6' },
            { icon: '🎁', label: '10 ô quà', color: '#F5C518' },
            { icon: '🛡️', label: 'Lá chắn', color: '#22C55E' },
            { icon: '❄️', label: 'Đóng băng', color: '#67E8F9' },
          ].map((f, i) => (
            <div
              key={f.icon}
              className="glass-card rounded-2xl p-3 text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 anim-slide-up"
              style={{
                animationDelay: `${0.4 + i * 0.1}s`,
                borderColor: `${f.color}30`,
              }}
            >
              <div
                className="text-2xl mb-1 drop-shadow-lg"
                style={{ filter: `drop-shadow(0 0 8px ${f.color}60)` }}
              >
                {f.icon}
              </div>
              <div className="text-[10px] font-bold text-slate-400">{f.label}</div>
            </div>
          ))}
        </div>

        {/* Version badge */}
        <div className="text-center mt-6">
          <span className="badge badge-gold">
            <span>✨</span>
            <span>Version 2.0</span>
          </span>
        </div>
      </div>
    </div>
  )
}
