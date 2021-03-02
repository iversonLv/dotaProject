import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePublicColComponent } from './table-public-col.component';

describe('TablePublicColComponent', () => {
  let component: TablePublicColComponent;
  let fixture: ComponentFixture<TablePublicColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePublicColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePublicColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
