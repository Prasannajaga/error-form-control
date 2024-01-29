import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlDirectiveComponent } from './form-control-directive.component';

describe('FormControlDirectiveComponent', () => {
  let component: FormControlDirectiveComponent;
  let fixture: ComponentFixture<FormControlDirectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormControlDirectiveComponent]
    });
    fixture = TestBed.createComponent(FormControlDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
