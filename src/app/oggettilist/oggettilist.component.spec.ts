import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OggettilistComponent } from './oggettilist.component';

describe('OggettilistComponent', () => {
  let component: OggettilistComponent;
  let fixture: ComponentFixture<OggettilistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OggettilistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OggettilistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
