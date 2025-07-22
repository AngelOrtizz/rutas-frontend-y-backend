import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckLoginGuard } from './shared/guards/check-login-guard';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home-module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login-module').then(m => m.LoginModule),
    canActivate: [CheckLoginGuard]
  },
  {
    path: 'alumnos',
    loadComponent: () => import('./pages/alumnos/alumnos').then(c => c.Alumnos)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export { routes };
