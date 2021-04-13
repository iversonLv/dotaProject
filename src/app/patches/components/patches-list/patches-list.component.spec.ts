import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchesListComponent } from './patches-list.component';

describe('PatchesListComponent', () => {
  let component: PatchesListComponent;
  let fixture: ComponentFixture<PatchesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatchesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
