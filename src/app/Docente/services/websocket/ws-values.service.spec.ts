import { TestBed } from '@angular/core/testing';

import { WsValuesService } from './ws-values.service';

describe('WsValuesService', () => {
  let service: WsValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
