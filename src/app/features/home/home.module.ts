import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home/home.component'
import { HomeRoutingModule } from './home-routing.module'
import { MatCard, MatCardContent } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, MatCard, MatCardContent, MatIcon],
})
export class HomeModule {}
