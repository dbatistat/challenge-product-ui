import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../enviroments/enviroment'
import { firstValueFrom } from 'rxjs'
import { LoggedIn, SignIn, User } from '../models/auth.interfaces'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl
  private loggedIn = 'loggedIn'
  private currentUser = 'currentUser'

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
      this.localStorage.removeItem(this.loggedIn)
      this.localStorage.removeItem(this.currentUser)
      this.localStorage.setItem(this.loggedIn, JSON.stringify(loggedIn))
    })
  }

  logout(): void {
    this.localStorage.removeItem(this.loggedIn)
    this.localStorage.removeItem(this.currentUser)
  }

  async getCurrentUser(): Promise<User> {
    const currentUser = this.localStorage.getItem(this.currentUser)

    if (currentUser == null) {
      return firstValueFrom(
        this.http.post<User>(`${this.apiUrl}/auth/user`, {}),
      ).then((user) => {
        this.localStorage.setItem(this.currentUser, JSON.stringify(user))

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

  async signIn(signIn: SignIn): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/auth/signIn`, signIn),
    )
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

  changePassword(currentPassword: string, newPassword: string): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/user/change-password`, {
        currentPassword,
        newPassword,
      }),
    )
  }
}
