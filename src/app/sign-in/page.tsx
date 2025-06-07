"use client"

import { useState } from "react"
import Image from "next/image"

import { EyeClosedIcon, EyeIcon, Loader } from "lucide-react"

import { signIn } from "../services/auth"

import styles from "./sign-in.module.scss"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  })

  const handleVisibilityPassword = () => {
    setIsVisiblePassword(!isVisiblePassword)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      await signIn(formState.email, formState.password)
      setIsLoading(false)
      router.push("/dashboard")
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContent}>
          <Image src="/logo.svg" alt="tropa digital" width={161} height={25} />
          <div>
            <h1>Bem-vindo de volta</h1>
            <span>Entre com sua conta para acessar o painel.</span>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label htmlFor="">E-mail</label>
              <input
                type="text"
                placeholder="seunome@seuservidor.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="">Senha</label>
              <input
                type={isVisiblePassword ? "text" : "password"}
                placeholder="Digite aqui"
                value={formState.password}
                onChange={(e) => setFormState({ ...formState, password: e.target.value })}
              />
              {isVisiblePassword ? (
                <EyeClosedIcon onClick={handleVisibilityPassword} />
              ) : (
                <EyeIcon onClick={handleVisibilityPassword} />
              )}
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? <Loader className={styles.loader} size={14} /> : "Enviar"}
            </button>
            {isError && <span className={styles.errorMessage}>E-mail ou senha erradas.</span>}
          </form>
        </div>
        <div>
          <Image
            src="/sign-in.png"
            alt="Homem mexendo no computador e celular ao mesmo tempo"
            width={357}
            height={316}
          />
        </div>
      </div>
    </div>
  )
}
