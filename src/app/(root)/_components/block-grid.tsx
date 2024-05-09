import { Paper, SimpleGrid } from '@mantine/core'
import { DropBlockData } from '~/functions'
import { SINGLE_BLOCK_SIZE } from '~/utils/constants'

interface Props {
  blockData: DropBlockData
  opacity?: number
}

export const BlockGrid: React.FC<Props> = ({ blockData, opacity = 1 }) => {
  const style = {
    width: `${blockData.columns * SINGLE_BLOCK_SIZE.width}px`,
    height: `${blockData.rows * SINGLE_BLOCK_SIZE.height}px`,
    top: `${blockData.y * SINGLE_BLOCK_SIZE.height}px`,
    left: `${blockData.x * SINGLE_BLOCK_SIZE.width}px`,
  }
  return (
    <SimpleGrid cols={blockData.columns} spacing="0" pos="absolute" style={{ ...style, opacity }}>
      {blockData.data.map((color, i) => (
        <Paper bg={color ? color : 'transparent'} key={i} />
      ))}
    </SimpleGrid>
  )
}
