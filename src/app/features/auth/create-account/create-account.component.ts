import { Component, OnInit } from '@angular/core'
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { AuthService } from '../../../core/services/auth.service'
import { NotificationService } from '../../../core/services/notification.service'

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent implements OnInit {
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
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
      username: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
      fullname: new UntypedFormControl('', Validators.required),
    })
  }

  resetPassword() {
    this.loading = true
    const email = this.form.get('email')?.value
    const username = this.form.get('username')?.value
    const password = this.form.get('password')?.value
    const fullname = this.form.get('fullname')?.value
    this.authService
      .signIn({
        email,
        username,
        password,
        fullname,
      })
      .then(
        (_) => {
          this.router.navigate(['/auth/login'])
          this.notificationService.openSnackBar('Cuenta creada correctamente')
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
