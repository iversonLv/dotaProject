import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCosmeticsComponent } from './table-cosmetics.component';

describe('TableCosmeticsComponent', () => {
  let component: TableCosmeticsComponent;
  let fixture: ComponentFixture<TableCosmeticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCosmeticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCosmeticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
