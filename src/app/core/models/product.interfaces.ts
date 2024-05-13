export interface Product extends CreateOrUpdateProduct {
  id: number
}

export interface CreateOrUpdateProduct {
  handle: string
  title: string
  description: string
  sku: string
  grams: number
  price: number
  comparePrice: number
  stock: number
  barcode?: string
}

export type FindProducts = {
  filter: string
  skip: number
  take: number
}
