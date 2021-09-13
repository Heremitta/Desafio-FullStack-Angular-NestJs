import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
const PROVIDERS: Provider = [];

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [...PROVIDERS],
  exports: [],
})
export class CoreModule {}
