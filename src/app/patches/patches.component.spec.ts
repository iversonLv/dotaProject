import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchesComponent } from './patches.component';

describe('PatchesComponent', () => {
  let component: PatchesComponent;
  let fixture: ComponentFixture<PatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
