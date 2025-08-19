import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MEL System - KCSON",
  description: "Monitoring, Evaluation, and Learning System for Kagera Civil Society Organizations Network",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-50">
          {/* <Sidebar /> */}
          <div className="flex-1 flex flex-col min-w-0">{children}</div>
        </div>
      </body>
    </html>
  )
}
