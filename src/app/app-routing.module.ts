import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import(`./login/login.module`).then((r) => r.LoginModule),
}, {
  path: 'products',
  loadChildren: () => import(`./products/products.module`).then((r) => r.ProductsModule),

}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
