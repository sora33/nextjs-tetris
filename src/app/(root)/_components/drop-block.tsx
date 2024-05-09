'use client'

import { BlockGrid } from '~/app/(root)/_components/block-grid'
import { useBlockControls } from '~/app/(root)/_hooks/use-block-controls'
import { DropBlockData } from '~/functions'

interface Props {
  dropBlockData: DropBlockData
  onMove: ({ x, y }: { x: number; y: number }) => void
  onRotate: () => void
  onDropped: () => void
  onHardDrop: () => void
  isDropped: boolean
  onHold: () => void
}

export const DropBlock: React.FC<Props> = (props) => {
  const { dropBlockData } = props
  useBlockControls(props)

  return <BlockGrid blockData={dropBlockData} />
}

export const GhostBlock: React.FC<{ ghostBlock: DropBlockData }> = ({ ghostBlock }) => {
  return <BlockGrid blockData={ghostBlock} opacity={0.5} />
}
