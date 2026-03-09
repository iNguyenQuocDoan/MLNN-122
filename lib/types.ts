export type GamePhase =
  | 'setup'
  | 'selecting'
  | 'question'
  | 'answer_result'
  | 'gift'
  | 'choose_freeze_target'
  | 'gameover'

export type PlayerStatus = {
  hasShield: boolean
  isFrozen: boolean
  hasDoubleLoot: boolean
  extraTurns: number
}

export type Player = {
  id: number
  name: string
  avatar: string
  color: string
  position: number
  status: PlayerStatus
}

export type QuestionData = {
  text: string
  options: string[]
  correct: number
}

export type GiftType =
  | 'bonus_1'
  | 'bonus_2'
  | 'bonus_3'
  | 'extra_turn'
  | 'shield'
  | 'freeze'
  | 'swap'
  | 'double_loot'

export type GiftData = {
  type: GiftType
  name: string
  description: string
  icon: string
  steps?: number
}

export type TileContent = QuestionData | GiftData

export type Tile = {
  id: number
  type: 'question' | 'gift'
  content: TileContent
  revealed: boolean
}

export type LogEntry = {
  id: number
  text: string
  color: string
}
