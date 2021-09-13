import { ProfissionalModule } from './profissionais/profissionais.module';
import { TiposProfissionaisComponent } from './tipos-profissionais/tipos-profissionais.component';
import { ProfissionaisComponent } from './profissionais/profissionais.component';
import { InterceptorService } from './../shared/services/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderService } from './../shared/services/loader.service';
import { LogedGuard } from './loged.guard';
import { BemVindoComponent } from './bem-vindo/bem-vindo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bem-vindo',
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [LogedGuard],
    children: [
      { path: 'bem-vindo', component: BemVindoComponent },
      {
        path: 'tipos-profissionais',
        loadChildren: () =>
          import('./tipos-profissionais/tipos-profissionais.module').then(
            (m) => m.TipoProfissionalModule
          ),
      },
      {
        path: 'profissionais',
        loadChildren: () =>
          import('./profissionais/profissionais.module').then(
            (m) => m.ProfissionalModule
          ),
      },
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
export class DashboardRoutingModule {}
