export interface User {
  id: number
  username: string
  fullname: string
  email: string
}

export interface LoggedIn {
  accessToken: string
}

export interface SignIn {
  username: string
  password: string
  fullname: string
  email: string
}
