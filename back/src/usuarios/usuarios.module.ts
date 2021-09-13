import { AuthModule } from './../auth/auth.module';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoreModule } from './../@core/core.module';
import { Module, forwardRef } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Usuario]),
    CoreModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
