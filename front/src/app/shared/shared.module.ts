import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { InterceptorService } from './services/interceptor.service';
import { LoaderService } from './services/loader.service';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertMessageService } from './services/alert-message.service';
import { UserDbService } from './services/UserDb.service';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudService } from './services/crud.service';
import { HoverClassDirective } from './directives/hover-class.directive';

@NgModule({
  declarations: [AlertMessageComponent, HoverClassDirective],
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    InterceptorService,
    LoaderService,
    AlertMessageService,
    UserDbService,
    HoverClassDirective,
  ],
  exports: [
    AlertMessageComponent,
    FormsModule,
    ReactiveFormsModule,
    HoverClassDirective,
  ],
})
export class SharedModule {}
