import { TestBed } from '@angular/core/testing';

import { OverlayDialogService } from './overlay-dialog.service';

describe('OverlayDialogService', () => {
  let service: OverlayDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
