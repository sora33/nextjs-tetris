'use client'
import { Paper, SimpleGrid } from '@mantine/core'
import { useEffect } from 'react'
import { useKeyboardControls } from '~/app/(root)/_hooks/useKeyboardControls'
import { DropBlockData } from '~/functions'
import { useGame } from '~/utils'
import { DROP_SPEED, SINGLE_BLOCK_SIZE } from '~/utils/constants'

export const GhostBlock: React.FC<{ ghostBlock: DropBlockData }> = ({ ghostBlock }) => {
  const style = {
    width: `${ghostBlock.columns * SINGLE_BLOCK_SIZE.width}px`,
    height: `${ghostBlock.rows * SINGLE_BLOCK_SIZE.height}px`,
    top: `${ghostBlock.y * SINGLE_BLOCK_SIZE.height}px`,
    left: `${ghostBlock.x * SINGLE_BLOCK_SIZE.width}px`,
  }

  return (
    <SimpleGrid cols={ghostBlock.columns} spacing="0" pos="absolute" style={style} opacity={0.5}>
      {ghostBlock.data.map((color, i) => (
        <Paper bg={color ? color : 'transparent'} key={i} />
      ))}
    </SimpleGrid>
  )
}

interface Props {
  dropBlockData: DropBlockData
  onMove: ({ x, y }: { x: number; y: number }) => void
  onRotate: () => void
  onDropped: () => void
  onHardDrop: () => void
  nextTurn: () => void
  isDropped: boolean
  onHold: () => void
}

export const DropBlock: React.FC<Props> = ({
  dropBlockData,
  onMove,
  onRotate,
  onDropped,
  onHardDrop,
  onHold,
  nextTurn,
  isDropped,
}) => {
  const { score } = useGame()
  useKeyboardControls({ onMove, onRotate, onHardDrop, onHold })

  const style = {
    width: `${dropBlockData.columns * SINGLE_BLOCK_SIZE.width}px`,
    height: `${dropBlockData.rows * SINGLE_BLOCK_SIZE.height}px`,
    top: `${dropBlockData.y * SINGLE_BLOCK_SIZE.height}px`,
    left: `${dropBlockData.x * SINGLE_BLOCK_SIZE.width}px`,
  }

  // ブロックの自然落下処理
  useEffect(() => {
    const interval = 1000 / (DROP_SPEED + score / 100)
    const timer = setInterval(() => {
      onMove({ x: 0, y: 1 })
    }, interval)
    return () => clearInterval(timer)
  }, [onMove, score])

  // ブロックが落下した時の処理
  useEffect(() => {
    if (isDropped) {
      onDropped()
    } else {
      nextTurn()
    }
  }, [isDropped, nextTurn, onDropped])

  return (
    <SimpleGrid cols={dropBlockData.columns} spacing="0" pos="absolute" style={style}>
      {dropBlockData.data.map((color, i) => (
        <Paper bg={color ? color : 'transparent'} key={i} />
      ))}
    </SimpleGrid>
  )
}
