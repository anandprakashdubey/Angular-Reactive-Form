import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveSignUpComponent } from './reactive-sign-up.component';

describe('ReactiveSignUpComponent', () => {
  let component: ReactiveSignUpComponent;
  let fixture: ComponentFixture<ReactiveSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
