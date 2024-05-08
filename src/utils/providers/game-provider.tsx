'use client'
import React, { createContext, useContext, useState } from 'react'

type GameState = 'start' | 'during' | 'result'

type GameContextType = {
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  gameStatus: GameState
  setGameStatus: React.Dispatch<React.SetStateAction<GameState>>
}

// コンテキストの作成
const GameContext = createContext<GameContextType | null>(null)

// コンテキストプロバイダコンポーネント
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState('start' as GameState)

  const value = {
    score,
    setScore,
    gameStatus,
    setGameStatus,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

// カスタムフック
export const useGame = () => {
  const context = useContext(GameContext)

  if (context === null) {
    throw new Error('useGame must be used within a GameProvider')
  }

  return context
}
