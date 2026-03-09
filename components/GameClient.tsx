'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import GameSetup from './GameSetup'
import RaceTrack from './RaceTrack'
import TileGrid from './TileGrid'
import PlayerPanel from './PlayerPanel'
import TurnBanner from './TurnBanner'
import QuestionPopup from './popups/QuestionPopup'
import GiftPopup from './popups/GiftPopup'
import WinPopup from './popups/WinPopup'
import SoundManager from './SoundManager'
import { Player, Tile, GamePhase, QuestionData, GiftData } from '@/lib/types'
import {
  PLAYER_CONFIGS, QUESTIONS, GIFTS, TOTAL_STEPS,
  CORRECT_STEPS, WRONG_STEPS, shuffleArray,
} from '@/lib/gameData'

const STORAGE_KEY = 'treasure-hunt-save'

interface SavedGame {
  phase: GamePhase
  players: Player[]
  tiles: Tile[]
  currentIdx: number
  savedAt: number
}

export default function GameClient() {
  const [phase, setPhase]                   = useState<GamePhase>('setup')
  const [players, setPlayers]               = useState<Player[]>([])
  const [tiles, setTiles]                   = useState<Tile[]>([])
  const [currentIdx, setCurrentIdx]         = useState(0)
  const [activeTile, setActiveTile]         = useState<Tile | null>(null)
  const [revealingId, setRevealingId]       = useState<number | null>(null)
  const [winner, setWinner]                 = useState<Player | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect]           = useState<boolean | null>(null)
  const [pendingSteps, setPendingSteps]     = useState(0)
  const [hasSavedGame, setHasSavedGame]     = useState(false)
  const isLoadingRef = useRef(false)

  const currentPlayer = players[currentIdx] ?? null
  const gameStarted = phase !== 'setup'

  // ── Check for saved game on mount ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const data: SavedGame = JSON.parse(saved)
        // Only show continue if game is in progress (not gameover)
        if (data.phase !== 'gameover' && data.phase !== 'setup' && data.players.length > 0) {
          setHasSavedGame(true)
        }
      }
    } catch {
      // Ignore errors
    }
  }, [])

  // ── Auto-save game state ──
  useEffect(() => {
    // Don't save during setup or gameover, or while loading
    if (phase === 'setup' || phase === 'gameover' || isLoadingRef.current) return
    if (players.length === 0 || tiles.length === 0) return

    // Only save when in 'selecting' phase (stable state)
    if (phase !== 'selecting') return

    try {
      const saveData: SavedGame = {
        phase,
        players,
        tiles,
        currentIdx,
        savedAt: Date.now(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData))
    } catch {
      // Ignore storage errors
    }
  }, [phase, players, tiles, currentIdx])

  // ── Clear saved game ──
  const clearSavedGame = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      setHasSavedGame(false)
    } catch {
      // Ignore errors
    }
  }, [])

  // ── Load saved game ──
  const handleContinueGame = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return

      isLoadingRef.current = true
      const data: SavedGame = JSON.parse(saved)

      setPlayers(data.players)
      setTiles(data.tiles)
      setCurrentIdx(data.currentIdx)
      setPhase('selecting')
      setWinner(null)
      setActiveTile(null)
      setHasSavedGame(false)

      // Reset loading flag after a short delay
      setTimeout(() => {
        isLoadingRef.current = false
      }, 100)
    } catch {
      // If load fails, clear the saved game
      clearSavedGame()
    }
  }, [clearSavedGame])

  // ── All tiles revealed → game over ──
  useEffect(() => {
    if (phase !== 'selecting' || tiles.length === 0) return
    if (tiles.every(t => t.revealed)) {
      const top = [...players].sort((a, b) => b.position - a.position)[0]
      if (top) {
        setWinner(top)
        setPhase('gameover')
      }
    }
  }, [phase, tiles, players])

  // ── End turn ──
  const doEndTurn = useCallback((playerList: Player[], fromIdx: number) => {
    const p = playerList[fromIdx]
    if (p.status.extraTurns > 0) {
      const next = playerList.map((x, i) =>
        i === fromIdx ? { ...x, status: { ...x.status, extraTurns: x.status.extraTurns - 1 } } : x
      )
      setPlayers(next)
      setCurrentIdx(fromIdx)
      setPhase('selecting')
      return
    }
    const total = playerList.length
    let nextIdx = (fromIdx + 1) % total
    let updated = [...playerList]
    let checked = 0
    while (updated[nextIdx].status.isFrozen && checked < total) {
      updated = updated.map((x, i) =>
        i === nextIdx ? { ...x, status: { ...x.status, isFrozen: false } } : x
      )
      nextIdx = (nextIdx + 1) % total
      checked++
    }
    setPlayers(updated)
    setCurrentIdx(nextIdx)
    setPhase('selecting')
  }, [])

  // ── Move player and advance turn ──
  const doMoveAndAdvance = useCallback((
    steps: number,
    playerSnapshot: Player[],
    fromIdx: number,
    clearDouble: boolean,
  ) => {
    const newPos = Math.min(playerSnapshot[fromIdx].position + steps, TOTAL_STEPS)
    const next = playerSnapshot.map((p, i) =>
      i === fromIdx
        ? { ...p, position: newPos, status: { ...p.status, hasDoubleLoot: clearDouble ? false : p.status.hasDoubleLoot } }
        : p
    )
    setPlayers(next)
    setActiveTile(null)
    if (newPos >= TOTAL_STEPS) {
      setWinner(next[fromIdx])
      setPhase('gameover')
    } else {
      doEndTurn(next, fromIdx)
    }
  }, [doEndTurn])

  // ── Start game ──
  const handleStart = useCallback((names: string[]) => {
    // Clear any saved game when starting new
    clearSavedGame()

    const newPlayers: Player[] = names.map((name, i) => ({
      id: i, name,
      avatar: PLAYER_CONFIGS[i].avatar,
      color: PLAYER_CONFIGS[i].color,
      position: 0,
      status: { hasShield: false, isFrozen: false, hasDoubleLoot: false, extraTurns: 0 },
    }))
    const qPool = shuffleArray([...QUESTIONS]).slice(0, 30)
    const gPool = shuffleArray([...GIFTS, ...GIFTS]).slice(0, 15)
    const typeList = shuffleArray([
      ...Array(30).fill('question'),
      ...Array(15).fill('gift'),
    ]) as Array<'question' | 'gift'>
    let qi = 0, gi = 0
    const newTiles: Tile[] = typeList.map((type, i) => ({
      id: i, type, revealed: false,
      content: type === 'question' ? qPool[qi++] : gPool[gi++],
    }))
    setPlayers(newPlayers)
    setTiles(newTiles)
    setCurrentIdx(0)
    setPhase('selecting')
    setWinner(null)
    setActiveTile(null)
  }, [clearSavedGame])

  // ── Select tile ──
  const handleTileSelect = useCallback((tileId: number) => {
    if (phase !== 'selecting' || !currentPlayer) return
    const tile = tiles[tileId]
    if (!tile || tile.revealed) return
    setRevealingId(tileId)
    setTiles(prev => prev.map(t => t.id === tileId ? { ...t, revealed: true } : t))
    setTimeout(() => {
      setRevealingId(null)
      setActiveTile(tile)
      if (tile.type === 'question') {
        setSelectedAnswer(null)
        setIsCorrect(null)
        setPendingSteps(0)
        setPhase('question')
      } else {
        setPhase('gift')
      }
    }, 700)
  }, [phase, currentPlayer, tiles])

  // ── Answer question ──
  const handleAnswer = useCallback((idx: number) => {
    if (selectedAnswer !== null || !currentPlayer || !activeTile) return
    const q = activeTile.content as QuestionData
    const correct = idx === q.correct
    const base = correct ? CORRECT_STEPS : WRONG_STEPS
    const steps = currentPlayer.status.hasDoubleLoot ? base * 2 : base
    setSelectedAnswer(idx)
    setIsCorrect(correct)
    setPendingSteps(steps)
    setPhase('answer_result')
  }, [selectedAnswer, currentPlayer, activeTile])

  // ── Continue after question ──
  const handleContinue = useCallback(() => {
    if (!currentPlayer) return
    doMoveAndAdvance(pendingSteps, players, currentIdx, true)
  }, [currentPlayer, pendingSteps, players, currentIdx, doMoveAndAdvance])

  // ── Claim gift ──
  const handleClaimGift = useCallback(() => {
    if (!currentPlayer || !activeTile) return
    const gift = activeTile.content as GiftData
    switch (gift.type) {
      case 'bonus_1':
      case 'bonus_2':
      case 'bonus_3': {
        const steps = currentPlayer.status.hasDoubleLoot ? gift.steps! * 2 : gift.steps!
        doMoveAndAdvance(steps, players, currentIdx, true)
        break
      }
      case 'extra_turn': {
        const next = players.map((p, i) =>
          i === currentIdx ? { ...p, status: { ...p.status, extraTurns: p.status.extraTurns + 1 } } : p
        )
        setPlayers(next)
        setActiveTile(null)
        doEndTurn(next, currentIdx)
        break
      }
      case 'shield': {
        const next = players.map((p, i) =>
          i === currentIdx ? { ...p, status: { ...p.status, hasShield: true } } : p
        )
        setPlayers(next)
        setActiveTile(null)
        doEndTurn(next, currentIdx)
        break
      }
      case 'freeze': {
        if (players.length <= 1) {
          setActiveTile(null)
          doEndTurn(players, currentIdx)
        } else {
          setPhase('choose_freeze_target')
        }
        break
      }
      case 'swap': {
        const others = players.filter((_, i) => i !== currentIdx)
        if (!others.length) {
          setActiveTile(null)
          doEndTurn(players, currentIdx)
          break
        }
        const nearest = others.reduce((best, p) =>
          Math.abs(p.position - currentPlayer.position) < Math.abs(best.position - currentPlayer.position)
            ? p : best
        )
        const next = players.map(p => {
          if (p.id === currentPlayer.id) return { ...p, position: nearest.position }
          if (p.id === nearest.id) return { ...p, position: currentPlayer.position }
          return p
        })
        setPlayers(next)
        setActiveTile(null)
        if (next[currentIdx].position >= TOTAL_STEPS) {
          setWinner(next[currentIdx])
          setPhase('gameover')
        } else {
          doEndTurn(next, currentIdx)
        }
        break
      }
      case 'double_loot': {
        const next = players.map((p, i) =>
          i === currentIdx ? { ...p, status: { ...p.status, hasDoubleLoot: true } } : p
        )
        setPlayers(next)
        setActiveTile(null)
        doEndTurn(next, currentIdx)
        break
      }
    }
  }, [currentPlayer, activeTile, players, currentIdx, doMoveAndAdvance, doEndTurn])

  // ── Choose freeze target ──
  const handleFreezeTarget = useCallback((targetId: number) => {
    if (!currentPlayer) return
    const target = players.find(p => p.id === targetId)
    if (!target) return
    let next: Player[]
    if (target.status.hasShield) {
      next = players.map(p =>
        p.id === targetId ? { ...p, status: { ...p.status, hasShield: false } } : p
      )
    } else {
      next = players.map(p =>
        p.id === targetId ? { ...p, status: { ...p.status, isFrozen: true } } : p
      )
    }
    setPlayers(next)
    setActiveTile(null)
    doEndTurn(next, currentIdx)
  }, [currentPlayer, players, currentIdx, doEndTurn])

  // ── Render Setup ──
  if (phase === 'setup') {
    return (
      <>
        <div className="stars-bg" />
        <GameSetup
          onStart={handleStart}
          hasSavedGame={hasSavedGame}
          onContinue={handleContinueGame}
        />
        <SoundManager gameStarted={false} />
      </>
    )
  }

  if (!currentPlayer) return null

  const tilesLeft = tiles.filter((t) => !t.revealed).length

  return (
    <div className="game-root-2col animated-bg">
      <div className="stars-bg" />

      {/* Floating particles */}
      <div className="particles">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Left Sidebar */}
      <div className="game-sidebar relative z-10">
        {/* Turn banner */}
        <TurnBanner currentPlayer={currentPlayer} phase={phase} tilesLeft={tilesLeft} />

        {/* Race track */}
        <RaceTrack players={players} />

        {/* Player panel */}
        <PlayerPanel players={players} currentPlayerIndex={currentIdx} />
      </div>

      {/* Main Content - Tile Grid */}
      <div className="game-main relative z-10">
        <TileGrid
          tiles={tiles}
          canSelect={phase === 'selecting' && !currentPlayer.status.isFrozen}
          onSelect={handleTileSelect}
          revealingId={revealingId}
        />
      </div>

      {/* Sound Manager */}
      <SoundManager gameStarted={gameStarted} />

      {/* Popups */}
      {(phase === 'question' || phase === 'answer_result') && activeTile && (
        <QuestionPopup
          question={activeTile.content as QuestionData}
          currentPlayer={currentPlayer}
          selectedAnswer={selectedAnswer}
          isCorrect={isCorrect}
          pendingSteps={pendingSteps}
          hasDoubleLoot={currentPlayer.status.hasDoubleLoot}
          onAnswer={handleAnswer}
          onContinue={handleContinue}
        />
      )}

      {(phase === 'gift' || phase === 'choose_freeze_target') && activeTile && (
        <GiftPopup
          gift={activeTile.content as GiftData}
          currentPlayer={currentPlayer}
          allPlayers={players}
          phase={phase}
          onClaim={handleClaimGift}
          onFreezeTarget={handleFreezeTarget}
        />
      )}

      {phase === 'gameover' && winner && (
        <WinPopup
          winner={winner}
          allPlayers={players}
          onPlayAgain={() => {
            clearSavedGame()
            setPhase('setup')
          }}
        />
      )}
    </div>
  )
}
