'use client'

import { Box, Stack, Text } from '@mantine/core'
import React from 'react'
import { Game } from '~/app/(root)/_components/game'
import { useGame } from '~/utils'

export const DuringGame: React.FC = () => {
  const { score } = useGame()
  return (
    <Stack mx="auto" justify="center">
      <Text fz="1.5rem" fw="700" ta="center">
        Score: {score.toLocaleString()}
      </Text>
      <Box mx="auto">
        <Game />
      </Box>
    </Stack>
  )
}
