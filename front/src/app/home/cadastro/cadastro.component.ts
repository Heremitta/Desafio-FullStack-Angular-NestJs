import { CreateLoginDto } from '../../shared/dtos/login.dto';
import { LoginService } from '../shared/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDbService } from '../../shared/services/UserDb.service';
import { AlertMessageService } from '../../shared/services/alert-message.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  formCadastro: FormGroup;
  fb: FormBuilder;
  wasValidate = false;
  mostraSenha = false;
  constructor(
    private authService: AuthService,
    private alertService: AlertMessageService,
    private _cadastroService: LoginService,
    private _userDbService: UserDbService,
    private router: Router
  ) {
    this.fb = new FormBuilder();
    this.formCadastro = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      senha: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
  cadastrarProfissional() {
    this.wasValidate = true;
    let constrols = Object.keys(this.formCadastro.controls);
    let erros: string[] = [];
    constrols.forEach((element) => {
      if (this.formCadastro.controls[element].status == 'INVALID') {
        erros.push(element);
      }
    });
    if (erros.length > 0) {
      let messageErro = 'Os campos a seguir estão invalidos: ';
      erros.forEach((err, index) => {
        index === erros.length
          ? (messageErro += `${err}!`)
          : (messageErro += `${err}, `);
      });
      this.alertService.setAlert('warning', messageErro);
      return;
    }
    if (this.formCadastro.valid) {
      let createLogin: CreateLoginDto = {
        email: this.formCadastro.value.email,
        nome: this.formCadastro.value.nome,
        senha: this.formCadastro.value.senha,
      };
      this._cadastroService.save(createLogin).subscribe((user) => {
        console.log(user);
        if ('user' in user) {
          this.alertService.setAlert('success', `Bem vindo ${user.user.nome}`);

          setTimeout(async () => {
            this.authService.isLoged.next(true);
            this.authService.currentUSer = user;
            await this._userDbService.saveUser({
              token: user.access_token,
              userId: <string>user.user.id,
            });
            this.router.navigate(['/dashboard/']);
          }, 2000);
        } else {
          this.alertService.setAlert('warning', 'puts');
        }
      });
    }
  }
}
