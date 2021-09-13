import { TestBed } from '@angular/core/testing';

import { TipoProfissionalService } from './tipo-profissional.service';

describe('TipoProfissionalService', () => {
  let service: TipoProfissionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProfissionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
