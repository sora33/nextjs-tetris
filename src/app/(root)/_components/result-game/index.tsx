'use client'

import { Button, Flex, Stack, Text } from '@mantine/core'
import { useGame } from '~/utils'

export const ResultGame: React.FC = () => {
  const { setGameStatus, setScore, score } = useGame()
  return (
    <Stack>
      <Text>ゲームオーバーです！！😭😭</Text>
      <Text>あなたのScoreは {score.toLocaleString()} 点でした。</Text>
      <Flex gap="md">
        <Button variant="outline" color="red" onClick={() => setGameStatus('during')}>
          スコアを継続してスタート
        </Button>
        <Button
          color="red"
          onClick={() => {
            setGameStatus('start')
            setScore(0)
          }}
        >
          最初から始める
        </Button>
      </Flex>
    </Stack>
  )
}
