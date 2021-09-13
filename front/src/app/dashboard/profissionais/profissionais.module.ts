import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InterceptorService } from './../../shared/services/interceptor.service';
import { LoaderService } from './../../shared/services/loader.service';
import { SharedModule } from './../../shared/shared.module';
import { ItemComponent } from './item/item.component';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { ProfissionaisRoutingModule } from './profissionais-routing.module';
import { ProfissionaisComponent } from './profissionais.component';
@NgModule({
  imports: [
    ProfissionaisRoutingModule,
    RouterModule,
    CommonModule,
    SharedModule,
    MatGridListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    ModalModule.forRoot(),
    MatSlideToggleModule,
  ],
  declarations: [
    ProfissionaisComponent,
    ListarComponent,
    NovoComponent,
    ItemComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    LoaderService,
  ],
})
export class ProfissionalModule {}
