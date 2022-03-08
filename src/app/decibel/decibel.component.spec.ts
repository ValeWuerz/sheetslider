import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecibelComponent } from './decibel.component';

describe('DecibelComponent', () => {
  let component: DecibelComponent;
  let fixture: ComponentFixture<DecibelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecibelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecibelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
