import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsChartComponent } from './trends-chart.component';

describe('TrendsChartComponent', () => {
  let component: TrendsChartComponent;
  let fixture: ComponentFixture<TrendsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
