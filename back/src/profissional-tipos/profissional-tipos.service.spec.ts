import { Test, TestingModule } from '@nestjs/testing';
import { ProfissionalTiposService } from './profissional-tipos.service';

describe('ProfissionalTiposService', () => {
  let service: ProfissionalTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfissionalTiposService],
    }).compile();

    service = module.get<ProfissionalTiposService>(ProfissionalTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
