import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoreModule } from 'src/@core/core.module';
import { ProfissionalTipo } from './entities/profissional-tipo.entity';
import { ProfissionalTiposController } from './profissional-tipos.controller';
import { ProfissionalTiposService } from './profissional-tipos.service';

@Module({
  imports: [SequelizeModule.forFeature([ProfissionalTipo]), CoreModule],
  controllers: [ProfissionalTiposController],
  providers: [ProfissionalTiposService],
  exports: [ProfissionalTiposService],
})
export class ProfissionalTiposModule {}
