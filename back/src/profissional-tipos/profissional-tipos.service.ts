import { InjectModel } from '@nestjs/sequelize';
import { LoggerService } from './../@core/services/logger.service';
import { GeradorUuidService } from './../@core/services/geradoruuid.service';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProfissionalTipoDto } from './dto/create-profissional-tipo.dto';
import { UpdateProfissionalTipoDto } from './dto/update-profissional-tipo.dto';
import { ProfissionalTipo } from './entities/profissional-tipo.entity';

const TIPOSINICIAIS: CreateProfissionalTipoDto[] = [
  { descricao: 'Junior', situacao: true },
  { descricao: 'Senior', situacao: true },
  { descricao: 'Pleno', situacao: true },
];

@Injectable()
export class ProfissionalTiposService {
  constructor(
    @InjectModel(ProfissionalTipo) private _entity: typeof ProfissionalTipo,
    @Inject(LoggerService)
    private _loggerService: LoggerService,
    @Inject(GeradorUuidService)
    private _uuidService: GeradorUuidService,
  ) {
    this.init();
  }
  async init() {
    const tipos = await this._entity.findAll();
    if (tipos.length === 0) {
      TIPOSINICIAIS.forEach((tipo) => {
        this.create(tipo);
      });
    }
  }

  async create(createProfissionalTipoDto: CreateProfissionalTipoDto) {
    const existeEssaDescricao = await this._entity.findOne({
      where: { descricao: createProfissionalTipoDto.descricao },
    });
    if (existeEssaDescricao) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error:
            'Já existe um tipo de profissional com essa descrição! Utilize o tipo existente.',
        },
        HttpStatus.CONFLICT,
      );
    }
    const uuid = await this._uuidService.createUuid(this._entity);

    const result = await this._entity.create({
      id: uuid,
      ...createProfissionalTipoDto,
    });
    this._loggerService.infoLog(
      `Novo tipo de profissional:${createProfissionalTipoDto.descricao}, com ID: ${result.id}`,
    );
    return result;
  }

  async findAll() {
    const messages = await this._entity.findAll();
    if (messages.length > 0) {
      return messages;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Não foi encontrado nenhum tipo de profissional!',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async findOne(id: string) {
    const profissional = await this._entity.findOne({
      where: {
        id: id,
      },
    });
    if (profissional) {
      return profissional;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Não foi encontrado nenhum profissional com este ID!',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(
    id: string,
    updateProfissionalTipoDto: UpdateProfissionalTipoDto,
  ) {
    await this.findOne(id);
    const existeEssaDescricao = await this._entity.findOne({
      where: {
        descricao: updateProfissionalTipoDto.descricao,
      },
    });
    if (existeEssaDescricao) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Já existe um tipo de profissional com essa descrição!',
        },
        HttpStatus.CONFLICT,
      );
    }
    return this._entity.update(updateProfissionalTipoDto, { where: { id } });
  }

  async remove(id: string) {
    const tipoProfissional = await this.findOne(id);
    const result = await this._entity.destroy({ where: { id: id } });
    this._loggerService.infoLog(
      `Tipo de profissional:${tipoProfissional.descricao}, com ID: ${tipoProfissional.id} foi apagado!`,
    );
    return result;
  }
}
