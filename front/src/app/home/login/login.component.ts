import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserDbService } from 'src/app/shared/services/UserDb.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  fb: FormBuilder;
  wasValidate = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertMessageService,
    private _userDbService: UserDbService
  ) {
    this.fb = new FormBuilder();
    this.formLogin = this.fb.group({
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      senha: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  logar(email: string, senha: string) {
    this.wasValidate = true;

    if (!email && !senha) {
      this.alertService.setAlert(
        'warning',
        'email e senha devem ser digitados!'
      );
      return;
    }
    if (!email) {
      this.alertService.setAlert('warning', 'email  deve ser digitado!');
      return;
    }
    if (!senha) {
      this.alertService.setAlert('warning', 'senha  deve ser digitada!');
      return;
    }
    try {
      this.authService.user$ = this.authService.login(email, senha);
      let sub = this.authService.user$.subscribe(
        async (user) => {
          if ('user' in user) {
            this.alertService.setAlert(
              'success',
              `Bem vindo ${user.user.nome}`
            );

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
        },
        (err) => {
          if (err.error) {
            this.alertService.setAlert('warning', err.error.error);
          }
          console.log(err);
        },
        () => {
          sub.unsubscribe();
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
}
