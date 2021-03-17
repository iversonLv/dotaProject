import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandPickListComponent } from './band-pick-list.component';

describe('BandPickListComponent', () => {
  let component: BandPickListComponent;
  let fixture: ComponentFixture<BandPickListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandPickListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandPickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
