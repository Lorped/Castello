import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegolamentoComponent } from './regolamento.component';

describe('RegolamentoComponent', () => {
  let component: RegolamentoComponent;
  let fixture: ComponentFixture<RegolamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegolamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegolamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
