import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LayoutComponent } from '../../shared/layout/layout.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductPanelComponent } from './product-panel/product-panel.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: 'create', component: ProductPanelComponent },
      { path: ':id/edit', component: ProductPanelComponent },
      { path: ':id/view', component: ProductPanelComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
