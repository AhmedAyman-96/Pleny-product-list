import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'logout',
    loadChildren: () => import(`./logout/logout.module`).then((r) => r.LogoutModule),

  },
  {
    path: 'login',
    loadChildren: () => import(`./login/login.module`).then((r) => r.LoginModule),
  }, {
    path: 'products',
    loadChildren: () => import(`./products/products.module`).then((r) => r.ProductsModule),
    canActivate: [AuthGuard]
  }, {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
