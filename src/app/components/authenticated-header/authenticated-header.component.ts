import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authenticated-header',
  templateUrl: './authenticated-header.component.html',
  styleUrl: './authenticated-header.component.scss'
})
export class AuthenticatedHeaderComponent implements OnInit {
  public cartItemCount = 0;
  public isAuthenticated = false;
  constructor(private productService: ProductsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authStatus$.subscribe(isAutenticated => {
      this.isAuthenticated = isAutenticated;
    })
    this.productService.productCart$.subscribe(cart => {
      this.cartItemCount = cart.length
    })
  }

  navigateToCart() {
    throw new Error("function is not implemented")
  }

  search(value: any) {
    this.productService.setSearchText(value);
  }
}
