import { Box, Button, Stack, Text } from '@mantine/core'
import { useGame } from '~/utils'

export const StartGame: React.FC = () => {
  const { setGameStatus } = useGame()
  return (
    <Stack>
      <Text>テトリスを始める</Text>
      <Box>
        <Button onClick={() => setGameStatus('during')}>Start Game</Button>
      </Box>
    </Stack>
  )
}
