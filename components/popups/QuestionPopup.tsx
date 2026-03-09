'use client'

import { QuestionData, Player } from '@/lib/types'

interface QuestionPopupProps {
  question: QuestionData
  currentPlayer: Player
  selectedAnswer: number | null
  isCorrect: boolean | null
  pendingSteps: number
  hasDoubleLoot: boolean
  onAnswer: (idx: number) => void
  onContinue: () => void
}

const LETTERS = ['A', 'B', 'C', 'D']

export default function QuestionPopup({
  question,
  currentPlayer,
  selectedAnswer,
  isCorrect,
  pendingSteps,
  hasDoubleLoot,
  onAnswer,
  onContinue,
}: QuestionPopupProps) {
  const answered = selectedAnswer !== null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-lg anim-pop-in">
        <div
          className="rounded-3xl border-2 p-6 space-y-5 relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #0f1f3d 0%, #1e3a8a 50%, #1e1b4b 100%)',
            borderColor: currentPlayer.color,
            boxShadow: `0 0 60px ${currentPlayer.color}40, inset 0 1px 0 rgba(255,255,255,0.1)`,
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30"
            style={{ background: currentPlayer.color }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-20"
            style={{ background: '#3B82F6' }}
          />

          {/* Header */}
          <div className="flex items-center gap-4 relative">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border-2 shrink-0 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${currentPlayer.color} 0%, ${currentPlayer.color}aa 100%)`,
                borderColor: 'rgba(255,255,255,0.3)',
                boxShadow: `0 4px 20px ${currentPlayer.color}50`,
              }}
            >
              {currentPlayer.avatar}
            </div>
            <div className="flex-1">
              <div className="text-xs text-blue-300 uppercase tracking-wider font-bold">
                Thử thách tri thức
              </div>
              <div className="font-black text-lg text-white flex items-center gap-2">
                {currentPlayer.name}
                {hasDoubleLoot && (
                  <span className="badge badge-gold anim-heartbeat">
                    <span>✨</span>
                    <span>NHÂN ĐÔI</span>
                  </span>
                )}
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm font-bold text-emerald-300">Không giới hạn thời gian</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">tập trung tư duy</div>
            </div>
          </div>

          {/* Question */}
          <div
            className="rounded-2xl p-5 text-center border relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
              borderColor: 'rgba(255,255,255,0.15)',
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-3xl">❓</span>
              <span className="badge badge-blue">Câu hỏi</span>
            </div>
            <p className="font-bold text-lg text-white leading-relaxed">
              {question.text}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {question.options.map((opt, i) => {
              let bgStyle: React.CSSProperties = {}
              let className =
                'w-full text-left px-4 py-4 rounded-2xl border-2 font-semibold text-sm transition-all duration-300 flex items-center gap-3 relative overflow-hidden'

              if (!answered) {
                className += ' border-white/20 bg-white/5 hover:border-blue-400/70 hover:bg-blue-500/15 hover:scale-[1.02] cursor-pointer active:scale-[0.98]'
              } else if (i === question.correct) {
                className += ' border-green-400 cursor-default anim-flash-green'
                bgStyle = {
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.25) 0%, rgba(34,197,94,0.1) 100%)',
                }
              } else if (i === selectedAnswer && !isCorrect) {
                className += ' border-red-400 cursor-default anim-shake'
                bgStyle = {
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.25) 0%, rgba(239,68,68,0.1) 100%)',
                }
              } else {
                className += ' border-white/10 bg-white/3 opacity-40 cursor-default'
              }

              return (
                <button
                  key={i}
                  type="button"
                  className={className}
                  style={bgStyle}
                  onClick={() => !answered && onAnswer(i)}
                  disabled={answered}
                >
                  <span
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 border transition-all"
                    style={{
                      background:
                        i === question.correct && answered
                          ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                          : i === selectedAnswer && !isCorrect && answered
                          ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                          : 'rgba(255,255,255,0.1)',
                      borderColor:
                        i === question.correct && answered
                          ? '#22c55e'
                          : i === selectedAnswer && !isCorrect && answered
                          ? '#ef4444'
                          : 'rgba(255,255,255,0.2)',
                      color: answered && (i === question.correct || i === selectedAnswer) ? 'white' : 'inherit',
                    }}
                  >
                    {LETTERS[i]}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {i === question.correct && answered && (
                    <span className="text-green-400 text-lg">✓</span>
                  )}
                  {i === selectedAnswer && !isCorrect && answered && (
                    <span className="text-red-400 text-lg">✗</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Result */}
          {answered && (
            <div
              className={`rounded-2xl p-5 text-center border-2 anim-bounce-in relative overflow-hidden ${
                isCorrect
                  ? 'border-green-400'
                  : 'border-red-400'
              }`}
              style={{
                background: isCorrect
                  ? 'linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(34,197,94,0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0.05) 100%)',
              }}
            >
              {/* Decorative sparkles for correct */}
              {isCorrect && (
                <>
                  <span className="absolute top-2 left-4 text-yellow-400 text-sm anim-float">✨</span>
                  <span className="absolute top-4 right-6 text-yellow-400 text-xs anim-float" style={{ animationDelay: '0.5s' }}>⭐</span>
                  <span className="absolute bottom-3 left-8 text-yellow-400 text-xs anim-float" style={{ animationDelay: '1s' }}>✨</span>
                </>
              )}

              <div className="text-5xl mb-2">{isCorrect ? '🎉' : '😅'}</div>
              <div className={`font-black text-2xl ${isCorrect ? 'text-green-300 neon-gold' : 'text-red-300'}`}>
                {isCorrect ? 'CHÍNH XÁC!' : 'SAI MẤT RỒI!'}
              </div>
              <div className="text-slate-300 mt-2 text-sm">
                {isCorrect ? 'Tuyệt vời! Tiến thêm' : 'Đừng nản! Vẫn tiến được'}
                {' '}
                <span
                  className="font-black text-2xl mx-1"
                  style={{ color: isCorrect ? '#F5C518' : '#f87171' }}
                >
                  {pendingSteps}
                </span>
                {' '}bước
                {hasDoubleLoot && (
                  <span className="ml-2 text-yellow-300 font-bold">(đã x2!)</span>
                )}
              </div>

              <button
                type="button"
                onClick={onContinue}
                className="btn-premium mt-4 px-8 py-3 rounded-xl font-black text-base text-black hover:scale-105 active:scale-95 transition-transform"
              >
                <span className="flex items-center gap-2">
                  <span>▶</span>
                  <span>Tiếp tục</span>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
