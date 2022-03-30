import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatbuttonComponent } from './matbutton.component';

describe('MatbuttonComponent', () => {
  let component: MatbuttonComponent;
  let fixture: ComponentFixture<MatbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
