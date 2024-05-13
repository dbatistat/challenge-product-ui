import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LayoutComponent } from './layout/layout.component'
import { MatToolbar } from '@angular/material/toolbar'
import { MatIcon } from '@angular/material/icon'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavModule,
} from '@angular/material/sidenav'
import {
  MatListItem,
  MatListSubheaderCssMatStyler,
  MatNavList,
} from '@angular/material/list'
import { MatProgressBar } from '@angular/material/progress-bar'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatTooltip } from '@angular/material/tooltip'
import { MatLine } from '@angular/material/core'

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MatToolbar,
    MatIcon,
    RouterLink,
    MatMenuTrigger,
    MatMenu,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatProgressBar,
    RouterOutlet,
    MatIconButton,
    MatTooltip,
    MatButton,
    MatMenuItem,
    MatListSubheaderCssMatStyler,
    MatListItem,
    MatLine,
    MatSidenavModule,
    RouterLinkActive,
  ],
  exports: [LayoutComponent],
})
export class SharedModule {}
