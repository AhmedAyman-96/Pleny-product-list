import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnChanges {
  @Output() categoryChanged = new EventEmitter<string>();
  @ViewChildren('input') inputs!: QueryList<ElementRef>;
  @Input() clearSelection = false;
  public uncheckAll = true;
  public currentCategory: string = '';
  public categories: any[] = [];
  constructor(private productsService: ProductsService) {
    productsService.getCategories().subscribe((resp: any) => {
      this.categories = resp;
    }, err => console.error(err))
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.clearSelection) {
      this.inputs.forEach(input => input.nativeElement.checked = false);
    }
  }


  onCategoryChange(category: string): void {
    this.categoryChanged.emit(category);
  }

}
