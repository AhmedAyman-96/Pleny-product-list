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
    return this.http.get(`${this.BASE_URL}?limit=${limit}`);
  }

  public getCategories() {
    return this.http.get(`${this.BASE_URL}/categories`)
  }
}
