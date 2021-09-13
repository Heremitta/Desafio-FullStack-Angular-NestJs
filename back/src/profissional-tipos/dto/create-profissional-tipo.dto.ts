import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateProfissionalTipoDto {
  @IsString()
  @IsOptional()
  id?: string;
  @IsString()
  @IsNotEmpty()
  descricao: string;
  @IsBoolean()
  @IsNotEmpty()
  situacao: boolean;
  @IsOptional()
  @IsString()
  updatedAt?: string;
  @IsOptional()
  @IsString()
  createdAt?: string;
}
