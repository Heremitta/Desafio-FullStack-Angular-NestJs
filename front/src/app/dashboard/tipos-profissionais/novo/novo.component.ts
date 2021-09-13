import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import { TiposDeProfissionaisDto } from "../../shared/dtos/tiposDeProfissionais.dto";
import { CreateTipoProfissionalDto } from "../shared/dtos/tipos-profissional.dto";
import { TipoProfissionalService } from "../shared/services/tipo-profissional.service";
import { AlertMessageService } from "./../../../shared/services/alert-message.service";
import { UserDbService } from "./../../../shared/services/UserDb.service";

@Component({
  templateUrl: "./novo.component.html",
  styleUrls: ["./novo.component.scss"],
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
    private tipoProfissionalService: TipoProfissionalService,
    private _userDbService: UserDbService,
    private router: Router,
  ) {
    this.fb = new FormBuilder();
    this.formCadastro = this.fb.group({
      descricao: this.fb.control("", [Validators.required]),
      situacao: this.fb.control(false, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  cadastrarProfissional() {
    this.wasValidate = true;
    let constrols = Object.keys(this.formCadastro.controls);
    let erros: string[] = [];
    constrols.forEach((element) => {
      if (this.formCadastro.controls[element].status == "INVALID") {
        erros.push(element);
      }
    });
    if (erros.length > 0) {
      let messageErro = "Os campos a seguir estão invalidos: ";
      erros.forEach((err, index) => {
        index === erros.length
          ? (messageErro += `${err}!`)
          : (messageErro += `${err}, `);
      });
      this.alertService.setAlert("warning", messageErro);
      return;
    }
    if (this.formCadastro.valid) {
      let createProfissional: CreateTipoProfissionalDto = {
        descricao: this.formCadastro.value.descricao,
        situacao: this.formCadastro.value.situacao,
      };
      this.tipoProfissionalService
        .save(createProfissional)
        .subscribe((profissional) => {
          this.alertService.setAlert(
            "success",
            `Novo tipo de profissional ${createProfissional.descricao} criado com sucesso`,
          );
          setTimeout(() => {
            this.wasValidate = false;
            this.formCadastro.reset();
            this.formCadastro.get("tipoDeProfissional")?.markAsUntouched();
          }, 1000);
        });
    }
  }
}
