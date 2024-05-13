import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { CreateAccountComponent } from './create-account/create-account.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'reset-password-request',
    component: ResetPasswordRequestComponent,
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'sign-in', component: CreateAccountComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
