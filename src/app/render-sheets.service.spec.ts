import { TestBed } from '@angular/core/testing';

import { RenderSheetsService } from './render-sheets.service';

describe('RenderSheetsService', () => {
  let service: RenderSheetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenderSheetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
