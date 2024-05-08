// const BLOCK_SIZE = 20

export const FIELD_SIZE = {
  rows: 14,
  columns: 20,
  width: 280,
  height: 400,
}

export const SINGLE_BLOCK_SIZE = {
  width: FIELD_SIZE.width / FIELD_SIZE.rows,
  height: FIELD_SIZE.height / FIELD_SIZE.columns,
}

// カウントダウン画面の秒数
export const COUNT_DOWN_START = 5

// ドロップブロックの落ちるスピード
export const DROP_SPEED = 2

const BLOCK_COLOR_I = 'blue.3'
const BLOCK_COLOR_L = 'orange'
const BLOCK_COLOR_J = 'blue.8'
const BLOCK_COLOR_O = 'yellow'
const BLOCK_COLOR_S = 'green'
const BLOCK_COLOR_T = 'purple'
const BLOCK_COLOR_Z = 'red'

export const BLOCK_DEFAULT_PARAM = {
  columns: 4,
  rows: 4,
  x: Math.floor(FIELD_SIZE.rows / 2) - Math.floor(4 / 2),
  y: -4,
}

export const BLOCKS = [
  // 長いやつ
  [
    null,
    null,
    null,
    null,

    null,
    null,
    null,
    null,

    BLOCK_COLOR_I,
    BLOCK_COLOR_I,
    BLOCK_COLOR_I,
    BLOCK_COLOR_I,

    null,
    null,
    null,
    null,
  ],

  // Lの逆みたいなやつ
  [
    null,
    null,
    null,
    null,

    BLOCK_COLOR_J,
    null,
    null,
    null,

    BLOCK_COLOR_J,
    BLOCK_COLOR_J,
    BLOCK_COLOR_J,
    null,

    null,
    null,
    null,
    null,
  ],

  // Lみたいなやつ
  [
    null,
    null,
    null,
    null,

    null,
    null,
    BLOCK_COLOR_L,
    null,

    BLOCK_COLOR_L,
    BLOCK_COLOR_L,
    BLOCK_COLOR_L,
    null,

    null,
    null,
    null,
    null,
  ],

  // 四角
  [
    null,
    null,
    null,
    null,

    null,
    BLOCK_COLOR_O,
    BLOCK_COLOR_O,
    null,

    null,
    BLOCK_COLOR_O,
    BLOCK_COLOR_O,
    null,

    null,
    null,
    null,
    null,
  ],

  // zの逆みたいなやつ
  [
    null,
    null,
    null,
    null,

    null,
    BLOCK_COLOR_S,
    BLOCK_COLOR_S,
    null,

    BLOCK_COLOR_S,
    BLOCK_COLOR_S,
    null,
    null,

    null,
    null,
    null,
    null,
  ],

  // 三角
  [
    null,
    null,
    null,
    null,

    null,
    BLOCK_COLOR_T,
    null,
    null,

    BLOCK_COLOR_T,
    BLOCK_COLOR_T,
    BLOCK_COLOR_T,
    null,

    null,
    null,
    null,
    null,
  ],

  // Zみたいなやつ
  [
    null,
    null,
    null,
    null,

    BLOCK_COLOR_Z,
    BLOCK_COLOR_Z,
    null,
    null,

    null,
    BLOCK_COLOR_Z,
    BLOCK_COLOR_Z,
    null,

    null,
    null,
    null,
    null,
  ],
]
