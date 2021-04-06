import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailWardLogComponent } from './table-match-detail-ward-log.component';

describe('TableMatchDetailWardLogComponent', () => {
  let component: TableMatchDetailWardLogComponent;
  let fixture: ComponentFixture<TableMatchDetailWardLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailWardLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailWardLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
