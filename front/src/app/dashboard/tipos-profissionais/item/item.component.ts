import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { AlertMessageService } from "src/app/shared/services/alert-message.service";
import { TiposDeProfissionaisDto } from "../../shared/dtos/tiposDeProfissionais.dto";
import { TiposProfissionaDto } from "../shared/dtos/tipos-profissional.dto";
import { TipoProfissionalService } from "../shared/services/tipo-profissional.service";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
})
export class ItemComponent implements OnInit {
  modalRef?: BsModalRef;
  current_ID = "";
  deletarProfissional = false;
  alterarProfissional = false;
  item: TiposProfissionaDto = {
    descricao: "",
    situacao: false,
    createdAt: "",
    id: "",
    updatedAt: "",
  };

  formCadastro: FormGroup;
  fb: FormBuilder;
  wasValidate = false;
  mostraSenha = false;
  tiposProfissionais: TiposDeProfissionaisDto[] = [];
  constructor(
    private modalService: BsModalService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private tipoProfissionalService: TipoProfissionalService,
    private alertService: AlertMessageService,
  ) {
    this.fb = new FormBuilder();
    this.formCadastro = this.fb.group({
      descricao: this.fb.control(
        { value: "", disabled: !this.alterarProfissional },
        [Validators.required],
      ),
      situacao: this.fb.control({
        value: "",
        disabled: !this.alterarProfissional,
      }),
    });
  }

  ngOnInit(): void {
    this.routerActive.params.subscribe((params) => {
      this.current_ID = params.id;
      this.tipoProfissionalService.loadByID(params.id).subscribe((e) => {
        this.item = e;
        this.reset();
      });
    });
    this.tipoProfissionalService.loadByID(this.current_ID);
  }

  reset() {
    this.formCadastro.get("descricao")?.setValue(this.item.descricao);
    this.formCadastro.get("situacao")?.setValue(this.item.situacao);
  }

  permiteAlterar() {
    this.alterarProfissional = !this.alterarProfissional;
    if (this.alterarProfissional) {
      this.formCadastro.get("descricao")?.enable();
      this.formCadastro.get("situacao")?.enable();
    } else {
      this.formCadastro.get("descricao")?.disable();
      this.formCadastro.get("situacao")?.disable();
    }
  }

  enviarAlteracaoProfissional() {
    this.wasValidate = true;
    let constrols = Object.keys(this.formCadastro.controls);
    let erros: string[] = [];
    constrols.forEach((element) => {
      if (this.formCadastro.controls[element].status === "INVALID") {
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
      let createProfissional: TiposProfissionaDto;
      createProfissional = {
        id: this.item.id,
        descricao: this.formCadastro.value.descricao,
        situacao: this.formCadastro.value.situacao,
      } as TiposProfissionaDto;

      this.tipoProfissionalService
        .save(createProfissional)
        .subscribe((profissional) => {
          if (profissional) {
            this.alertService.setAlert(
              "success",
              `O tipo de profissional ${createProfissional.descricao} foi alterado com sucesso!`,
            );
            this.router.navigate(["dashboard/tipos-profissionais/listar"]);
          }
          this.permiteAlterar();
        });
    }
  }
  deletar() {
    this.tipoProfissionalService.remove(this.item.id).subscribe((result) => {
      if (result) {
        this.alertService.setAlert(
          "danger",
          `O tipo de profissional ${this.item.descricao} foi excluido com sucesso!`,
        );
        this.router.navigate(["dashboard/tipos-profissionais/listar"]);
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirm(): void {
    if (this.deletarProfissional) {
      this.deletar();
    }
    this.enviarAlteracaoProfissional();
    this.modalRef?.hide();
  }

  decline(): void {
    if (this.deletarProfissional) {
      this.deletarProfissional = false;
    }
    this.modalRef?.hide();
  }
}
