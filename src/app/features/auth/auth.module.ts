import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { LoginComponent } from './login/login.component'
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card'
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'
import { MatSlideToggle } from '@angular/material/slide-toggle'
import { MatProgressBar } from '@angular/material/progress-bar'
import { MatInputModule } from '@angular/material/input'
import { MatButton } from '@angular/material/button'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { MatIcon } from '@angular/material/icon'
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component'
import { SharedModule } from '../../shared/shared.module'
import { CreateAccountComponent } from './create-account/create-account.component'

@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    ResetPasswordRequestComponent,
    CreateAccountComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatCardTitle,
    MatCard,
    MatCardSubtitle,
    MatCardContent,
    MatFormField,
    MatSlideToggle,
    MatCardActions,
    MatProgressBar,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatIcon,
  ],
})
export class AuthModule {}
