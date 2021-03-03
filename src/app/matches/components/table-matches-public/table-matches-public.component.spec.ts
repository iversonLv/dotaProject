import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchesPublicComponent } from './table-matches-public.component';

describe('TableMatchesPublicComponent', () => {
  let component: TableMatchesPublicComponent;
  let fixture: ComponentFixture<TableMatchesPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchesPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchesPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
