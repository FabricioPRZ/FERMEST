import { TestBed } from '@angular/core/testing';

import { SensorStateService } from './sensor-state.service';

describe('SensorStateService', () => {
  let service: SensorStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
