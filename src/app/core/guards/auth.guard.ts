import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'

import { AuthService } from '../services/auth.service'
import { NotificationService } from '../services/notification.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService,
  ) {}

  canActivate() {
    const token = this.authService.getToken()

    if (token != null) {
      const expiry = JSON.parse(atob(token.accessToken.split('.')[1])).exp

      if (Math.floor(new Date().getTime() / 1000) <= expiry) {
        return true
      } else {
        this.notificationService.openSnackBar('Tu sesion ha expirado')
        this.router.navigate(['auth/login'])
        return false
      }
    } else {
      this.router.navigate(['auth/login'])
      return false
    }
  }
}
