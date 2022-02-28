import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsedMarkComponent } from './parsed-mark.component';

describe('ParsedMarkComponent', () => {
  let component: ParsedMarkComponent;
  let fixture: ComponentFixture<ParsedMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParsedMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParsedMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
