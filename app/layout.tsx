import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LayoutProvider } from "@/components/layout-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "SentryBox - 监控管理系统",
  description: "SentryBox安全监控管理系统",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} antialiased`}>
      <body className="font-sans">
        <div className="flex h-screen">
          <LayoutProvider>{children}</LayoutProvider>
        </div>
      </body>
    </html>
  )
}
