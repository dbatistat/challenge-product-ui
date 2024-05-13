import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'reset-password-request',
    component: ResetPasswordRequestComponent,
  },
  { path: 'reset-password', component: ResetPasswordComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
