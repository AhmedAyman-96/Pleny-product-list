import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  public pages = [1, 2, 3, 4, 5];
  public categories: any[] = []
  public products: any[] = [];
  constructor(private productsService: ProductsService) {
    productsService.getCategories().subscribe((resp: any) => {
      this.categories = resp;
    }, err => console.error(err))
    productsService.getProducts(0, 0).subscribe((resp: any) => {
      this.products = resp.products;
    }, err => console.error(err))
  }

  ngOnInit(): void {

  }
}
