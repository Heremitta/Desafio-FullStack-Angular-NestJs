import { environment } from './../../../../../environments/environment';
import {
  CreateProfissionalDto,
  ProfissionalDto,
} from './../dtos/profissional.dto';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { TiposDeProfissionaisDto } from 'src/app/dashboard/shared/dtos/tiposDeProfissionais.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfissionaisService extends CrudService<
  ProfissionalDto,
  CreateProfissionalDto
> {
  constructor(http: HttpClient) {
    super(http, environment.API + 'profissionais');
  }
  getAllTiposDeProfissionais() {
    return this._http.get<TiposDeProfissionaisDto[]>(
      environment.API + 'profissional-tipos'
    );
  }
}
