import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableItemsComponent } from './table-items.component';

describe('TableItemsComponent', () => {
  let component: TableItemsComponent;
  let fixture: ComponentFixture<TableItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
