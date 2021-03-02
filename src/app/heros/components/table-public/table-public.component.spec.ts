import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePublicComponent } from './table-public.component';

describe('TablePublicComponent', () => {
  let component: TablePublicComponent;
  let fixture: ComponentFixture<TablePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
