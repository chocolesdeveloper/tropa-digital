"use client"

import { useEffect, useState } from "react"
import { getAuthState, User } from "@/app/services/auth"

import styles from "./events.module.scss"
import { PlusIcon, SearchIcon } from "lucide-react"

const data = [
  {
    nome: "Torneio de Verão",
    equipes: 12,
    status: "Ativo",
    data: "09 a 11 de Junho",
  },
  {
    nome: "Campeonato Regional",
    equipes: 8,
    status: "Encerrado",
    data: "15 a 17 de Junho",
  },
  {
    nome: "Copa Municipal",
    equipes: 10,
    status: "Ativo",
    data: "20 a 22 de Junho",
  },
  {
    nome: "Desafio Estudantil",
    equipes: 6,
    status: "Encerrado",
    data: "25 a 27 de Junho",
  },
  {
    nome: "Liga Universitária",
    equipes: 14,
    status: "Ativo",
    data: "01 a 03 de Julho",
  },
  {
    nome: "Open de Inverno",
    equipes: 7,
    status: "Encerrado",
    data: "05 a 07 de Julho",
  },
  {
    nome: "Festival de Escolas",
    equipes: 9,
    status: "Ativo",
    data: "10 a 12 de Julho",
  },
  {
    nome: "Copa das Comunidades",
    equipes: 11,
    status: "Encerrado",
    data: "15 a 17 de Julho",
  },
  {
    nome: "Torneio de Primavera",
    equipes: 13,
    status: "Ativo",
    data: "20 a 22 de Julho",
  },
  {
    nome: "Desafio Nacional",
    equipes: 16,
    status: "Encerrado",
    data: "25 a 27 de Julho",
  },
]

const itemsPerPage = 2

export default function Dashboard() {
  const [user, setUser] = useState<User | null | undefined>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = data.slice(startIndex, endIndex)

  function getPageRange(currentPage: number, totalPages: number) {
    let start = currentPage - 1
    let end = currentPage + 1

    if (start < 1) {
      start = 1
      end = Math.min(3, totalPages)
    } else if (end > totalPages) {
      end = totalPages
      start = Math.max(totalPages - 2, 1)
    }

    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  useEffect(() => {
    async function getUser() {
      const response = await getAuthState()
      setUser(response?.user)
      setIsLoading(false)
      try {
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }
    getUser()
  }, [])

  return (
    <div className={styles.container}>
      <div>
        {isLoading || !user ? (
          <div className={styles.skeleton} />
        ) : (
          <p className={styles.welcome}>
            Bem-vindo de volta, <span>{user.name}</span>
          </p>
        )}
      </div>
      <div className={styles.containerEvents}>
        <h3>Todos eventos</h3>
        <div className={styles.card}>
          <div className={styles.headCard}>
            <div className={styles.search}>
              <SearchIcon />
              <input type="text" placeholder="Buscar eventos" />
            </div>
            <button className={styles.newInsertButton}>
              <PlusIcon />
              Inserir novo
            </button>
          </div>

          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "10px",
              }}
            >
              <thead>
                <tr>
                  <th className={styles.thStyle}>Nome do evento</th>
                  <th className={styles.thStyle}>Total de equipes</th>
                  <th className={styles.thStyle}>Status</th>
                  <th className={styles.thStyle}>Data</th>
                  <th className={styles.thStyle}></th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((evento, index) => (
                  <tr key={index} className={styles.trStyle}>
                    <td className={styles.tdStyle}>{evento.nome}</td>
                    <td className={styles.tdStyle}>{evento.equipes}</td>
                    <td className={styles.tdStyle}>
                      <div className={styles.statusWrapper}>
                        {evento.status === "Ativo" && <div className={styles.statusActive} />}
                        {evento.status === "Encerrado" && <div className={styles.statusClosed} />}

                        {evento.status}
                      </div>
                    </td>
                    <td className={styles.tdStyle}>{evento.data}</td>
                    <td className={styles.tdStyle}>
                      <div className={styles.options}>⋮</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.footerEvents}>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Anterior
            </button>
            {getPageRange(currentPage, totalPages).map((page) => (
              <button
                key={page}
                className={currentPage === page ? styles.active : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
