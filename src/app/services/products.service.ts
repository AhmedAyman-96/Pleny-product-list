import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly BASE_URL = 'https://dummyjson.com/products/';
  constructor(private http: HttpClient) {
  }

  public getProducts(skip: number, limit: number) {
    return this.http.get(`${this.BASE_URL}?skip=${skip}&limit=${limit}`);
  }

  public getCategories() {
    return this.http.get(`${this.BASE_URL}/categories`)
  }

  public getProductByCategory(category: string, skip: number, limit: number = 0) {
    return this.http.get(`${this.BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`)
  }
}
