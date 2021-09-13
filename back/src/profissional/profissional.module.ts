import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoreModule } from 'src/@core/core.module';
import { ProfissionalTiposModule } from 'src/profissional-tipos/profissional-tipos.module';
import { Profissional } from './entities/profissional.entity';
import { ProfissionalController } from './profissional.controller';
import { ProfissionalService } from './profissional.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Profissional]),
    CoreModule,
    forwardRef(() => ProfissionalTiposModule),
  ],
  controllers: [ProfissionalController],
  providers: [ProfissionalService],
  exports: [ProfissionalService],
})
export class ProfissionalModule {}
