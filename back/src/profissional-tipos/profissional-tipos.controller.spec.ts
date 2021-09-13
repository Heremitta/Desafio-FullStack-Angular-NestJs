import { Test, TestingModule } from '@nestjs/testing';
import { CoreModule } from '../@core/core.module';
import { ProfissionalTipo } from './entities/profissional-tipo.entity';
import { ProfissionalTiposController } from './profissional-tipos.controller';
import { ProfissionalTiposService } from './profissional-tipos.service';

describe('ProfissionalTiposController', () => {
  let controller: ProfissionalTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfissionalTiposController],
      providers: [ProfissionalTiposService, ProfissionalTipo],
      imports: [CoreModule],
    }).compile();

    controller = module.get<ProfissionalTiposController>(
      ProfissionalTiposController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
