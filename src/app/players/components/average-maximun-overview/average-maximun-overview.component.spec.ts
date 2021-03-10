import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageMaximunOverviewComponent } from './average-maximun-overview.component';

describe('AverageMaximunOverviewComponent', () => {
  let component: AverageMaximunOverviewComponent;
  let fixture: ComponentFixture<AverageMaximunOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageMaximunOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageMaximunOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
