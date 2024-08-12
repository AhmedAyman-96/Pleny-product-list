import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() pageChanged = new EventEmitter<number>();

  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];

  ngOnInit() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  selectPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.selectPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.selectPage(this.currentPage + 1);
    }
  }
}
