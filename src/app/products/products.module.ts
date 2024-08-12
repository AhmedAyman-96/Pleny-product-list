import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { BreadcrampsComponent } from '../components/breadcramps/breadcramps.component';
import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';


@NgModule({
  declarations: [
    ProductsComponent,
    PaginationComponent,
    BreadcrampsComponent,
    SideBarComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
