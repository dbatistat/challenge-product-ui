import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import {
  CreateOrUpdateProduct,
  Product,
} from '../../../core/models/product.interfaces'
import { ProductService } from '../../../core/services/product.service'
import { NotificationService } from '../../../core/services/notification.service'

@Component({
  selector: 'app-product-panel',
  standalone: false,
  templateUrl: './product-panel.component.html',
  styleUrl: './product-panel.component.scss',
})
export class ProductPanelComponent implements OnInit {
  id!: number
  action!: 'view' | 'edit' | 'create'
  title!: string
  form!: UntypedFormGroup
  loading!: boolean
  product!: Product

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private notificationService: NotificationService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.activatedRoute.snapshot.params['id']

    if (this.id == null) {
      this.title = 'Crear Producto'
      this.action = 'create'
      this.createForm()
      return
    }

    const pathAction = this.activatedRoute.snapshot.url[1].path

    if (pathAction !== 'view' && pathAction !== 'edit') {
      this.router.navigate(['/products'])
      return
    }

    this.action = pathAction

    if (this.action === 'view') {
      this.title = 'Producto'
      this.getProduct(this.id).then(() => this.createForm())
    } else if (this.action === 'edit') {
      this.title = 'Editar Producto'
      this.getProduct(this.id).then(() => this.createForm())
    } else {
      this.title = 'Crear Producto'
      this.createForm()
    }
  }

  private createForm() {
    this.form = new UntypedFormGroup({
      handle: new UntypedFormControl(this.product?.handle || '', [
        Validators.required,
      ]),
      title: new UntypedFormControl(this.product?.title || '', [
        Validators.required,
      ]),
      description: new UntypedFormControl(this.product?.description || '', []),
      sku: new UntypedFormControl(this.product?.sku || '', [
        Validators.required,
      ]),
      grams: new UntypedFormControl(this.product?.grams || '', [
        Validators.required,
      ]),
      price: new UntypedFormControl(this.product?.price || '', [
        Validators.required,
      ]),
      comparePrice: new UntypedFormControl(this.product?.comparePrice || '', [
        Validators.required,
      ]),
      stock: new UntypedFormControl(this.product?.stock || '', [
        Validators.required,
      ]),
      barcode: new UntypedFormControl(this.product?.barcode || '', []),
    })
  }

  private async getProduct(id: number): Promise<void> {
    this.loading = true
    return this.productService
      .getById(id)
      .then((data) => {
        this.product = data
      })
      .catch((error) => {
        this.notificationService.openSnackBar(
          'Hubo un problema al obtener el producto, comuniquese con el administrador.',
        )
      })
      .finally(() => {
        this.loading = false
      })
  }

  async save(): Promise<void> {
    const handle = this.form.get('handle')?.value
    const title = this.form.get('title')?.value
    const description = this.form.get('description')?.value
    const sku = this.form.get('sku')?.value
    const grams = this.form.get('grams')?.value
    const price = this.form.get('price')?.value
    const comparePrice = this.form.get('comparePrice')?.value
    const stock = this.form.get('stock')?.value
    const barcode = this.form.get('barcode')?.value

    const createOrUpdate: CreateOrUpdateProduct = {
      handle,
      title,
      description,
      sku,
      grams,
      price,
      comparePrice,
      stock,
      barcode,
    }

    this.loading = true
    if (this.action === 'create') {
      this.productService
        .create(createOrUpdate)
        .then((data) => {
          this.notificationService.openSnackBar('Producto creado correctamente')
          this.router.navigate(['/products'])
        })
        .catch((error) => {
          this.notificationService.openSnackBar(
            'Hubo un problema al crear el producto, comuniquese con el administrador.',
          )
        })
        .finally(() => {
          this.loading = false
        })
    } else {
      this.productService
        .update(this.product.id, createOrUpdate)
        .then((data) => {
          this.notificationService.openSnackBar(
            'Producto actualizado correctamente',
          )
          this.router.navigate(['/products'])
        })
        .catch((error) => {
          this.notificationService.openSnackBar(
            'Hubo un problema al guardar el producto, comuniquese con el administrador.',
          )
        })
        .finally(() => {
          this.loading = false
        })
    }
  }

  cancel() {
    this.router.navigate(['/products'])
  }
}
