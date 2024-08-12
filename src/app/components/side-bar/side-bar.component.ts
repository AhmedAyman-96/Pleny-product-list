import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  public categories: any[] = [];
  constructor(private productsService: ProductsService) {
    productsService.getCategories().subscribe((resp: any) => {
      this.categories = resp;
    }, err => console.error(err))
  }
}
