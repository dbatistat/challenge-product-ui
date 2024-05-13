import { Component, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Product } from '../../../core/models/product.interfaces'
import { ProductService } from '../../../core/services/product.service'
import { MatPaginator } from '@angular/material/paginator'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component'
import { NotificationService } from '../../../core/services/notification.service'

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  data: Product[] = []
  displayedColumns: string[] = [
    'sku',
    'title',
    'grams',
    'price',
    'comparePrice',
    'stock',
  ]

  displayedColumnsText: Record<string, string> = {
    sku: 'SKU',
    title: 'Titutlo',
    grams: 'Gramos',
    price: 'Precio',
    comparePrice: 'Comparar precio',
    stock: 'Stock',
  }

  displayedColumnsWithAction = [...this.displayedColumns, 'action']
  dataSource = new MatTableDataSource(this.data)
  pageSize = 10
  pageTotal = 0
  pageIndex = 0
  loading = false

  @ViewChild(MatPaginator)
  paginator!: MatPaginator

  constructor(
    private router: Router,
    private productService: ProductService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getData('')
    this.dataSource.paginator = this.paginator
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    this.getData(filterValue)
  }

  getData(filter: string) {
    this.dataSource.filter = filter || ''
    this.loading = true
    this.productService
      .find({
        filter: filter || '',
        skip: this.pageIndex,
        take: this.pageSize,
      })
      .then((data) => {
        this.data = data.data
        this.pageSize = Math.ceil(data.total / 10)
        this.pageTotal = data.total

        this.dataSource.data = this.data
      })
      .finally(() => {
        this.loading = false
      })
  }

  changePagination(event: any) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.getData(this.dataSource.filter)
  }

  actionCreateClick() {
    this.router.navigate(['/products/create'])
  }

  actionShowClick(product: Product) {
    this.router.navigate([`/products/${product.id}/view`])
  }

  actionEditClick(product: Product) {
    this.router.navigate([`/products/${product.id}/edit`])
  }

  actionDeleteClick(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Eliminar producto',
        message: 'Estas seguro que quieres eliminar este producto?',
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loading = true
        this.productService
          .delete(product.id)
          .then(() => {
            this.notificationService.openSnackBar(
              'Producto eliminado correctamente',
            )
            this.getData(this.dataSource.filter)
          })
          .catch((error) => {
            this.notificationService.openSnackBar(
              'Hubo un problema al eliminar el producto, comuniquese con el administrador.',
            )
          })
          .finally(() => {
            this.loading = false
          })
      }
    })
  }
}
