import { Stack } from '@mantine/core'
import { Header } from '~/components'
import { Container } from '~/components/modules'

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container mt="xl" pb="6rem">
          <Stack gap="sm" flex="1" pt="md">
            {children}
          </Stack>
        </Container>
      </main>
    </>
  )
}
