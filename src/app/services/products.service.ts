import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly BASE_URL = 'https://dummyjson.com/products/';
  // product search state management
  private productSearchSubject = new BehaviorSubject<string>('');
  public productSearch$ = this.productSearchSubject.asObservable();
  // product cart state managemnt
  private productCartSubject = new BehaviorSubject<any[]>([]);
  public productCart$ = this.productCartSubject.asObservable();
  constructor(private http: HttpClient) {
  }

  public getProducts(skip: number, limit: number, search?: string) {
    return this.http.get(`${this.BASE_URL}${search ? '/search?q=' + search : `?skip=${skip}&limit=${limit}`}`);
  }

  public getCategories() {
    return this.http.get(`${this.BASE_URL}/categories`)
  }

  public getProductByCategory(category: string, skip: number, limit: number = 0) {
    return this.http.get(`${this.BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`)
  }

  public setSearchText(searchKeyword: string) {
    this.productSearchSubject.next(searchKeyword);
  }

  public addProductToCart(product: any) {
    this.productCartSubject.next([...this.productCartSubject.getValue(), product])
  }
}
