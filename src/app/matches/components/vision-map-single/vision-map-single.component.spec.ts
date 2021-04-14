import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionMapSingleComponent } from './vision-map-single.component';

describe('VisionMapSingleComponent', () => {
  let component: VisionMapSingleComponent;
  let fixture: ComponentFixture<VisionMapSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionMapSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionMapSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
