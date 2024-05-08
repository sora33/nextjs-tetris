import { Anchor, Flex, Paper } from '@mantine/core'
import Link from 'next/link'
import { Container } from '~/components/modules'

export const Header = () => {
  return (
    <Paper shadow="xs">
      <Container py="md">
        <Flex justify="space-between" align="center">
          <Anchor component={Link} href="/" variant="subtle" size="xl" fw="bold">
            Next.js & Mantine で Tetris
          </Anchor>
        </Flex>
      </Container>
    </Paper>
  )
}
