import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
// pagination.component.ts
export class PaginationComponent {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  get pages(): number[] {
    const pagesToShow = 5; // Number of page links to show
    const pages: number[] = [];
    const half = Math.floor(pagesToShow / 2);

    if (this.totalPages <= pagesToShow) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= half) {
        for (let i = 1; i <= pagesToShow - 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // -1 indicates an ellipsis
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - half) {
        pages.push(1);
        pages.push(-1);
        for (let i = this.totalPages - (pagesToShow - 2); i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(this.totalPages);
      }
    }
    return pages;
  }

  onPageChange(page: number): void {
    if (page !== -1 && page !== this.currentPage) {
      this.pageChanged.emit(page);
    }
  }


}
