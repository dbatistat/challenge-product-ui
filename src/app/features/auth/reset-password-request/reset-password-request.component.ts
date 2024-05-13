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
  templateUrl: './reset-password-request.component.html',
  styleUrl: './reset-password-request.component.scss',
})
export class ResetPasswordRequestComponent implements OnInit {
  private token!: string
  form!: UntypedFormGroup
  loading!: boolean

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Challenge Product - Recuperar Contraseña')
    this.createForm()
  }

  private createForm() {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('', Validators.required),
    })
  }

  resetPassword() {
    this.loading = true
    const email = this.form.get('email')?.value
    this.authService.resetPasswordRequest(email).then(
      (_) => {
        this.router.navigate(['/auth/login'])
        this.notificationService.openSnackBar(
          'Se ha enviado un correo de verificación a su correo electrónico',
        )
      },
      (error) => {
        this.loading = false
        this.notificationService.openSnackBar(error.error)
      },
    )
  }

  cancel() {
    this.router.navigate(['/auth/login'])
  }
}
