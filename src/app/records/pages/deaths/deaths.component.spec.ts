import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathsComponent } from './deaths.component';

describe('DeathsComponent', () => {
  let component: DeathsComponent;
  let fixture: ComponentFixture<DeathsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
