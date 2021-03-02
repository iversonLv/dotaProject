import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProComponent } from './table-pro.component';

describe('TableProComponent', () => {
  let component: TableProComponent;
  let fixture: ComponentFixture<TableProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
