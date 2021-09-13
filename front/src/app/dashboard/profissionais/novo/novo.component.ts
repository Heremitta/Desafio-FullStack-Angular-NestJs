import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TiposDeProfissionaisDto } from '../../shared/dtos/tiposDeProfissionais.dto';
import { ProfissionaisService } from '../shared/services/profissionais.service';
import { AlertMessageService } from './../../../shared/services/alert-message.service';
import { UserDbService } from './../../../shared/services/UserDb.service';
import { CreateProfissionalDto } from './../shared/dtos/profissional.dto';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss'],
})
export class NovoComponent implements OnInit {
  formCadastro: FormGroup;
  fb: FormBuilder;
  wasValidate = false;
  mostraSenha = false;

  tiposProfissionais: TiposDeProfissionaisDto[] = [];
  constructor(
    private authService: AuthService,
    private alertService: AlertMessageService,
    private profissionalService: ProfissionaisService,
    private _userDbService: UserDbService,
    private router: Router
  ) {
    this.fb = new FormBuilder();
    this.formCadastro = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      telefone: this.fb.control('', []),
      email: this.fb.control('', [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      tipoDeProfissional: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.buscarTiposDeProfissionais();
  }
  buscarTiposDeProfissionais() {
    this.profissionalService.getAllTiposDeProfissionais().subscribe((tipos) => {
      this.tiposProfissionais = tipos;
    });
  }
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
      let createProfissional: CreateProfissionalDto = {
        email: this.formCadastro.value.email,
        nome: this.formCadastro.value.nome,
        situacao: true,
        telefone: this.formCadastro.value.telefone,
        tipoDeProfissional: this.formCadastro.value.tipoDeProfissional,
      };
      this.profissionalService
        .save(createProfissional)
        .subscribe((profissional) => {
          this.alertService.setAlert(
            'success',
            `Novo profissional ${createProfissional.nome} criado com sucesso`
          );
          setTimeout(() => {
            this.wasValidate = false;
            this.formCadastro.reset();
            this.formCadastro.get('tipoDeProfissional')?.markAsUntouched();
          }, 1000);
        });
    }
  }
}
