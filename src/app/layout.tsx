import '@mantine/carousel/styles.css'
import '@mantine/charts/styles.css'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import 'global.css'
import type { Viewport } from 'next'
import React from 'react'
import { theme } from 'theme'
import { GameProvider } from '~/utils'

export const metadata = {
  title: {
    default: 'テトリス',
    template: '%s | テトリス',
  },
  description: 'テトリスです',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <GameProvider>{children}</GameProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
