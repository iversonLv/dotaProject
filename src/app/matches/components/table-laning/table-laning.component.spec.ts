import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLaningComponent } from './table-laning.component';

describe('TableLaningComponent', () => {
  let component: TableLaningComponent;
  let fixture: ComponentFixture<TableLaningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableLaningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
