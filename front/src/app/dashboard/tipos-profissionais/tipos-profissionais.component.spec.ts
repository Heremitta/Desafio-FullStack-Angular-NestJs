import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposProfissionaisComponent } from './tipos-profissionais.component';

describe('TiposProfissionaisComponent', () => {
  let component: TiposProfissionaisComponent;
  let fixture: ComponentFixture<TiposProfissionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposProfissionaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposProfissionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
