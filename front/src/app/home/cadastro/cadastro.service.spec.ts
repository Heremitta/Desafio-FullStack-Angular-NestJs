import { TestBed } from '@angular/core/testing';

import { LoginService } from '../shared/services/login.service';

describe('CadastroService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
