import Provider from './_trcp/Provider'
import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

import Navbar from '@/components/navbar'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Video player',
  description: 'NextJS trailer player (API TMDB)',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} container font-sans`}
      >
        <Navbar />
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
