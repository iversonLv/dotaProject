import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmrChartComponent } from './mmr-chart.component';

describe('MmrChartComponent', () => {
  let component: MmrChartComponent;
  let fixture: ComponentFixture<MmrChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmrChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmrChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
