import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { environment } from 'src/environments/environment';
import {
  CreateTipoProfissionalDto,
  TiposProfissionaDto,
} from '../dtos/tipos-profissional.dto';

@Injectable({
  providedIn: 'root',
})
export class TipoProfissionalService extends CrudService<
  TiposProfissionaDto,
  CreateTipoProfissionalDto
> {
  constructor(http: HttpClient) {
    super(http, environment.API + 'profissional-tipos');
  }
}
