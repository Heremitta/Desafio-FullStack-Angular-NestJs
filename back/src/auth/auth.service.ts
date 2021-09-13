import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsuariosService)
    private userService: UsuariosService,
    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}
  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.getByEmail(userEmail);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Nenhum usuario com este email!',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (await compare(userPassword, user.senha)) {
      const { id, nome, email } = user;
      return { id, nome, email };
    }
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: 'Senha incorreta!',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
  async login(user) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SHHHHHH,
      }),
    };
  }
}
