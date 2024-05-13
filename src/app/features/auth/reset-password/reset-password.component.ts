import { Component, OnInit } from '@angular/core'
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { AuthService } from '../../../core/services/auth.service'
import { NotificationService } from '../../../core/services/notification.service'

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  private token!: string
  form!: UntypedFormGroup
  loading!: boolean
  hideNewPassword: boolean
  hideNewPasswordConfirm: boolean

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private authService: AuthService,
  ) {
    this.hideNewPassword = true
    this.hideNewPasswordConfirm = true
  }

  ngOnInit() {
    this.titleService.setTitle('Challenge Product - Cambiar Contraseña')
    this.createForm()
  }

  private createForm() {
    this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
      this.token = params.get('token') + ''

      if (!this.token) {
        this.router.navigate(['/'])
      }
    })

    this.form = new UntypedFormGroup({
      newPassword: new UntypedFormControl('', Validators.required),
      newPasswordConfirm: new UntypedFormControl('', Validators.required),
    })
  }

  resetPassword() {
    const password = this.form.get('newPassword')?.value
    const passwordConfirm = this.form.get('newPasswordConfirm')?.value

    if (password !== passwordConfirm) {
      this.notificationService.openSnackBar('Las contraseñas no coinciden')
      return
    }

    this.loading = true

    this.authService.resetPassword(this.token, password).then(
      () => {
        this.notificationService.openSnackBar('Tu contraseña ha sido cambiada')
        this.router.navigate(['/auth/login'])
      },
      (error: any) => {
        this.notificationService.openSnackBar(error.error)
        this.loading = false
      },
    )
  }

  cancel() {
    this.router.navigate(['/'])
  }
}
