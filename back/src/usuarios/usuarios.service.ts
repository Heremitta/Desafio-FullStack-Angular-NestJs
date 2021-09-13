import { GeradorUuidService } from './../@core/services/geradoruuid.service';
import { LoggerService } from './../@core/services/logger.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario) private _entity: typeof Usuario,
    @Inject(LoggerService)
    private _loggerService: LoggerService,
    @Inject(GeradorUuidService)
    private _uuidService: GeradorUuidService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioJaExiste = await this._entity.findOne({
      where: { email: createUsuarioDto.email },
    });
    if (usuarioJaExiste) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Já existe um usuario com este email !',
        },
        HttpStatus.CONFLICT,
      );
    }
    const uuid = await this._uuidService.createUuid(this._entity);

    createUsuarioDto.senha = await hash(createUsuarioDto.senha, 10);
    const result = await this._entity.create({ id: uuid, ...createUsuarioDto });
    result.senha = undefined;
    return result;
  }

  async findAll() {
    const users = await this._entity.findAll();
    if (users.length > 0) {
      return users.map((user) => {
        user.senha = undefined;
        return user;
      });
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Não foi encontrado nenhum usuario!',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async findOne(id: string) {
    const user = await this._entity.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      user.senha = undefined;
      return user;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Não foi encontrado usuario com este ID!',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id);
    return this._entity.update(updateUsuarioDto, { where: { id } });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this._entity.destroy({ where: { id: id } });
  }

  async getByEmail(email: string) {
    // retorna a senha do usuario junto, cuidado
    const user = await this._entity.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      return user;
    }
  }
}
