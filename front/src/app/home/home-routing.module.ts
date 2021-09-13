import { InterceptorService } from './../shared/services/interceptor.service';
import { LoaderService } from './../shared/services/loader.service';
import { InicialComponent } from './inicial/inicial.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },

      {
        path: 'home',
        component: InicialComponent,
      },
      {
        path: 'cadastro',
        component: CadastroComponent,
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
export class HomeRoutingModule {}
