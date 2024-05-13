import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../enviroments/enviroment'
import { firstValueFrom } from 'rxjs'
import {
  CreateOrUpdateProduct,
  FindProducts,
  Product,
} from '../models/product.interfaces'
import { Pagination } from '../../shared/shared.interfaces'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  async getById(id: number): Promise<Product> {
    return firstValueFrom(
      this.http.get<Product>(`${this.apiUrl}/product/${id}`),
    )
  }

  async find(find: FindProducts): Promise<Pagination<Product>> {
    return firstValueFrom(
      this.http.get<Pagination<Product>>(`${this.apiUrl}/product`, {
        params: find,
      }),
    )
  }

  async create(createOrUpdateProduct: CreateOrUpdateProduct): Promise<Product> {
    return firstValueFrom(
      this.http.post<Product>(`${this.apiUrl}/product`, createOrUpdateProduct),
    )
  }

  async update(
    id: number,
    createOrUpdateProduct: CreateOrUpdateProduct,
  ): Promise<Product> {
    return firstValueFrom(
      this.http.put<Product>(
        `${this.apiUrl}/product/${id}`,
        createOrUpdateProduct,
      ),
    )
  }

  async delete(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/product/${id}`),
    )
  }
}
