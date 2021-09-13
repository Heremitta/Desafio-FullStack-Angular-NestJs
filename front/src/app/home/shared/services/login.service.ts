import { environment } from '../../../../environments/environment';
import { authLoginDto, CreateLoginDto } from '../../../shared/dtos/login.dto';
import { Injectable } from '@angular/core';
import { LoginDto } from 'src/app/shared/dtos/login.dto';
import { CrudService } from 'src/app/shared/services/crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends CrudService<authLoginDto, CreateLoginDto> {
  constructor(http: HttpClient) {
    super(http, environment.API + 'usuarios');
  }
}
