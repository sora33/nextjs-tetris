'use client'
import { Box } from '@mantine/core'
import { useState } from 'react'
import { DuringGame } from '~/app/(root)/_components/during-game'
import { ResultGame } from '~/app/(root)/_components/result-game'
import { StartGame } from '~/app/(root)/_components/start-game'
import { useGame } from '~/utils'

export default function Page() {
  const { gameStatus } = useGame()

  return (
    <Box>
      {gameStatus === 'start' && <StartGame />}
      {gameStatus === 'during' && <DuringGame />}
      {gameStatus === 'result' && <ResultGame />}
    </Box>
  )
}
