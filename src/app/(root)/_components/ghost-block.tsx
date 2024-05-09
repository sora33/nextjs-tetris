'use client'

import { BlockGrid } from '~/app/(root)/_components/block-grid'
import { DropBlockData } from '~/functions'

interface Props {
  dropBlockData: DropBlockData
}

export const GhostBlock: React.FC<Props> = ({ dropBlockData }) => {
  return <BlockGrid blockData={dropBlockData} opacity={0.5} />
}
