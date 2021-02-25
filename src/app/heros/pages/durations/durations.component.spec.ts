import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationsComponent } from './durations.component';

describe('DurationsComponent', () => {
  let component: DurationsComponent;
  let fixture: ComponentFixture<DurationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
