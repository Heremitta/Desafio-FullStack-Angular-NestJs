import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ModalModule } from "ngx-bootstrap/modal";
import { SharedModule } from "../shared/shared.module";
import { InterceptorService } from "./../shared/services/interceptor.service";
import { LoaderService } from "./../shared/services/loader.service";
import { BemVindoComponent } from "./bem-vindo/bem-vindo.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    ModalModule.forRoot(),
  ],
  declarations: [DashboardComponent, BemVindoComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    LoaderService,
  ],
})
export class DashboardModule {}
