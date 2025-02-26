import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { skip } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

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
  public selectedCategory = 'all';
  public isLoggedIn = false;
  public clearSelection = false;


  constructor(private productsService: ProductsService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
  }

  ngOnInit(): void {
    // initial data loading
    this.productsService.getCategories().subscribe((resp: any) => {
      this.categories = resp;
    }, err => console.error(err))
    this._getProducts();
    // maintain search state and logic
    this.productsService.productSearch$.subscribe(value => {
      if (value) {
        this.clearSelection = true;
        this.currentPage = 1;
        this._getProducts(this.currentPage, value);
      }
    })
    // maintain category selection logic
    this._handleCategorySelection();
    // maintain authentication
    this.authService.authStatus$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    })

    // maintain cart logic
    this._handleCart();
  }

  public pageChangeHandler(event: any) {
    this.currentPage = event;
    this._getProducts(event);
  }


  public onCategoryChange(category: string) {
    // logic to get product by categories
    this.clearSelection = false;
    this.selectedCategory = category;
    // if not generic category get products based on selections
    if (category !== "all") {
      this.currentPage = 1;
      const skip = this._calculateSkip(this.currentPage);
      this.getProductByCategory(category, skip);
      this.router.navigateByUrl(`/products/${category}`, { skipLocationChange: true })
    } else {
      // if generic selection clear all selected categories from UI
      this.clearSelection = true;
    }
  }

  get totalPages(): number {
    return parseInt((this.totalProducts! / this.PAGE_LIMIT).toFixed(0));
  }

  private _getProducts(currentPage = 1, search?: string) {
    const skip = this._calculateSkip(currentPage);
    if (this.selectedCategory === "all") {
      this.productsService.getProducts(skip, this.PAGE_LIMIT, search).subscribe((resp: any) => {
        this.products = this._calculateNewPrice(resp.products);
        this.totalProducts = resp.total;
      }, err => console.error(err))
    } else {
      this.getProductByCategory(this.selectedCategory, skip);
    }

  }



  private getProductByCategory(category: string, skip: number) {
    this.productsService.getProductByCategory(category, skip, this.PAGE_LIMIT).subscribe((resp: any) => {
      this.products = this._calculateNewPrice(resp.products);
      this.totalProducts = resp.total;
    }, err => console.error(err))
  }

  private _calculateSkip(currentPage: number) {
    const limit = this.PAGE_LIMIT;
    const skip = currentPage == 1 ? 0 : limit * (currentPage - 1);
    return skip;
  }

  private _calculateNewPrice(products: any[]) {
    //Selling Price = Listed Price [(100−discount%)/100]
    return products.map(product => {
      const newPrice = (product.price * ((100 - product.discountPercentage) / 100)).toFixed(2)
      return { ...product, newPrice }
    })
  }

  private _handleCategorySelection() {
    // get the current url and handle category selection upon it's change
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const url = '/' + this.activatedRoute.pathFromRoot
          .map(route => route.snapshot.url)
          .filter(urlSegments => !!urlSegments[0])
          .map(([urlSegment]) => urlSegment.path)
          .join('/');
        if (url.includes("all")) {
          this.clearSelection = true;
          this.selectedCategory = "all";
          this.currentPage = 1;
          this._getProducts(this.currentPage);
        }
      }
    });
  }

  private _handleCart() {
    // implement cart logic to disable any ADD_TO_CART button if the added is equal to the stock
    this.productsService.productCart$.subscribe(cart => {
      this.products = this.products.map(product => {
        const productInCart = cart.filter(prod => prod.id === product.id);
        if (productInCart.length === product.stock) {
          return {
            ...product,
            isDisabled: true
          }
        } else {
          return product;
        }

      })
    })
  }

}
