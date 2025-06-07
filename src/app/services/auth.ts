export interface User {
  name: string
  photoUrl: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

const AUTH_KEY = "@tropa-digital:auth"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function signIn(email: string, password: string): Promise<AuthState> {
  await delay(1000)

  if (email !== "kayquesteck@tropadigital.com" || password !== "kayquesteck") {
    throw new Error("Credenciais inválidas")
  }

  const mockUser: User = {
    name: "Kaique Steck",
    photoUrl: "https://github.com/github.png",
  }

  const authState: AuthState = {
    isAuthenticated: true,
    user: mockUser,
  }

  localStorage.setItem(AUTH_KEY, JSON.stringify(authState))

  return authState
}

export async function getAuthState(): Promise<AuthState | null> {
  await delay(1000)

  const data = localStorage.getItem(AUTH_KEY)
  return data ? JSON.parse(data) : null
}

export async function signOut(redirectUrl?: string): Promise<void> {
  await delay(1000)
  localStorage.removeItem(AUTH_KEY)

  if (redirectUrl) {
    window.location.href = redirectUrl
  }

  window.location.href = "/sign-in"
}
