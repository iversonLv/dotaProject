import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchComponent } from './table-match.component';

describe('TableMatchComponent', () => {
  let component: TableMatchComponent;
  let fixture: ComponentFixture<TableMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
