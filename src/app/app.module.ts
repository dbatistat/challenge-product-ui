import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { AppRoutingModule } from './app-routing.module'
import { MatFormFieldModule } from '@angular/material/form-field'

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterOutlet,
    BrowserAnimationsModule,
    CoreModule,
    MatFormFieldModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
