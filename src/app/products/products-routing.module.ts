import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: ':category',
    component: ProductsComponent,
  },
  {
    path: 'all',
    component: ProductsComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'all',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
