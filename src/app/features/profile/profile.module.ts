import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfilePageComponent } from './profile-page/profile-page.component'
import { ProfileRoutingModule } from './profile-routing.module'
import { MatCard, MatCardContent } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCard,
    MatCardContent,
    MatIcon,
  ],
})
export class ProfileModule {}
