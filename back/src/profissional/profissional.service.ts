import { LoggerService } from './../@core/services/logger.service';
import { GeradorUuidService } from './../@core/services/geradoruuid.service';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProfissionalDto } from './dto/create-profissional.dto';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';
import { Profissional } from './entities/profissional.entity';
import { ProfissionalTipo } from 'src/profissional-tipos/entities/profissional-tipo.entity';

@Injectable()
export class ProfissionalService {
  constructor(
    @InjectModel(Profissional) private _entity: typeof Profissional,
    @Inject(LoggerService)
    private _loggerService: LoggerService,
    @Inject(GeradorUuidService)
    private _uuidService: GeradorUuidService,
  ) {}
  async create(createProfissionalDto: CreateProfissionalDto) {
    if (createProfissionalDto.email) {
      const profissional = await this._entity.findOne({
        where: { email: createProfissionalDto.email },
      });
      if (profissional) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'Já existe um profissional com este email!',
          },
          HttpStatus.CONFLICT,
        );
      }
    }
    const uuid = await this._uuidService.createUuid(this._entity);

    const result = await this._entity.create({
      id: uuid,
      ...createProfissionalDto,
    });
    this._loggerService.infoLog(
      `Criado novo profissional: ${createProfissionalDto.nome}, com ID: ${result.id}`,
    );
    return result;
  }
  async findByEmail(email) {
    return await this._entity.findOne({ where: { email } });
  }

  async findAll() {
    const profissional = await this._entity.findAll({
      include: [
        {
          model: ProfissionalTipo,
          as: 'tipo',
          attributes: ['id', 'descricao'],
        },
      ],
    });
    if (profissional.length > 0) {
      return profissional;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Não foi encontrado nenhum profissional!',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async findOne(id: string) {
    const profissional = await this._entity.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ProfissionalTipo,
          as: 'tipo',
          attributes: ['id', 'descricao'],
        },
      ],
    });
    if (profissional) {
      return profissional;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Não foi encontrado profissional com este ID!',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: string, updateProfissionalDto: UpdateProfissionalDto) {
    await this.findOne(id);
    return this._entity.update(updateProfissionalDto, { where: { id } });
  }

  async remove(id: string) {
    const profissional = await this.findOne(id);
    const result = await this._entity.destroy({ where: { id } });
    this._loggerService.infoLog(
      `Profissional:${profissional.nome}, com ID: ${profissional.id} foi apagado!`,
    );
    return result;
  }
}
