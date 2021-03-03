import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastsComponent } from './casts.component';

describe('CastsComponent', () => {
  let component: CastsComponent;
  let fixture: ComponentFixture<CastsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
