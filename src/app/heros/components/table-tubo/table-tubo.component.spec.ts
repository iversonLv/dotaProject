import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTuboComponent } from './table-tubo.component';

describe('TableTuboComponent', () => {
  let component: TableTuboComponent;
  let fixture: ComponentFixture<TableTuboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTuboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTuboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
