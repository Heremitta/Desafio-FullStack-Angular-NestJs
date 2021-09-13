import { PartialType } from '@nestjs/mapped-types';
import { CreateProfissionalTipoDto } from './create-profissional-tipo.dto';

export class UpdateProfissionalTipoDto extends PartialType(CreateProfissionalTipoDto) {}
