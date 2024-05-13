import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LayoutComponent } from '../../shared/layout/layout.component'
import { ProfilePageComponent } from './profile-page/profile-page.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: ProfilePageComponent }],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
