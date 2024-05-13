import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductListComponent } from './product-list/product-list.component'
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardSubtitle,
} from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { ProductRoutingModule } from './product-routing.module'
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field'
import { MatInput, MatInputModule } from '@angular/material/input'
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTable,
  MatTableModule,
} from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { MatProgressBar } from '@angular/material/progress-bar'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { ProductPanelComponent } from './product-panel/product-panel.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [ProductListComponent, ProductPanelComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatCard,
    MatCardContent,
    MatIcon,
    MatFormField,
    MatInput,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginator,
    MatProgressSpinner,
    MatProgressBar,
    MatCardFooter,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatButton,
    ReactiveFormsModule,
    MatCardSubtitle,
  ],
})
export class ProductModule {}
