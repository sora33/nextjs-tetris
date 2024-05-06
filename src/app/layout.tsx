import '@mantine/carousel/styles.css'
import '@mantine/charts/styles.css'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import 'global.css'
import type { Viewport } from 'next'
import React from 'react'
import { theme } from 'theme'
import { MantineDateProvider } from '~/utils'

export const metadata = {
  title: {
    default: '案件名',
    template: '%s | 案件名',
  },
  description: '案件の説明文を入れる',
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
        <MantineProvider defaultColorScheme="light" theme={theme}>
          <MantineDateProvider>
            <Notifications />
            {children}
          </MantineDateProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
