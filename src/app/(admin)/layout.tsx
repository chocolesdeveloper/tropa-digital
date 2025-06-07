"use client"

import { ReactNode, useEffect } from "react"

import { SideBar } from "./(componentes)/sidebar"

import styles from "./layout.module.scss"
import { useRouter } from "next/navigation"
import { getAuthState } from "../services/auth"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      try {
        const auth = await getAuthState()

        if (!auth?.user) {
          router.push("/sign-in")
        } else {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
      }
    }

    checkAuth()
  }, [router])

  return (
    <div className={styles.container}>
      <SideBar />
      {children}
    </div>
  )
}
