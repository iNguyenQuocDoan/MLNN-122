'use client'

import { useRouter } from 'next/navigation'
import GameClient from '@/components/GameClient'

export default function GamePage() {
  const router = useRouter()

  const handleBackToTheory = () => {
    router.push('/')
  }

  return (
    <div className="relative">
      {/* Back to theory button */}
      <button
        onClick={handleBackToTheory}
        className="fixed top-3 left-3 z-50 flex items-center gap-2 px-3 py-1.5 rounded-lg
          bg-white/10 border border-white/20 text-white/70 text-sm font-medium
          hover:bg-white/20 hover:text-white transition-all"
      >
        <span>📚</span>
        <span className="hidden sm:inline">Xem lý thuyết</span>
      </button>
      <GameClient />
    </div>
  )
}
