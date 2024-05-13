import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserListComponent } from './user-list/user-list.component'
import { MatCard, MatCardContent } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, UserRoutingModule, MatCard, MatCardContent, MatIcon],
})
export class UserModule {}
