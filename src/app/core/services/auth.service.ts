import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../enviroments/enviroment'
import { delay, firstValueFrom, of } from 'rxjs'
import { LoggedIn, User } from '../models/auth.interfaces'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl
  private loggedIn = 'loggedIn'

  constructor(
    private http: HttpClient,
    @Inject('LOCALSTORAGE') private localStorage: Storage,
  ) {}

  async login(username: string, password: string): Promise<void> {
    await firstValueFrom(
      this.http.post<LoggedIn>(`${this.apiUrl}/auth/login`, {
        username,
        password,
      }),
    ).then((loggedIn) => {
      this.localStorage.setItem(this.loggedIn, JSON.stringify(loggedIn))
    })
  }

  logout(): void {
    this.localStorage.removeItem(this.loggedIn)
    this.localStorage.removeItem('currentUser')
  }

  async getCurrentUser(): Promise<User> {
    const currentUser = this.localStorage.getItem('currentUser')

    if (currentUser == null) {
      return firstValueFrom(
        this.http.post<User>(`${this.apiUrl}/auth/user`, {}),
      ).then((user) => {
        this.localStorage.setItem('currentUser', JSON.stringify(user))

        return user
      })
    } else {
      return JSON.parse(currentUser)
    }
  }

  getToken(): LoggedIn | null {
    const loggedIn = this.localStorage.getItem(this.loggedIn)

    if (loggedIn != null) {
      return JSON.parse(loggedIn)
    }

    return null
  }

  async resetPasswordRequest(email: string): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/auth/reset-password-request`, {
        email,
      }),
    )
  }

  resetPassword(token: string, newPassword: string): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/auth/reset-password`, {
        token,
        newPassword,
      }),
    )
  }
}
