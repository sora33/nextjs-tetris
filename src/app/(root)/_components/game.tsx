'use client'

import { Box, Flex, Paper, SimpleGrid, Space, Stack, Text } from '@mantine/core'
import React, { useEffect, useRef } from 'react'
import { DropBlock, GhostBlock } from '~/app/(root)/_components/drop-block'
import { KeyMap } from '~/app/(root)/_components/key-map'
import { useGameLogic } from '~/app/(root)/_hooks/use-game-logic'
import { FIELD_SIZE } from '~/utils/constants'

export const Game: React.FC = () => {
  const { turnState, handleOnMove, handleOnRotate, handleOnDropped, handleHardDrop, handleOnHold } =
    useGameLogic()

  // キーマップの設定
  const keyMap = [
    { key: '←', description: '左', action: () => handleOnMove({ x: -1, y: 0 }) },
    { key: '↓', description: '下', action: () => handleOnMove({ x: 0, y: 1 }) },
    { key: '→', description: '右', action: () => handleOnMove({ x: 1, y: 0 }) },
    { key: '↑', description: '落下', action: () => handleHardDrop() },
    { key: 'space', description: '回転', action: handleOnRotate },
    { key: 'Enter', description: 'hold', action: handleOnHold },
  ]

  // 最新のstateを常に参照できるようにする
  const turnStateRef = useRef(turnState)
  useEffect(() => {
    turnStateRef.current = turnState
  }, [turnState])

  return (
    <Stack>
      {/* // 次のブロックの表示 */}
      <Flex gap="md" justify="center">
        {turnStateRef.current.nextDropBlock.map((block, i) => {
          return (
            <Stack key={i} justify="center">
              <Text ta="center">Next{i + 1}</Text>
              <SimpleGrid
                spacing="0"
                w={`${(4 * block.columns) / block.rows}rem`}
                cols={block.columns}
              >
                {block.data.map((color, i) => {
                  return <Paper bg={color ?? 'transparent'} key={i} w="1rem" h="1rem" />
                })}
              </SimpleGrid>
            </Stack>
          )
        })}
        <Stack justify="center">
          <Text ta="center">Hold</Text>
          {turnStateRef.current.holdBlock ? (
            <SimpleGrid
              spacing="0"
              w={`${
                (4 * turnStateRef.current.holdBlock.columns) / turnStateRef.current.holdBlock.rows
              }rem`}
              cols={turnStateRef.current.holdBlock.columns}
            >
              {turnStateRef.current.holdBlock.data.map((color, i) => {
                return <Paper bg={color ?? 'transparent'} key={i} w="1rem" h="1rem" />
              })}
            </SimpleGrid>
          ) : (
            <Space h="4rem" w="4rem" />
          )}
        </Stack>
      </Flex>

      {/* // フィールドの表示 */}
      <Box
        w={FIELD_SIZE.width}
        h={FIELD_SIZE.height}
        pos="relative"
        bg="gray"
        style={{ overflow: 'hidden' }}
        mx="auto"
      >
        <DropBlock
          dropBlockData={turnStateRef.current.dropBlock}
          onMove={handleOnMove}
          onRotate={handleOnRotate}
          isDropped={turnStateRef.current.isDropped}
          onDropped={handleOnDropped}
          onHardDrop={handleHardDrop}
          onHold={handleOnHold}
        />
        <GhostBlock ghostBlock={turnStateRef.current.ghostBlock} />

        <SimpleGrid
          cols={FIELD_SIZE.rows}
          spacing="0"
          pos="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
        >
          {turnStateRef.current.field.map((color, i) => {
            return <Paper bg={color || 'transparent'} key={i} w="100%" h="100%" />
          })}
        </SimpleGrid>
      </Box>

      <KeyMap keyMap={keyMap} />
    </Stack>
  )
}
