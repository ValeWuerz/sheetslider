import { TestBed } from '@angular/core/testing';

import { RenderSheetService } from './render-sheet.service';

describe('RenderSheetService', () => {
  let service: RenderSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenderSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
