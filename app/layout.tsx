import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Steam Summarize | AI-Powered Game Reviews Analysis',
  description:
    'Get instant AI-powered summaries of Steam reviews. Make informed gaming decisions with our smart analysis of player feedback, ratings, and reviews from Steam.',
  keywords:
    'steam reviews, game reviews, steam game analysis, game review summary, steam review analyzer, video game reviews, gaming recommendations, steam review summary, game review AI, steam game ratings',
  openGraph: {
    title: 'Steam Game Review Summarizer | AI-Powered Game Reviews Analysis',
    description:
      'Get instant AI-powered summaries of Steam game reviews. Make informed gaming decisions with our smart analysis of player feedback.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steam Game Review Summarizer | AI-Powered Analysis',
    description: 'Get instant AI-powered summaries of Steam game reviews',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://steamsummarize.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://steamsummarize.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col w-full items-center`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId="GTM-TL4WVVJB" />
    </html>
  )
}
