import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TipoProfissionalService } from '../shared/services/tipo-profissional.service';
import { LoaderService } from './../../../shared/services/loader.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  public totalProfissionaisPorPaginacao = 0;

  public profissionais: any[] = [];
  private subscribes: Subscription[] = [];
  public currentPage = 1;
  public qntdPorPagina = 10;
  public colspan = [
    'id',
    'cliente',
    'tecnico',
    'data',
    'retorno',
    'dataRetorno',
    'status',
    'vizualisar',
    'cancelar',
    'envia',
  ];
  public sortBy = '';

  public loading: BehaviorSubject<boolean>;
  pageEvent!: PageEvent;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  public paginacao: any[] = [];
  constructor(
    private loaderService: LoaderService,
    private tipoProfissionaisService: TipoProfissionalService
  ) {
    this.loading = this.loaderService.isLoading;
  }

  ngOnInit(): void {
    this.colspan.forEach((e) => {
      switch (e) {
        case 'id':
          window.innerWidth <= 400 ? 1 : 6;
      }
    });
    this.buscaPorPaginacao(1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log(changes)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
  buscaPorPaginacao(pagina: number) {
    this.currentPage = this.pageEvent
      ? this.pageEvent.pageIndex === 0
        ? 1
        : this.pageEvent.pageIndex + 1
      : 1;
    this.pageEvent
      ? (this.qntdPorPagina = this.pageEvent.pageSize)
      : (this.qntdPorPagina = 10);
    this.buscarTodosProfissionais(pagina);
  }

  buscarTodosProfissionais(pagina: number) {
    this.tipoProfissionaisService.list().subscribe((e) => {
      console.log('vai');
      this.profissionais = e;
      console.log(e);
    });
  }
  sortById() {
    if (this.profissionais.length > 0) {
      if (this.sortBy === 'id') {
        this.profissionais.sort((x, y) => {
          let a = x.id;
          let b = y.id;
          return a === b ? 0 : a < b ? 1 : -1;
        });
        this.sortBy = 'idInvertido';
      } else {
        this.profissionais.sort((x, y) => {
          let a = x.id;
          let b = y.id;
          return a === b ? 0 : a > b ? 1 : -1;
        });
        this.sortBy = 'id';
      }
    }
  }
  sortByRazaoSocial() {
    if (this.profissionais.length > 0) {
      if (this.sortBy == 'razaoSocial') {
        this.profissionais.sort((x, y) => {
          let a = x.cliente.toUpperCase();
          let b = y.cliente.toUpperCase();
          return a == b ? 0 : a < b ? 1 : -1;
        });
        this.sortBy = 'razaoSocialInvertido';
      } else {
        this.profissionais.sort((x, y) => {
          let a = x.cliente.toUpperCase();
          let b = y.cliente.toUpperCase();
          return a == b ? 0 : a > b ? 1 : -1;
        });
        this.sortBy = 'razaoSocial';
      }
    }
  }
  sortByNomeTecnico() {
    if (this.profissionais.length > 0) {
      if (this.sortBy == 'nomeTecnico') {
        this.profissionais.sort((x, y) => {
          let a = x.nomeTecnico.toUpperCase();
          let b = y.nomeTecnico.toUpperCase();
          return a == b ? 0 : a < b ? 1 : -1;
        });
        this.sortBy = 'nomeTecnicoInvertido';
      } else {
        this.profissionais.sort((x, y) => {
          let a = x.nomeTecnico.toUpperCase();
          let b = y.nomeTecnico.toUpperCase();
          return a == b ? 0 : a > b ? 1 : -1;
        });
        this.sortBy = 'nomeTecnico';
      }
    }
  }
  sortByData() {
    if (this.profissionais.length > 0) {
      if (this.sortBy == 'data') {
        this.profissionais.sort((x, y) => {
          let a = new Date(x.data);
          let b = new Date(y.data);
          return a.getDate() == b.getDate() ? 0 : a < b ? 1 : -1;
        });
        this.sortBy = 'dataInvertido';
      } else {
        this.profissionais.sort((x, y) => {
          let a = new Date(x.data);
          let b = new Date(y.data);
          return a.getDate() == b.getDate() ? 0 : a > b ? 1 : -1;
        });
        this.sortBy = 'data';
      }
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.subscribes.length > 0) {
      this.subscribes.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }
}
