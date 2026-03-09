import type { Metadata } from 'next'
import { Nunito, Cinzel_Decorative } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
})

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-cinzel',
})

export const metadata: Metadata = {
  title: 'Truy Tim Kho Bau',
  description: 'Game nhieu nguoi choi theo luot - Truy tim kho bau huyen thoai!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${nunito.variable} ${cinzel.variable}`}>
      <body className={nunito.className}>{children}</body>
    </html>
  )
}
