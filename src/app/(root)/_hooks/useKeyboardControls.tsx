import { useCallback, useEffect } from 'react'

interface KeyboardControlsProps {
  onMove: ({ x, y }: { x: number; y: number }) => void
  onRotate: () => void
  onHardDrop: () => void
  onHold: () => void
}

export const useKeyboardControls = ({
  onMove,
  onRotate,
  onHardDrop,
  onHold,
}: KeyboardControlsProps) => {
  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      const keyActionMap: Record<string, () => void> = {
        Space: () => onRotate(),
        ArrowRight: () => onMove({ x: 1, y: 0 }),
        ArrowDown: () => onMove({ x: 0, y: 1 }),
        ArrowLeft: () => onMove({ x: -1, y: 0 }),
        ArrowUp: () => onHardDrop(),
        Enter: () => onHold(),
      }
      const action = keyActionMap[e.code]
      if (action) action()
    },
    [onMove, onRotate, onHardDrop, onHold],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [handleKeydown])
}
