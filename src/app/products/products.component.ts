import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { skip } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  private readonly PAGE_LIMIT = 10; // default page limit
  public currentPage = 1;
  public categories: any[] = []
  public products: any[] = [];
  public totalProducts = null;
  public selectedCategory = '';
  private limit: number | null = null;
  constructor(private productsService: ProductsService) {
    productsService.getCategories().subscribe((resp: any) => {
      this.categories = resp;
    }, err => console.error(err))
    this.getProducts()
  }

  ngOnInit(): void {

  }

  pageChangeHandler(event: any) {
    this.currentPage = event;
    this.getProducts(event);
  }

  private getProducts(currentPage = 1) {
    const skip = this.calculateSkip(currentPage);
    if (!this.selectedCategory) {
      this.productsService.getProducts(skip, this.PAGE_LIMIT).subscribe((resp: any) => {
        this.products = resp.products;
        this.totalProducts = resp.total;
      }, err => console.error(err))
    } else {
      this.getProductByCategory(this.selectedCategory, skip);
    }

  }

  get totalPages(): number {
    return Math.floor(this.totalProducts! / this.PAGE_LIMIT);
  }


  onCategoryChange(category: string) {
    // logic to get product by categories
    this.selectedCategory = category;
    if (category) {
      this.currentPage = 1;
      const skip = this.calculateSkip(this.currentPage);
      this.getProductByCategory(category, skip);
    }

  }

  private getProductByCategory(category: string, skip: number) {
    this.productsService.getProductByCategory(category, skip, this.PAGE_LIMIT).subscribe((resp: any) => {
      this.products = resp.products;
      this.totalProducts = resp.total;
      this.limit = this.totalProducts!;
    }, err => console.error(err))
  }

  private calculateSkip(currentPage: number) {
    const limit = this.PAGE_LIMIT;
    const skip = currentPage == 1 ? 0 : limit * (currentPage - 1);
    return skip;
  }
}
