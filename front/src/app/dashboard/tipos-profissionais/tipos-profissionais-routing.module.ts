import { NovoComponent } from './novo/novo.component';
import { ListarComponent } from './listar/listar.component';
import { LoaderService } from './../../shared/services/loader.service';
import { InterceptorService } from './../../shared/services/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { TiposProfissionaisComponent } from './tipos-profissionais.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar',
  },
  {
    path: '',
    component: TiposProfissionaisComponent,
    children: [
      { path: 'listar', component: ListarComponent },
      { path: 'novo', component: NovoComponent },
      { path: 'item/:id', component: ItemComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    LoaderService,
  ],
})
export class TiposProfissionaisRoutingModule {}
