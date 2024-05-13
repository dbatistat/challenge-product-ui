import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfilePageComponent } from './profile-page/profile-page.component'
import { ProfileRoutingModule } from './profile-routing.module'
import { MatCard, MatCardContent } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field'
import { MatButton } from '@angular/material/button'
import { MatInput, MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatFormFieldModule,
    MatCard,
    MatCardContent,
    MatIcon,
    MatFormField,
    MatButton,
    MatInput,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class ProfileModule {}
