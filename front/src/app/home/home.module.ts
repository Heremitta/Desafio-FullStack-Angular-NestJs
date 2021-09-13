import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { SharedModule } from "../shared/shared.module";
import { InterceptorService } from "./../shared/services/interceptor.service";
import { LoaderService } from "./../shared/services/loader.service";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { InicialComponent } from "./inicial/inicial.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    InicialComponent,
    CadastroComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    RouterModule,
    TooltipModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    LoaderService,
  ],
})
export class HomeModule {}
