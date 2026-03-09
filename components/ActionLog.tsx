'use client'

import { LogEntry } from '@/lib/types'
import { useEffect, useRef } from 'react'

interface ActionLogProps {
  logs: LogEntry[]
}

// Derive icon + pill color from log entry color
function getLogStyle(color: string): { icon: string; pillBg: string } {
  if (color === '#F5C518') return { icon: '⭐', pillBg: 'rgba(245,197,24,0.12)' }
  if (color === '#4ade80') return { icon: '✅', pillBg: 'rgba(74,222,128,0.10)' }
  if (color === '#f87171') return { icon: '❌', pillBg: 'rgba(248,113,113,0.10)' }
  if (color === '#60a5fa') return { icon: '❓', pillBg: 'rgba(96,165,250,0.10)' }
  if (color === '#fbbf24') return { icon: '🎁', pillBg: 'rgba(251,191,36,0.10)' }
  if (color === '#67e8f9' || color === '#38bdf8') return { icon: '❄️', pillBg: 'rgba(103,232,249,0.10)' }
  if (color === '#c084fc') return { icon: '🔀', pillBg: 'rgba(192,132,252,0.10)' }
  if (color === '#a3e635') return { icon: '⚡', pillBg: 'rgba(163,230,53,0.10)' }
  if (color === '#fde68a') return { icon: '✨', pillBg: 'rgba(253,230,138,0.10)' }
  if (color === '#a78bfa') return { icon: '🚶', pillBg: 'rgba(167,139,250,0.10)' }
  return { icon: '▸', pillBg: 'rgba(255,255,255,0.05)' }
}

export default function ActionLog({ logs }: ActionLogProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  return (
    <div className="glass-card rounded-xl p-2 flex flex-col flex-1 min-h-0">
      <div className="flex items-center gap-1.5 px-1 mb-1.5">
        <span className="text-sm">📜</span>
        <h2 className="font-bold text-[10px] tracking-widest text-yellow-400 uppercase">Lịch Sử</h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll space-y-0.5 pr-0.5 min-h-0 max-h-48">
        {logs.length === 0 ? (
          <p className="text-slate-600 text-[10px] italic text-center py-2">Chưa có sự kiện nào...</p>
        ) : (
          logs.map((log) => {
            const { icon, pillBg } = getLogStyle(log.color)
            return (
              <div
                key={log.id}
                className="flex items-start gap-1.5 px-2 py-1 rounded-md anim-slide-right"
                style={{ background: pillBg }}
              >
                <span className="text-[11px] leading-[1.4] shrink-0">{icon}</span>
                <span className="text-[10px] leading-[1.4] wrap-break-word" style={{ color: log.color }}>
                  {log.text}
                </span>
              </div>
            )
          })
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
