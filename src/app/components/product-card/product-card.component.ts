import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: any;
  constructor(private productService: ProductsService) { }

  addProductToCart() {
    this.productService.addProductToCart(this.product)
  }
}
