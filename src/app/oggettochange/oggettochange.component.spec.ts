import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OggettochangeComponent } from './oggettochange.component';

describe('OggettochangeComponent', () => {
  let component: OggettochangeComponent;
  let fixture: ComponentFixture<OggettochangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OggettochangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OggettochangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
