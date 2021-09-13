import { ProfissionalTiposModule } from './profissional-tipos/profissional-tipos.module';
import { ProfissionalModule } from './profissional/profissional.module';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CoreModule } from './@core/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    AuthModule,
    CoreModule,
    ProfissionalModule,
    ProfissionalTiposModule,
    MulterModule.register({
      dest: './files',
    }),
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
