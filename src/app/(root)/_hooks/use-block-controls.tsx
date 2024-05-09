import { useEffect } from 'react'
import { useKeyboardControls } from '~/app/(root)/_hooks/use-keyboard-controls'
import { useGame } from '~/utils'
import { DROP_SPEED } from '~/utils/constants'

interface Props {
  onMove: ({ x, y }: { x: number; y: number }) => void
  onRotate: () => void
  onHardDrop: () => void
  onHold: () => void
  onDropped: () => void
  isDropped: boolean
}

export const useBlockControls = (props: Props) => {
  const { onMove, onDropped, isDropped } = props
  const { score } = useGame()

  useEffect(() => {
    const interval = 1000 / (DROP_SPEED + score / 100)
    const timer = setInterval(() => {
      onMove({ x: 0, y: 1 })
    }, interval)
    return () => clearInterval(timer)
  }, [onMove, score])

  useEffect(() => {
    if (isDropped) {
      onDropped()
    }
  }, [isDropped, onDropped])

  useKeyboardControls(props)
}
