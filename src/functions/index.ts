import { Field } from '~/types'
import { BLOCKS, BLOCK_DEFAULT_PARAM, FIELD_SIZE } from '~/utils/constants'

export interface DropBlockData {
  columns: number
  rows: number
  x: number
  y: number
  data: (null | string)[]
}

// 落ちブロックを生成
export const createBlock = (): DropBlockData => {
  const data = BLOCKS[Math.floor(Math.random() * BLOCKS.length)]
  return { ...BLOCK_DEFAULT_PARAM, data }
}

// 落ちブロックを回転
export const getRotatedBlockData = (blockData: DropBlockData): DropBlockData => {
  const { columns, data } = blockData
  const rotatedData = new Array(data.length)
  data.forEach((value, index) => {
    const x = index % columns
    const y = Math.floor(index / columns)
    rotatedData[x * columns + (columns - 1 - y)] = value
  })
  return { ...blockData, columns: blockData.rows, rows: columns, data: rotatedData }
}

// 座標計算を共通関数として抽出
function calculatePosition(
  index: number,
  columns: number,
  x: number,
  y: number,
): { posX: number; posY: number } {
  const posX = x + (index % columns)
  const posY = y + Math.floor(index / columns)
  return { posX, posY }
}

// 重なり判定
export const checkHit = (blockData: DropBlockData, field: Field): boolean => {
  const { rows, columns, x, y, data } = blockData
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const idx = i * columns + j
      if (data[idx] === null) continue
      const { posX, posY } = calculatePosition(idx, columns, x, y)
      if (
        posX < 0 ||
        posX >= FIELD_SIZE.rows ||
        posY >= FIELD_SIZE.columns ||
        field[posX + posY * FIELD_SIZE.rows]
      ) {
        return true
      }
    }
  }
  return false
}

// ドロップブロックをフィールドに反映
export const setDrop2Field = (blockData: DropBlockData, field: Field): Field => {
  const newField = [...field]
  blockData.data.forEach((value, index) => {
    if (value === null) return
    const { posX, posY } = calculatePosition(index, blockData.columns, blockData.x, blockData.y)
    newField[posX + posY * FIELD_SIZE.rows] = value
  })
  return newField
}

// ゴーストブロックの位置を計算する関数
export const calcGhostBlockPosition = (currentBlock: DropBlockData, field: (string | null)[]) => {
  let ghostBlock = { ...currentBlock }
  while (true) {
    const nextPosition = { ...ghostBlock, y: ghostBlock.y + 1 }
    if (checkHit(nextPosition, field)) {
      break
    }
    ghostBlock = nextPosition
  }
  return ghostBlock
}

// ゲームオーバー判定
export const isGameOvered = (blockData: DropBlockData): boolean => {
  return blockData.data.some((value, index) => {
    if (value === null) return false
    const y = blockData.y + Math.floor(index / blockData.columns)
    return y < 0
  })
}

// 埋まった行の数とを埋まった行を消したあとのフィールドを返す
export const clearFilledRows = (field: Field): { clearedLines: number; clearedField: Field } => {
  const clearedField = [...field]
  let clearedLines = 0
  let currentRow = FIELD_SIZE.columns - 1

  for (let row = FIELD_SIZE.columns - 1; row >= 0; row--) {
    const isRowFull = field
      .slice(row * FIELD_SIZE.rows, (row + 1) * FIELD_SIZE.rows)
      .every((cell) => cell !== null)
    if (isRowFull) {
      clearedLines++
    } else {
      if (row !== currentRow) {
        for (let col = 0; col < FIELD_SIZE.rows; col++) {
          clearedField[currentRow * FIELD_SIZE.rows + col] = field[row * FIELD_SIZE.rows + col]
        }
      }
      currentRow--
    }
  }

  // 消した行の上をnullで埋める
  for (let row = 0; row <= currentRow; row++) {
    for (let col = 0; col < FIELD_SIZE.rows; col++) {
      clearedField[row * FIELD_SIZE.rows + col] = null
    }
  }

  return { clearedLines, clearedField }
}
