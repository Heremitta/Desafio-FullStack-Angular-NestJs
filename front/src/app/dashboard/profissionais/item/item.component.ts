import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertMessageService } from 'src/app/shared/services/alert-message.service';
import { TiposDeProfissionaisDto } from '../../shared/dtos/tiposDeProfissionais.dto';
import {
  CreateProfissionalDto,
  ProfissionalDto,
} from '../shared/dtos/profissional.dto';
import { ProfissionaisService } from '../shared/services/profissionais.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  modalRef?: BsModalRef;
  current_ID = '';
  deletarProfissional = false;
  alterarProfissional = false;
  item: ProfissionalDto = {
    email: '',
    nome: '',
    situacao: false,
    telefone: '',
    tipo: { descricao: '', id: '' },
    tipoDeProfissional: '',
    id: '',
    createdAt: '',
    updatedAt: '',
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
    private profissionalService: ProfissionaisService,
    private alertService: AlertMessageService
  ) {
    this.fb = new FormBuilder();
    this.formCadastro = this.fb.group({
      nome: this.fb.control(
        { value: '', disabled: !this.alterarProfissional },
        [Validators.required]
      ),
      telefone: this.fb.control({
        value: '',
        disabled: !this.alterarProfissional,
      }),
      situacao: this.fb.control({
        value: '',
        disabled: !this.alterarProfissional,
      }),
      email: this.fb.control(
        { value: '', disabled: !this.alterarProfissional },
        [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]
      ),
      tipoDeProfissional: this.fb.control(
        { value: '', disabled: !this.alterarProfissional },
        [Validators.required]
      ),
    });
  }
  buscarTiposDeProfissionais() {
    this.profissionalService.getAllTiposDeProfissionais().subscribe((tipos) => {
      this.tiposProfissionais = tipos;
    });
  }
  ngOnInit(): void {
    this.buscarTiposDeProfissionais();
    this.routerActive.params.subscribe((params) => {
      this.current_ID = params.id;
      this.profissionalService.loadByID(params.id).subscribe((e) => {
        this.item = e;
        this.reset();
      });
    });
    this.profissionalService.loadByID(this.current_ID);
  }

  reset() {
    this.formCadastro.get('nome')?.setValue(this.item.nome);
    this.formCadastro.get('telefone')?.setValue(this.item.telefone);
    this.formCadastro.get('email')?.setValue(this.item.email);
    this.formCadastro.get('situacao')?.setValue(this.item.situacao);
    this.formCadastro.get('tipoDeProfissional')?.setValue(this.item.tipo?.id);
  }

  permiteAlterar() {
    this.alterarProfissional = !this.alterarProfissional;
    if (this.alterarProfissional) {
      this.formCadastro.get('nome')?.enable();
      this.formCadastro.get('telefone')?.enable();
      this.formCadastro.get('email')?.enable();
      this.formCadastro.get('situacao')?.enable();
      this.formCadastro.get('tipoDeProfissional')?.enable();
    } else {
      this.formCadastro.get('nome')?.disable();
      this.formCadastro.get('telefone')?.disable();
      this.formCadastro.get('email')?.disable();
      this.formCadastro.get('situacao')?.disable();
      this.formCadastro.get('tipoDeProfissional')?.disable();
    }
  }

  enviarAlteracaoProfissional() {
    this.wasValidate = true;
    let constrols = Object.keys(this.formCadastro.controls);
    let erros: string[] = [];
    constrols.forEach((element) => {
      if (this.formCadastro.controls[element].status === 'INVALID') {
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
      let createProfissional: ProfissionalDto;
      createProfissional = {
        id: this.item.id,
        email: this.formCadastro.value.email,
        nome: this.formCadastro.value.nome,
        situacao: this.formCadastro.value.situacao,
        telefone: this.formCadastro.value.telefone,
        tipoDeProfissional: this.formCadastro.value.tipoDeProfissional,
      } as ProfissionalDto;

      this.profissionalService
        .save(createProfissional)
        .subscribe((profissional) => {
          if (profissional) {
            this.alertService.setAlert(
              'success',
              `Profissional ${createProfissional.nome} foi alterado com sucesso!`
            );
          }
          this.permiteAlterar();
        });
    }
  }
  deletar() {
    this.profissionalService.remove(this.item.id).subscribe((result) => {
      if (result) {
        this.alertService.setAlert(
          'danger',
          `O profissional ${this.item.nome} foi excluido com sucesso!`
        );
        this.router.navigate(['dashboard/profissionais']);
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
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
