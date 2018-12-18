import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaggilistComponent } from './personaggilist.component';

describe('PersonaggilistComponent', () => {
  let component: PersonaggilistComponent;
  let fixture: ComponentFixture<PersonaggilistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaggilistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaggilistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
