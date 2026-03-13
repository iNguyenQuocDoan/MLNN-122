'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface SoundManagerProps {
  gameStarted: boolean
}

export default function SoundManager({ gameStarted }: SoundManagerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [showControls, setShowControls] = useState(false)

  // Initialize audio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/Plants vs. Zombies (Main Theme).mp3')
      audioRef.current.loop = true
      audioRef.current.volume = volume
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Auto-play when game starts (with user interaction requirement)
  const startMusic = useCallback(() => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay blocked, user needs to interact
        })
    }
  }, [isPlaying])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error)
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  // Try to start music when game starts
  useEffect(() => {
    if (gameStarted) {
      startMusic()
    }
  }, [gameStarted, startMusic])

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Main toggle button */}
      <div className="relative">
        <button
          onClick={() => setShowControls(!showControls)}
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, rgba(17, 29, 53, 0.9), rgba(26, 10, 46, 0.9))',
            border: '2px solid rgba(245,197,24,0.3)',
            boxShadow: isPlaying
              ? '0 0 20px rgba(245,197,24,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
              : '0 4px 15px rgba(0,0,0,0.3)',
          }}
          title="Cài đặt âm thanh"
        >
          {isPlaying && !isMuted ? '🎵' : '🔇'}
        </button>

        {/* Playing indicator */}
        {isPlaying && !isMuted && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400" />
          </span>
        )}
      </div>

      {/* Expanded controls */}
      {showControls && (
        <div
          className="absolute bottom-14 right-0 w-56 p-4 rounded-2xl space-y-4 anim-slide-up"
          style={{
            background: 'linear-gradient(135deg, rgba(17, 29, 53, 0.95), rgba(26, 10, 46, 0.95))',
            border: '1px solid rgba(245,197,24,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            WebkitBackdropFilter: 'blur(20px)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            zIndex: 60,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Âm thanh
            </span>
            <button
              type="button"
              onClick={() => setShowControls(false)}
              className="text-slate-500 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>

          {/* Play/Pause button */}
          <button
            type="button"
            onClick={togglePlay}
            className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: isPlaying
                ? 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.1))'
                : 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.1))',
              border: `1px solid ${isPlaying ? 'rgba(239,68,68,0.4)' : 'rgba(34,197,94,0.4)'}`,
              color: isPlaying ? '#f87171' : '#4ade80',
            }}
          >
            <span className="text-lg">{isPlaying ? '⏸️' : '▶️'}</span>
            <span>{isPlaying ? 'Tạm dừng' : 'Phát nhạc'}</span>
          </button>

          {/* Volume control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Âm lượng</span>
              <span className="text-xs font-bold text-yellow-400">{Math.round(volume * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMute}
                className="text-lg hover:scale-110 transition-transform"
              >
                {isMuted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
              </button>
              <input
                type="range"
                title="Âm lượng"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #F5C518 0%, #F5C518 ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`,
                }}
              />
            </div>
          </div>

          {/* Track info */}
          <div
            className="p-2 rounded-lg text-center"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Đang phát</div>
            <div className="text-xs font-bold text-slate-300 mt-0.5 truncate">
              🌻 Plants vs. Zombies Theme
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
