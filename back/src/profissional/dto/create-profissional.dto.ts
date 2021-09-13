import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProfissionalDto {
  @IsString()
  @IsOptional()
  id?: string;
  @IsString()
  @IsNotEmpty()
  nome: string;
  @IsString()
  @IsOptional()
  telefone?: string;
  @IsString()
  @IsOptional()
  email?: string;
  @IsString()
  @IsNotEmpty()
  tipoDeProfissional: string;
  @IsBoolean()
  @IsNotEmpty()
  situacao: boolean;
  @IsString()
  @IsOptional()
  updatedAt?: string;
  @IsString()
  @IsOptional()
  createdAt?: string;
}
