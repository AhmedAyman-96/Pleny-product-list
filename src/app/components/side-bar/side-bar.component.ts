import { Component, EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  @Output() categoryChanged = new EventEmitter<string>();
  public currentCategory: string = '';
  public categories: any[] = [];
  constructor(private productsService: ProductsService) {
    productsService.getCategories().subscribe((resp: any) => {
      this.categories = resp;
    }, err => console.error(err))
  }


  onCategoryChange(category: string): void {
    this.categoryChanged.emit(category);
  }
}
