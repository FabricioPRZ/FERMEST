import { TestBed } from '@angular/core/testing';

import { FermentationService } from './fermentation.service';

describe('FermentationService', () => {
  let service: FermentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FermentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
