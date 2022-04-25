import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrtTicketComponent } from './crt-ticket.component';

describe('CrtTicketComponent', () => {
  let component: CrtTicketComponent;
  let fixture: ComponentFixture<CrtTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrtTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
