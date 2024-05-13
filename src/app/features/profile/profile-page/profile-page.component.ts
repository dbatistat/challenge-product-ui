import { Component, OnInit } from '@angular/core'
import { User } from '../../../core/models/auth.interfaces'
import { AuthService } from '../../../core/services/auth.service'
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { NotificationService } from '../../../core/services/notification.service'

@Component({
  selector: 'app-profile-page',
  standalone: false,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  user!: User

  form!: UntypedFormGroup
  hideCurrentPassword!: boolean
  hideNewPassword!: boolean
  currentPassword!: string
  newPassword!: string
  newPasswordConfirm!: string
  disableSubmit!: boolean

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
    this.hideCurrentPassword = true
    this.hideNewPassword = true

    this.form = new UntypedFormGroup({
      currentPassword: new UntypedFormControl('', Validators.required),
      newPassword: new UntypedFormControl('', Validators.required),
      newPasswordConfirm: new UntypedFormControl('', Validators.required),
    })

    this.form.get('currentPassword')?.valueChanges.subscribe((val) => {
      this.currentPassword = val
    })

    this.form.get('newPassword')?.valueChanges.subscribe((val) => {
      this.newPassword = val
    })

    this.form.get('newPasswordConfirm')?.valueChanges.subscribe((val) => {
      this.newPasswordConfirm = val
    })
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.authService.getCurrentUser()
  }

  async changePassword(): Promise<void> {
    if (this.newPassword !== this.newPasswordConfirm) {
      this.notificationService.openSnackBar('Las contraseñas no coinciden')
      return
    }

    this.authService
      .changePassword(this.currentPassword, this.newPassword)
      .then(
        (data) => {
          this.form.reset()
          this.notificationService.openSnackBar(
            'Tu contraseña ha sido cambiado correctamente',
          )
        },
        (error) => {
          this.notificationService.openSnackBar(
            'Hubo un problema al cambiar tu contraseña, intente mas tarde',
          )
        },
      )
  }
}
