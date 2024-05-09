'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  calcGhostBlockPosition,
  checkHit,
  clearFilledRows,
  createBlock,
  getRotatedBlockData,
  isGameOvered,
  setDrop2Field,
} from '~/functions'
import { DropBlockData } from '~/functions'
import { useGame } from '~/utils'
import { FIELD_SIZE } from '~/utils/constants'

type TurnState = {
  field: any[]
  dropBlock: DropBlockData
  ghostBlock: {
    columns: number
    rows: number
    x: number
    y: number
    data: (string | null)[]
  }
  nextDropBlock: DropBlockData[]
  holdBlock: DropBlockData | null
  isDropped: boolean
}

export const useGameLogic = () => {
  const { setGameStatus, setScore } = useGame()
  const [turnState, setTurnState] = useState<TurnState>({
    field: Array(FIELD_SIZE.rows * FIELD_SIZE.columns).fill(null),
    dropBlock: createBlock(),
    ghostBlock: calcGhostBlockPosition(
      createBlock(),
      Array(FIELD_SIZE.rows * FIELD_SIZE.columns).fill(null),
    ),
    nextDropBlock: [createBlock(), createBlock(), createBlock(), createBlock()],
    holdBlock: null,
    isDropped: false,
  })

  const turnStateRef = useRef(turnState)

  // 最新のstateを常に参照できるようにする
  useEffect(() => {
    turnStateRef.current = turnState
  }, [turnState])

  // ブロックの移動処理
  const handleOnMove = useCallback(({ x, y }: { x: number; y: number }) => {
    const currentBlock = turnStateRef.current.dropBlock
    const movedBlockData = {
      ...currentBlock,
      x: currentBlock.x + x,
      y: currentBlock.y + y,
    }

    if (checkHit(movedBlockData, turnStateRef.current.field)) {
      if (y > 0) {
        setTurnState((prev) => ({ ...prev, isDropped: true }))
      }
      return
    }

    setTurnState((prev) => ({
      ...prev,
      dropBlock: movedBlockData,
      ghostBlock: calcGhostBlockPosition(movedBlockData, prev.field),
    }))
  }, [])

  // ブロックの回転処理
  const handleOnRotate = useCallback(() => {
    const currentBlock = turnStateRef.current.dropBlock
    const rotatedBlockData = getRotatedBlockData(currentBlock)
    if (!checkHit(rotatedBlockData, turnStateRef.current.field)) {
      setTurnState((prev) => ({
        ...prev,
        dropBlock: rotatedBlockData,
        ghostBlock: calcGhostBlockPosition(rotatedBlockData, prev.field),
      }))
    }
  }, [])

  // ブロックが落下した時の処理
  const handleOnDropped = useCallback(() => {
    const currentBlock = turnStateRef.current.dropBlock
    if (isGameOvered(currentBlock)) {
      setGameStatus('result')
      return
    }

    const updatedField = setDrop2Field(currentBlock, turnStateRef.current.field)
    const { clearedLines, clearedField } = clearFilledRows(updatedField)

    setScore((prev) => prev + clearedLines * 100)

    setTurnState((prev) => ({
      ...prev,
      field: clearedField,
      dropBlock: prev.nextDropBlock[0],
      nextDropBlock: [
        prev.nextDropBlock[1],
        prev.nextDropBlock[2],
        prev.nextDropBlock[3],
        createBlock(),
      ],
      isDropped: false,
    }))
  }, [setGameStatus, setScore])

  // ブロックのハードドロップ処理
  const handleHardDrop = useCallback(() => {
    let movedBlockData = { ...turnStateRef.current.dropBlock }
    while (true) {
      const nextPosition = { ...movedBlockData, y: movedBlockData.y + 1 }
      if (checkHit(nextPosition, turnStateRef.current.field)) {
        break
      }
      movedBlockData = nextPosition
    }
    setTurnState((prev) => ({
      ...prev,
      dropBlock: movedBlockData,
      isDropped: true,
    }))
  }, [])

  // ホールド処理
  const handleOnHold = useCallback(() => {
    setTurnState((prev) => {
      const newDropBlock = prev.holdBlock || prev.nextDropBlock[0]
      const newHoldBlock = prev.dropBlock
      const newGhostBlock = calcGhostBlockPosition(newDropBlock, prev.field)
      const newNextDropBlock = prev.holdBlock
        ? prev.nextDropBlock
        : [prev.nextDropBlock[1], prev.nextDropBlock[2], prev.nextDropBlock[3], createBlock()]

      return {
        ...prev,
        dropBlock: newDropBlock,
        holdBlock: newHoldBlock,
        ghostBlock: newGhostBlock,
        nextDropBlock: newNextDropBlock,
      }
    })
  }, [])

  return {
    turnState,
    handleOnMove,
    handleOnRotate,
    handleOnDropped,
    handleHardDrop,
    handleOnHold,
  }
}
