import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailVisionShowhideComponent } from './table-match-detail-vision-showhide.component';

describe('TableMatchDetailVisionShowhideComponent', () => {
  let component: TableMatchDetailVisionShowhideComponent;
  let fixture: ComponentFixture<TableMatchDetailVisionShowhideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailVisionShowhideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailVisionShowhideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
