import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchDetailComponent } from './patch-detail.component';

describe('PatchDetailComponent', () => {
  let component: PatchDetailComponent;
  let fixture: ComponentFixture<PatchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
