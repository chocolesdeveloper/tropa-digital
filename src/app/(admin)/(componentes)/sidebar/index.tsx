"use client"

import { useEffect, useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { getAuthState, signOut, User } from "@/app/services/auth"

import Logout from "@/assets/logout.svg"
import Menu from "@/assets/menu-icon.svg"
import Account from "@/assets/account.svg"
import Event from "@/assets/event-icon.svg"
import Teams from "@/assets/teams-icon.svg"
import Registrations from "@/assets/registrations-icon.svg"

import styles from "./sidebar.module.scss"
import { Loader } from "lucide-react"

interface MockMenuProps {
  title: string
  icon: React.ReactNode
  path: string
}

const MOCK_MENU: MockMenuProps[] = [
  {
    title: "Dashboard",
    icon: <Menu />,
    path: "/dashboard",
  },
  {
    title: "Eventos",
    icon: <Event />,
    path: "/events",
  },
  {
    title: "Equipes",
    icon: <Teams />,
    path: "/teams",
  },
  {
    title: "Inscrições",
    icon: <Registrations />,
    path: "/registrations",
  },
]

export function SideBar() {
  const pathname = usePathname()

  const [user, setUser] = useState<User | null | undefined>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function getUser() {
      try {
        const getUser = await getAuthState()
        setUser(getUser?.user)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()
  }, [])

  const toggleSidebar = () => {
    setOpen(!open)
  }

  const handleLogout = () => {
    signOut()
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`${styles.mobileToggle} ${open ? styles.close : ""}`}
      >
        ☰
      </button>

      <div className={`${styles.container} ${open ? styles.open : ""}`}>
        <button className={styles.mobileToggle} onClick={toggleSidebar}>
          ✕
        </button>

        <Image src="/logo.svg" alt="tropa digital" width={160.6} height={24.9} />
        <div className={styles.containerMenu}>
          <h3>MENU</h3>
          <div className={styles.menu}>
            {MOCK_MENU.map((item) => {
              const isActive = pathname === item.path

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={styles.link}
                  onClick={toggleSidebar}
                  style={{
                    backgroundColor: isActive ? "#cc6237" : "transparent",
                    color: isActive ? "#fff" : "#000",
                    borderRadius: isActive ? "5px" : "0",
                  }}
                >
                  {item.icon}
                  {item.title}
                </Link>
              )
            })}
          </div>
        </div>
        <div className={styles.containerFooter}>
          <div className={styles.contentFooter}>
            <div className={styles.imageFooter}>
              {isLoading ? (
                <Loader className={styles.loading} />
              ) : (
                <Image
                  src="/sidebar-profile.png"
                  alt={user?.name || "Name"}
                  width={40}
                  height={40}
                />
              )}
            </div>
            <div className={styles.nameFooter}>
              <p>{user?.name}</p>
              <span>Administrador</span>
            </div>
          </div>
          <div className={styles.footerOptions}>
            <div>
              <Account />
              Alterar dados
            </div>
            <div onClick={handleLogout}>
              <Logout />
              Sair
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
