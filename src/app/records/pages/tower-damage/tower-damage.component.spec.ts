import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerDamageComponent } from './tower-damage.component';

describe('TowerDamageComponent', () => {
  let component: TowerDamageComponent;
  let fixture: ComponentFixture<TowerDamageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TowerDamageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TowerDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
