import { Kbd, SimpleGrid, Stack, Text } from '@mantine/core'
import React from 'react'

type KeyMapProps = {
  keyMap: Array<{
    key: string
    description: string
    action: () => void
  }>
}

export const KeyMap: React.FC<KeyMapProps> = ({ keyMap }) => {
  return (
    <SimpleGrid cols={keyMap.length} ta="center">
      {keyMap.map(({ key, description, action }) => (
        <Stack key={key} gap="xs" onClick={action}>
          <Text>{description}</Text>
          <Kbd>{key}</Kbd>
        </Stack>
      ))}
    </SimpleGrid>
  )
}
