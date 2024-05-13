export interface User {
  id: number
  username: string
  fullname: string
  email: string
}

export interface LoggedIn {
  accessToken: string
}
