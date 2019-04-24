import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagielistComponent } from './magielist.component';

describe('MagielistComponent', () => {
  let component: MagielistComponent;
  let fixture: ComponentFixture<MagielistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagielistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagielistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
