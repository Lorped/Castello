import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListscanComponent } from './listscan.component';

describe('ListscanComponent', () => {
  let component: ListscanComponent;
  let fixture: ComponentFixture<ListscanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListscanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
