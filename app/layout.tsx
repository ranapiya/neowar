import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { headers } from 'next/headers' // added
import ContextProvider from '@/context'

export const metadata: Metadata = {
  title: "NeoWar - THE AI UPRISING",
  description: "Futuristic heist game with interactive world",
   icons: {
    icon: "/logo.png", // 🔹 your logo URL here
    
  },
  
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

const headersObj = await headers();
  const cookies = headersObj.get('cookie')

  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        
      <ContextProvider cookies={cookies}>{children}</ContextProvider>
        <Analytics />
      </body>
    </html>
  )
}
