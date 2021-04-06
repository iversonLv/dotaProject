import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailVisionComponent } from './table-match-detail-vision.component';

describe('TableMatchDetailVisionComponent', () => {
  let component: TableMatchDetailVisionComponent;
  let fixture: ComponentFixture<TableMatchDetailVisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailVisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailVisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
