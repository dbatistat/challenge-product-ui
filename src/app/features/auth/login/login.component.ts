import { Component, OnInit } from '@angular/core'
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { AuthService } from '../../../core/services/auth.service'
import { NotificationService } from '../../../core/services/notification.service'

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup
  loading!: boolean

  constructor(
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private authenticationService: AuthService,
  ) {}

  ngOnInit() {
    this.titleService.setTitle('angular-material-template - Login')
    this.createForm()
  }

  private createForm() {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', Validators.required),
    })
  }

  login() {
    const username = this.loginForm.get('username')?.value
    const password = this.loginForm.get('password')?.value

    this.loading = true
    this.authenticationService.login(username?.toLowerCase(), password).then(
      (data) => {
        this.router.navigate(['/'])
        this.loading = false
      },
      (error) => {
        if (error.error.statusCode === 401) {
          this.notificationService.openSnackBar('Usuario no autorizado')
        } else {
          this.notificationService.openSnackBar('Error en el servidor')
        }

        this.loading = false
      },
    )
  }

  resetPassword() {
    this.router.navigate(['/auth/reset-password-request'])
  }
}
