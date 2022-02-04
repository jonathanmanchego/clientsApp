import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clientes/create',
    pathMatch: 'full'
  },
  {
    path: 'clientes',
    loadChildren: () => import('./components/clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: '**',
    redirectTo: '/clientes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
