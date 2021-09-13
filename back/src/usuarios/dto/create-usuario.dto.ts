import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
