import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatOverlayComponent } from './mat-overlay.component';

describe('MatOverlayComponent', () => {
  let component: MatOverlayComponent;
  let fixture: ComponentFixture<MatOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
