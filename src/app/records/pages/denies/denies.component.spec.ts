import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniesComponent } from './denies.component';

describe('DeniesComponent', () => {
  let component: DeniesComponent;
  let fixture: ComponentFixture<DeniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
