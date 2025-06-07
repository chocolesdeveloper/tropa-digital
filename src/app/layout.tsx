import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./styles/global.scss"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "Tropa Digital",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>{children}</body>
    </html>
  )
}
