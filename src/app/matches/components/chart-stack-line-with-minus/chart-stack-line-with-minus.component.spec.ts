import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStackLineWithMinusComponent } from './chart-stack-line-with-minus.component';

describe('ChartStackLineWithMinusComponent', () => {
  let component: ChartStackLineWithMinusComponent;
  let fixture: ComponentFixture<ChartStackLineWithMinusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartStackLineWithMinusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStackLineWithMinusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
